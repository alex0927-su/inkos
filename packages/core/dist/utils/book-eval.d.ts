import type { StateManager } from "../state/manager.js";
export interface ChapterEval {
    readonly number: number;
    readonly title: string;
    readonly wordCount: number;
    readonly auditIssueCount: number;
    readonly aiTellCount: number;
    readonly aiTellDensity: number;
    readonly paragraphWarnings: number;
    readonly status: string;
}
export interface BookEval {
    readonly bookId: string;
    readonly totalChapters: number;
    readonly totalWords: number;
    readonly auditPassRate: number;
    readonly avgAiTellDensity: number;
    readonly avgParagraphWarnings: number;
    readonly hookResolveRate: number;
    readonly duplicateTitles: number;
    readonly qualityScore: number;
    readonly chapters: ReadonlyArray<ChapterEval>;
    readonly qualityTrend: ReadonlyArray<{
        readonly chapter: number;
        readonly score: number;
    }>;
}
export interface EvaluateBookQualityOptions {
    readonly state: StateManager;
    readonly bookId: string;
    readonly chapters?: string;
}
export declare function computeChapterEvalScore(ch: ChapterEval): number;
export declare function evaluateBookQuality(options: EvaluateBookQualityOptions): Promise<BookEval>;
//# sourceMappingURL=book-eval.d.ts.map