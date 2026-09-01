import { type Fact, type StoredHook, type StoredSummary } from "../state/memory-db.js";
export { isFuturePlannedHook, isHookWithinChapterWindow, } from "./hook-lifecycle.js";
export { parseChapterSummariesMarkdown, parseCurrentStateFacts, parsePendingHooksMarkdown, renderHookSnapshot, renderSummarySnapshot, } from "./story-markdown.js";
export interface MemorySelection {
    readonly summaries: ReadonlyArray<StoredSummary>;
    readonly hooks: ReadonlyArray<StoredHook>;
    readonly activeHooks: ReadonlyArray<StoredHook>;
    /**
     * Hooks with recycling pressure — stale hooks that the planner must
     * advance/resolve/defer (and if deferred, justify). Sorted by staleness DESC
     * (most overdue first). See computeRecyclableHooks for the selection rule.
     */
    readonly recyclableHooks: ReadonlyArray<StoredHook>;
    readonly facts: ReadonlyArray<Fact>;
    readonly volumeSummaries: ReadonlyArray<VolumeSummarySelection>;
    readonly dbPath: string;
    readonly retrievalTrace: MemoryRetrievalTrace;
}
export interface MemoryRetrievalTrace {
    readonly engine: "sqlite-fts5-bm25";
    readonly query: string;
    readonly candidates: ReadonlyArray<{
        readonly id: string;
        readonly kind: string;
        readonly source: string;
        readonly score: number;
    }>;
    readonly semanticSelectedIds?: ReadonlyArray<string>;
}
export interface MemorySemanticSelectionRequest {
    readonly chapterNumber: number;
    readonly query: string;
    readonly candidates: ReadonlyArray<{
        readonly id: string;
        readonly kind: string;
        readonly source: string;
        readonly title: string;
        readonly excerpt: string;
    }>;
}
export type MemorySemanticSelector = (request: MemorySemanticSelectionRequest) => Promise<ReadonlyArray<string>>;
export interface VolumeSummarySelection {
    readonly heading: string;
    readonly content: string;
    readonly anchor: string;
}
export declare function retrieveMemorySelection(params: {
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly goal: string;
    readonly outlineNode?: string;
    readonly mustKeep?: ReadonlyArray<string>;
    readonly semanticSelector?: MemorySemanticSelector;
}): Promise<MemorySelection>;
/**
 * Phase 9-2: Hooks that the planner MUST address this chapter.
 *
 * An active hook is "recyclable" (i.e., stale enough to force an
 * advance/resolve/defer decision) when any of the following holds:
 *
 *   - pressured / near_payoff / progressing: silent for ≥ 5 chapters
 *   - planted / open: silent for ≥ 10 chapters
 *   - coreHook === true:                      silent for ≥ 8 chapters
 *
 * "Silent" = (chapterNumber − max(startChapter, lastAdvancedChapter)).
 * Future-planted hooks are excluded (they aren't overdue yet).
 * Sorted by silence DESC — most overdue first — so the planner sees the
 * worst debt at the top of its prompt slice.
 */
export declare function computeRecyclableHooks(hooks: ReadonlyArray<StoredHook>, chapterNumber: number): StoredHook[];
//# sourceMappingURL=memory-retrieval.d.ts.map