import { BaseAgent } from "./base.js";
export interface ConsolidationResult {
    readonly volumeSummaries: string;
    readonly archivedVolumes: number;
    readonly retainedChapters: number;
    /**
     * Phase 7 hotfix 2: number of ledger hooks whose `promoted` flag flipped
     * from false to true during this consolidation run (advanced_count rule).
     * 0 when pending_hooks.md is absent or no hook crossed the threshold.
     */
    readonly promotedHookCount: number;
}
/**
 * Consolidates chapter summaries into volume-level narrative summaries.
 * Reduces token usage for long books while preserving critical context.
 */
export declare class ConsolidatorAgent extends BaseAgent {
    get name(): string;
    /**
     * Consolidate chapter summaries by volume.
     * - Reads outline/volume_map.md (fallback: legacy volume_outline.md) to
     *   determine volume boundaries
     * - For each completed volume, LLM compresses chapter summaries into a narrative paragraph
     * - Archives detailed summaries, keeps only recent volume's per-chapter rows
     */
    consolidate(bookDir: string): Promise<ConsolidationResult>;
    /**
     * Phase 7 hotfix 2 — re-run promotion for seeds whose advancedCount has
     * crossed the 2-chapter threshold since architect seed time. Delegates to
     * the shared `rerunPromotionPass` in utils/hook-promotion.ts.
     *
     * Returns the number of hooks that flipped from promoted=false (or
     * undefined) to promoted=true this run.
     */
    private rerunAdvancedCountPromotion;
    private parseVolumeBoundaries;
    private parseSummaryTable;
}
//# sourceMappingURL=consolidator.d.ts.map