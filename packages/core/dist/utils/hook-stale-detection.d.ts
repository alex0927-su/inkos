/**
 * Phase 7 — stale / blocked hook detection.
 *
 * Runs per-chapter (called from the writer's runtime-state projection
 * pipeline when it emits pending_hooks.md). Tags hooks the reviewer and
 * writer-planner should pay attention to:
 *
 *   stale   — planted long ago (distance > half_life) and still not
 *             marked paid-off / resolved.
 *   blocked — depends_on references upstream hooks that are still
 *             unplanted or unresolved.
 *
 * The detection is pure: given the current hook list + current chapter
 * number, it returns a map of hook id -> diagnostic flags. Nothing is
 * persisted outside the rendered markdown.
 */
import type { StoredHook } from "../state/memory-db.js";
import type { HookRecord } from "../models/runtime-state.js";
export interface HookDiagnostics {
    readonly stale: boolean;
    readonly blocked: boolean;
    readonly missingUpstream: ReadonlyArray<string>;
    readonly distance: number;
    readonly halfLife: number;
    /**
     * Phase 7 hotfix 3 — number of chapters this hook has been blocked.
     *
     * When blocked=false this is 0. When blocked=true it is computed as:
     *   max over unresolved upstream of (currentChapter - referenceChapter)
     * where referenceChapter is:
     *   - upstream.startChapter, if upstream is planted (startChapter > 0)
     *   - hook.startChapter, if upstream is missing or not yet planted
     *     (blocked since this hook's own planting)
     *
     * Reviewer reads this as the "blocked Y chapters" token for threshold
     * evaluation (5/6+ chapters → warning).
     */
    readonly blockedDistance: number;
}
type HookLike = StoredHook | HookRecord;
export declare function computeHookDiagnostics(params: {
    readonly hooks: ReadonlyArray<HookLike>;
    readonly currentChapter: number;
}): Map<string, HookDiagnostics>;
/**
 * Render the diagnostic flags as a compact marker string suitable for
 * appending to an existing table cell. Empty when nothing is flagged.
 */
export declare function renderHookDiagnosticMarker(diagnostics: HookDiagnostics, language: "zh" | "en"): string;
export {};
//# sourceMappingURL=hook-stale-detection.d.ts.map