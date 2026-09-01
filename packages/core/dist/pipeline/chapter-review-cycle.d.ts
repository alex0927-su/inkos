import type { AuditIssue, AuditResult } from "../agents/continuity.js";
import type { ReviseMode, ReviseOutput } from "../agents/reviser.js";
import type { WriteChapterOutput } from "../agents/writer.js";
import type { ChapterIntent, ChapterMemo, ContextPackage, RuleStack } from "../models/input-governance.js";
import type { LengthSpec } from "../models/length-governance.js";
export interface ChapterReviewCycleUsage {
    readonly promptTokens: number;
    readonly completionTokens: number;
    readonly totalTokens: number;
}
export interface ChapterReviewCycleControlInput {
    readonly chapterIntent: string;
    readonly chapterMemo?: ChapterMemo;
    readonly chapterIntentData?: ChapterIntent;
    readonly contextPackage: ContextPackage;
    readonly ruleStack: RuleStack;
}
export interface ChapterReviewCycleResult {
    readonly finalContent: string;
    readonly finalWordCount: number;
    readonly preAuditWordCount: number;
    readonly revised: boolean;
    readonly auditResult: AuditResult;
    readonly totalUsage: ChapterReviewCycleUsage;
    readonly postReviseCount: number;
    readonly repairApplied: boolean;
}
export declare function runChapterReviewCycle(params: {
    readonly book: Pick<{
        genre: string;
    }, "genre">;
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly initialOutput: Pick<WriteChapterOutput, "content" | "wordCount" | "postWriteErrors">;
    readonly reducedControlInput?: ChapterReviewCycleControlInput;
    readonly lengthSpec: LengthSpec;
    readonly initialUsage: ChapterReviewCycleUsage;
    readonly createReviser: () => {
        reviseChapter: (bookDir: string, chapterContent: string, chapterNumber: number, issues: ReadonlyArray<AuditIssue>, mode?: ReviseMode, genre?: string, options?: {
            chapterIntent?: string;
            chapterMemo?: ChapterMemo;
            chapterIntentData?: ChapterIntent;
            contextPackage?: ContextPackage;
            ruleStack?: RuleStack;
            lengthSpec?: LengthSpec;
        }) => Promise<ReviseOutput>;
    };
    readonly auditor: {
        auditChapter: (bookDir: string, chapterContent: string, chapterNumber: number, genre?: string, options?: {
            temperature?: number;
            chapterIntent?: string;
            chapterMemo?: ChapterMemo;
            contextPackage?: ContextPackage;
            ruleStack?: RuleStack;
        }) => Promise<AuditResult>;
    };
    readonly normalizePostWriteSurface?: (chapterContent: string) => string;
    readonly assertChapterContentNotEmpty: (content: string, stage: string) => void;
    readonly addUsage: (left: ChapterReviewCycleUsage, right?: ChapterReviewCycleUsage) => ChapterReviewCycleUsage;
    readonly analyzeAITells: (content: string) => {
        issues: ReadonlyArray<AuditIssue>;
    };
    readonly analyzeSensitiveWords: (content: string) => {
        found: ReadonlyArray<{
            severity: string;
        }>;
        issues: ReadonlyArray<AuditIssue>;
    };
    /** Re-run deterministic post-write checks (chapter-ref, paragraph shape, etc.) on any content. */
    readonly runPostWriteChecks?: (content: string) => ReadonlyArray<AuditIssue>;
    readonly maxReviewIterations?: number;
    readonly logWarn: (message: {
        zh: string;
        en: string;
    }) => void;
    readonly logStage: (message: {
        zh: string;
        en: string;
    }) => void;
}): Promise<ChapterReviewCycleResult>;
//# sourceMappingURL=chapter-review-cycle.d.ts.map