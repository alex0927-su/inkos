import { buildStateDegradedReviewNote } from "./chapter-state-recovery.js";
export async function persistChapterArtifacts(params) {
    await params.saveChapter();
    if (params.status !== "state-degraded") {
        await params.saveTruthFiles();
    }
    const existingIndex = await params.loadChapterIndex();
    const now = params.now?.() ?? new Date().toISOString();
    const entry = {
        number: params.chapterNumber,
        title: params.chapterTitle,
        status: params.status,
        wordCount: params.finalWordCount,
        createdAt: now,
        updatedAt: now,
        auditIssues: params.auditResult.issues.map((issue) => `[${issue.severity}] ${issue.description}`),
        lengthWarnings: [...params.lengthWarnings],
        reviewNote: params.status === "state-degraded"
            ? buildStateDegradedReviewNote(params.auditResult.passed ? "ready-for-review" : "audit-failed", params.degradedIssues)
            : undefined,
        lengthTelemetry: params.lengthTelemetry,
        tokenUsage: params.tokenUsage,
    };
    const existingIdx = existingIndex.findIndex((e) => e.number === params.chapterNumber);
    const updatedIndex = existingIdx >= 0
        ? existingIndex.map((e, i) => i === existingIdx ? { ...entry, createdAt: e.createdAt } : e)
        : [...existingIndex, entry];
    await params.saveChapterIndex(updatedIndex);
    await params.markBookActiveIfNeeded();
    const driftIssues = params.auditResult.issues.filter((issue) => issue.severity === "critical" || issue.severity === "warning");
    await params.persistAuditDriftGuidance(params.status === "state-degraded" ? [] : driftIssues);
    if (params.status !== "state-degraded") {
        params.logSnapshotStage();
        await params.snapshotState();
        await params.syncCurrentStateFactHistory();
    }
    return { entry };
}
//# sourceMappingURL=chapter-persistence.js.map