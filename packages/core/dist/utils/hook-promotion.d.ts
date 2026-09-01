/**
 * Phase 7 — hook promotion rules.
 *
 * Architect produces a pool of hook seeds (every row in the initial
 * pending_hooks table is conceptually a seed). Not every seed belongs in
 * the live `pending_hooks.md` ledger — pushing all of them there turns the
 * ledger into noise within a few chapters.
 *
 * A seed is *promoted* into the ledger when any of these four conditions
 * holds. The consolidator (maintains pending_hooks.md post-chapter) calls
 * `shouldPromoteHook` for every tracked seed, and the ledger retains only
 * the hooks that cross the threshold.
 *
 *   1. cross_volume — the hook spans volume boundaries. It either pays off
 *      in a later volume, or depends on hooks declared in a later volume.
 *   2. advanced_count >= 2 — the hook has been advanced/pushed in two or
 *      more chapters since planting, proving readers already track it.
 *   3. depends_on non-empty — the hook has upstream causal dependencies
 *      worth tracking, even if it hasn't been touched recently.
 *   4. core_hook === true — architect marked this hook as main-line
 *      load-bearing; it always belongs in the ledger.
 */
import type { StoredHook } from "../state/memory-db.js";
export interface VolumeBoundary {
    readonly name: string;
    readonly startCh: number;
    readonly endCh: number;
}
export interface PromotionContext {
    /** Volume boundaries parsed from outline/volume_map.md, ordered by startCh. */
    readonly volumeBoundaries: ReadonlyArray<VolumeBoundary>;
    /** Current chapter number (0 at book creation). */
    readonly currentChapter: number;
    /** Hook id -> advanced count (how many chapters advanced this hook since planting). */
    readonly advancedCounts: ReadonlyMap<string, number>;
    /**
     * Hook id -> start chapter lookup for every seed (including unpromoted ones).
     * Used to tell whether a `depends_on` target is declared in a later volume.
     */
    readonly allSeedStartChapters: ReadonlyMap<string, number>;
}
export interface PromotionDecision {
    readonly promote: boolean;
    readonly reasons: ReadonlyArray<PromotionReason>;
}
export type PromotionReason = "cross_volume" | "advanced_count" | "depends_on" | "core_hook";
export declare function shouldPromoteHook(hook: StoredHook, context: PromotionContext): PromotionDecision;
/**
 * Derive the default half-life (in chapters) for a hook that did not set it
 * explicitly. Mirrors the prompt defaults: immediate/near-term = 10,
 * mid-arc = 30, slow-burn/endgame = 80. Unknown timing falls to mid-arc.
 */
export declare function defaultHalfLifeChapters(payoffTiming: StoredHook["payoffTiming"] | undefined): number;
export declare function resolveHalfLifeChapters(hook: StoredHook): number;
/**
 * Escape special regex characters in a string so it can be used as a
 * literal pattern inside `new RegExp(...)`.
 */
export declare function escapeRegex(s: string): string;
export interface PromotionPassResult {
    /** Whether any hook flipped to promoted=true. */
    readonly updated: boolean;
    /** The (possibly updated) hooks array. */
    readonly hooks: ReadonlyArray<StoredHook>;
    /** Number of hooks that flipped from non-promoted to promoted. */
    readonly flippedCount: number;
}
/**
 * Derive hook advancement counts from chapter_summaries.md content.
 *
 * Counts how many chapter-summary data rows mention each hook id in the
 * hookActivity column (index 5, 0-based — "伏笔动态" / "hookActivity").
 */
export declare function deriveAdvancedCountsFromSummaries(summariesRaw: string, hookIds: ReadonlyArray<string>): Map<string, number>;
/**
 * Lightweight promotion pass: read hooks + chapter_summaries, check
 * advancedCount >= 2, flip promoted flag. No LLM calls.
 *
 * Returns the result without doing any I/O — caller decides whether to
 * persist.
 */
export declare function rerunPromotionPass(hooks: ReadonlyArray<StoredHook>, summariesRaw: string): PromotionPassResult;
//# sourceMappingURL=hook-promotion.d.ts.map