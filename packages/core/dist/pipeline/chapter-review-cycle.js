import { countChapterLength, isOutsideHardRange } from "../utils/length-metrics.js";
const DEFAULT_MAX_REVIEW_ITERATIONS = 1;
const PASS_SCORE_THRESHOLD = 85;
const NET_IMPROVEMENT_EPSILON = 3;
export async function runChapterReviewCycle(params) {
    let totalUsage = params.initialUsage;
    let finalContent = params.normalizePostWriteSurface?.(params.initialOutput.content)
        ?? params.initialOutput.content;
    let finalWordCount = countChapterLength(finalContent, params.lengthSpec.countingMode);
    const preAuditWordCount = finalWordCount;
    // Convert initial postWriteErrors into AuditIssues as fallback when runPostWriteChecks isn't provided.
    const initialPostWriteIssues = params.initialOutput.postWriteErrors.map((violation) => ({
        severity: "critical",
        category: violation.rule,
        description: violation.description,
        suggestion: violation.suggestion,
    }));
    params.assertChapterContentNotEmpty(finalContent, "draft generation");
    // ---------------------------------------------------------------------------
    // Helper: assess a chapter (audit + deterministic checks + length + score)
    // ---------------------------------------------------------------------------
    const assess = async (content, options) => {
        const llmAudit = await params.auditor.auditChapter(params.bookDir, content, params.chapterNumber, params.book.genre, params.reducedControlInput
            ? { ...params.reducedControlInput, ...(options ?? {}) }
            : options);
        totalUsage = params.addUsage(totalUsage, llmAudit.tokenUsage);
        const aiTellsResult = params.analyzeAITells(content);
        const sensitiveResult = params.analyzeSensitiveWords(content);
        const hasBlockedWords = sensitiveResult.found.some((item) => item.severity === "block");
        const wordCount = countChapterLength(content, params.lengthSpec.countingMode);
        const lengthInRange = !isOutsideHardRange(wordCount, params.lengthSpec);
        const lengthIssues = lengthInRange ? [] : [{
                severity: "critical",
                category: "length-budget",
                description: `Chapter length ${wordCount} is outside the required range ${params.lengthSpec.hardMin}-${params.lengthSpec.hardMax}.`,
                suggestion: `Repair only the scenes that are underdeveloped or redundant, then land near ${params.lengthSpec.target} without changing established facts.`,
            }];
        // Deterministic post-write checks: run every round, not just the first.
        // If runPostWriteChecks is provided, use it; otherwise fall back to initial postWriteErrors.
        const postWriteIssues = params.runPostWriteChecks
            ? params.runPostWriteChecks(content)
            : initialPostWriteIssues;
        const allIssues = [
            ...llmAudit.issues,
            ...aiTellsResult.issues,
            ...sensitiveResult.issues,
            ...postWriteIssues,
            ...lengthIssues,
        ];
        const hasPostWriteCritical = postWriteIssues.some((i) => i.severity === "critical");
        const auditResult = {
            passed: (hasBlockedWords || hasPostWriteCritical || !lengthInRange) ? false : llmAudit.passed,
            issues: allIssues,
            summary: llmAudit.summary,
            parseFailed: llmAudit.parseFailed,
            overallScore: llmAudit.overallScore,
        };
        const score = llmAudit.overallScore ?? 0;
        return { auditResult, score, lengthInRange };
    };
    const isPassed = (assessment) => assessment.auditResult.passed && assessment.score >= PASS_SCORE_THRESHOLD && assessment.lengthInRange;
    // ---------------------------------------------------------------------------
    // Scoring loop: assess → revise → assess. Default is one automatic repair pass;
    // projects can raise it when they accept slower but more persistent repair.
    // ---------------------------------------------------------------------------
    const maxReviewIterations = Math.max(0, Math.floor(params.maxReviewIterations ?? DEFAULT_MAX_REVIEW_ITERATIONS));
    params.logStage({ zh: "审计草稿", en: "auditing draft" });
    const initial = await assess(finalContent);
    const snapshots = [{
            content: finalContent,
            wordCount: finalWordCount,
            auditResult: initial.auditResult,
            score: initial.score,
            lengthInRange: initial.lengthInRange,
        }];
    let currentAudit = initial;
    let postReviseCount = 0;
    if (initial.auditResult.parseFailed) {
        params.logWarn({
            zh: "审稿输出解析失败，跳过自动修稿以避免误改正文",
            en: "Audit output parsing failed; skipping automatic repair to avoid rewriting valid prose from an unreliable audit.",
        });
        return {
            finalContent,
            finalWordCount,
            preAuditWordCount,
            revised: false,
            auditResult: initial.auditResult,
            totalUsage,
            postReviseCount,
            repairApplied: false,
        };
    }
    if (!isPassed(initial)) {
        for (let iteration = 0; iteration < maxReviewIterations; iteration++) {
            params.logStage({
                zh: `修复轮次 ${iteration + 1}/${maxReviewIterations}（当前 ${currentAudit.score} 分）`,
                en: `repair iteration ${iteration + 1}/${maxReviewIterations} (current score: ${currentAudit.score})`,
            });
            const reviser = params.createReviser();
            const reviseOutput = await reviser.reviseChapter(params.bookDir, finalContent, params.chapterNumber, currentAudit.auditResult.issues, "auto", params.book.genre, { ...params.reducedControlInput, lengthSpec: params.lengthSpec });
            totalUsage = params.addUsage(totalUsage, reviseOutput.tokenUsage);
            if (reviseOutput.revisedContent.length === 0 || reviseOutput.revisedContent === finalContent) {
                params.logWarn({
                    zh: `修复轮次 ${iteration + 1} 未产出新内容，退出循环`,
                    en: `repair iteration ${iteration + 1} produced no new content, exiting loop`,
                });
                break;
            }
            params.assertChapterContentNotEmpty(reviseOutput.revisedContent, `repair iteration ${iteration + 1}`);
            const revisedContent = params.normalizePostWriteSurface?.(reviseOutput.revisedContent) ?? reviseOutput.revisedContent;
            const revisedWordCount = countChapterLength(revisedContent, params.lengthSpec.countingMode);
            // Re-assess revised content. If REVISED_CONTENT drifted on length,
            // lengthInRange will be false → isPassed fails → bestSnapshot picks
            // the earlier in-range version. No in-loop normalize needed.
            const nextAssessment = await assess(revisedContent, { temperature: 0 });
            snapshots.push({
                content: revisedContent,
                wordCount: revisedWordCount,
                auditResult: nextAssessment.auditResult,
                score: nextAssessment.score,
                lengthInRange: nextAssessment.lengthInRange,
            });
            // Check if passed
            if (isPassed(nextAssessment)) {
                params.logStage({
                    zh: `修复后达到通过线（${nextAssessment.score} 分），退出循环`,
                    en: `repair reached pass threshold (${nextAssessment.score}), exiting loop`,
                });
                finalContent = revisedContent;
                finalWordCount = revisedWordCount;
                postReviseCount = revisedWordCount;
                currentAudit = nextAssessment;
                break;
            }
            // Check net improvement
            if (nextAssessment.score >= currentAudit.score + NET_IMPROVEMENT_EPSILON) {
                finalContent = revisedContent;
                finalWordCount = revisedWordCount;
                postReviseCount = revisedWordCount;
                currentAudit = nextAssessment;
                // Continue to next iteration
            }
            else {
                params.logWarn({
                    zh: `修复轮次 ${iteration + 1} 未净提升（${currentAudit.score} → ${nextAssessment.score}），退出循环`,
                    en: `repair iteration ${iteration + 1} no net improvement (${currentAudit.score} → ${nextAssessment.score}), exiting loop`,
                });
                break;
            }
        }
    }
    // ---------------------------------------------------------------------------
    // Pick the best scoring snapshot for final output
    // ---------------------------------------------------------------------------
    const bestSnapshot = snapshots.reduce((best, snap) => {
        if (snap.lengthInRange !== best.lengthInRange) {
            return snap.lengthInRange ? snap : best;
        }
        return snap.score >= best.score + NET_IMPROVEMENT_EPSILON ? snap : best;
    });
    // If best snapshot differs from current content (repair made things worse
    // but an earlier version was better), roll back to the best version.
    const shouldRestoreBestSnapshot = bestSnapshot.content !== finalContent && ((bestSnapshot.lengthInRange && !currentAudit.lengthInRange)
        || bestSnapshot.score >= currentAudit.score + NET_IMPROVEMENT_EPSILON);
    if (shouldRestoreBestSnapshot) {
        params.logWarn({
            zh: `回退到最高分版本（${bestSnapshot.score} 分 vs 当前 ${currentAudit.score} 分）`,
            en: `rolling back to highest-scoring version (${bestSnapshot.score} vs current ${currentAudit.score})`,
        });
        finalContent = bestSnapshot.content;
        finalWordCount = bestSnapshot.wordCount;
        currentAudit = {
            auditResult: bestSnapshot.auditResult,
            score: bestSnapshot.score,
            lengthInRange: bestSnapshot.lengthInRange,
        };
    }
    return {
        finalContent,
        finalWordCount,
        preAuditWordCount,
        revised: snapshots.length > 1 && finalContent !== params.initialOutput.content,
        auditResult: currentAudit.auditResult,
        totalUsage,
        postReviseCount,
        repairApplied: snapshots.length > 1 && finalContent !== params.initialOutput.content,
    };
}
//# sourceMappingURL=chapter-review-cycle.js.map