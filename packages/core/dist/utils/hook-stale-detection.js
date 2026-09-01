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
import { resolveHalfLifeChapters } from "./hook-promotion.js";
const RESOLVED_STATUSES = [
    /^resolved$/i,
    /^closed$/i,
    /^done$/i,
    /^已回收$/,
    /^已解决$/,
];
function isResolved(hook) {
    const status = (hook.status ?? "").trim();
    return RESOLVED_STATUSES.some((pattern) => pattern.test(status));
}
export function computeHookDiagnostics(params) {
    const { hooks, currentChapter } = params;
    const byId = new Map();
    for (const hook of hooks) {
        byId.set(hook.hookId, hook);
    }
    const result = new Map();
    for (const hook of hooks) {
        const halfLife = resolveHalfLifeChapters(hook);
        const plantedChapter = Math.max(0, hook.startChapter);
        const distance = Math.max(0, currentChapter - plantedChapter);
        // Stale: past half-life AND not resolved AND actually planted
        // (startChapter > 0 — a seed with startChapter 0 is a pre-planting seed).
        const stale = !isResolved(hook)
            && plantedChapter > 0
            && distance > halfLife;
        // Blocked: depends_on references a hook that is unplanted or unresolved.
        // Hotfix 3: also track per-upstream reference chapter so we can compute
        // how long this hook has been blocked (for reviewer threshold eval).
        const missingUpstream = [];
        const upstreamReferenceChapters = [];
        for (const upstreamId of hook.dependsOn ?? []) {
            const upstream = byId.get(upstreamId);
            if (!upstream) {
                missingUpstream.push(upstreamId);
                // Upstream missing from ledger entirely — we've been blocked since
                // our own planting (or since chapter 0 if we're a pre-planting seed).
                upstreamReferenceChapters.push(plantedChapter);
                continue;
            }
            // Upstream is "planted but not delivered" if startChapter is non-zero
            // AND it's not resolved. An upstream that is still a seed (startChapter
            // 0) counts as unplanted.
            const upstreamResolved = isResolved(upstream);
            const upstreamPlanted = upstream.startChapter > 0
                && upstream.startChapter <= currentChapter;
            if (!upstreamPlanted || !upstreamResolved) {
                // We only block when the upstream genuinely has not cleared its gate.
                // For a pure "must be planted first" relationship, "planted but not
                // resolved" still counts as blocking the downstream from firing.
                missingUpstream.push(upstreamId);
                // Blocked since upstream planting (if planted) or since our own
                // planting (if upstream still unplanted).
                const referenceChapter = upstreamPlanted
                    ? upstream.startChapter
                    : plantedChapter;
                upstreamReferenceChapters.push(referenceChapter);
            }
        }
        const blocked = missingUpstream.length > 0 && !isResolved(hook);
        // Blocked distance = chapters elapsed since the *earliest* reference
        // chapter among unresolved upstream. Picking the min reference yields the
        // max distance — the longest any of these gates has held us up.
        let blockedDistance = 0;
        if (blocked && upstreamReferenceChapters.length > 0) {
            const earliestReference = Math.min(...upstreamReferenceChapters);
            blockedDistance = Math.max(0, currentChapter - earliestReference);
        }
        result.set(hook.hookId, {
            stale,
            blocked,
            missingUpstream,
            distance,
            halfLife,
            blockedDistance,
        });
    }
    return result;
}
/**
 * Render the diagnostic flags as a compact marker string suitable for
 * appending to an existing table cell. Empty when nothing is flagged.
 */
export function renderHookDiagnosticMarker(diagnostics, language) {
    const tokens = [];
    if (diagnostics.stale) {
        tokens.push(language === "en"
            ? `stale (d=${diagnostics.distance}/half=${diagnostics.halfLife})`
            : `过期 (距=${diagnostics.distance}/半衰=${diagnostics.halfLife})`);
    }
    if (diagnostics.blocked) {
        const missing = diagnostics.missingUpstream.join(", ");
        // Hotfix 3: embed the blocked distance so reviewer can apply its 5/6-chapter
        // threshold without guessing. Token format is load-bearing — it's read by
        // the reviewer prompt verbatim.
        const distanceToken = diagnostics.blockedDistance > 0
            ? (language === "en"
                ? ` (blocked ${diagnostics.blockedDistance} chapters)`
                : ` (已阻 ${diagnostics.blockedDistance} 章)`)
            : "";
        tokens.push(language === "en"
            ? `blocked on ${missing}${distanceToken}`
            : `受阻于 ${missing}${distanceToken}`);
    }
    return tokens.join("; ");
}
//# sourceMappingURL=hook-stale-detection.js.map