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
export function shouldPromoteHook(hook, context) {
    const reasons = [];
    if (hook.coreHook === true) {
        reasons.push("core_hook");
    }
    if ((hook.dependsOn?.length ?? 0) > 0) {
        reasons.push("depends_on");
    }
    const advancedCount = hook.advancedCount
        ?? context.advancedCounts.get(hook.hookId)
        ?? 0;
    if (advancedCount >= 2) {
        reasons.push("advanced_count");
    }
    if (isCrossVolume(hook, context)) {
        reasons.push("cross_volume");
    }
    return {
        promote: reasons.length > 0,
        reasons,
    };
}
function isCrossVolume(hook, context) {
    const { volumeBoundaries, allSeedStartChapters } = context;
    if (volumeBoundaries.length < 2)
        return false;
    const seedVolumeIndex = findVolumeIndex(volumeBoundaries, hook.startChapter);
    if (seedVolumeIndex < 0)
        return false;
    // Case A: upstream hook is declared in a later volume than this seed.
    for (const upstreamId of hook.dependsOn ?? []) {
        const upstreamStart = allSeedStartChapters.get(upstreamId);
        if (upstreamStart === undefined)
            continue;
        const upstreamVolumeIndex = findVolumeIndex(volumeBoundaries, upstreamStart);
        if (upstreamVolumeIndex > seedVolumeIndex)
            return true;
    }
    // Case B: pays_off_in_arc mentions a different volume. We stay prose-friendly
    // and only detect obvious "第 N 卷" / "volume N" tokens. When parsing fails
    // we fall back to payoff timing heuristics.
    const arcVolumeIndex = extractVolumeIndexFromArc(hook.paysOffInArc ?? "");
    if (arcVolumeIndex !== null && arcVolumeIndex !== seedVolumeIndex) {
        return true;
    }
    // Case C: payoff timing marks it as endgame / slow-burn while the hook is
    // planted in an early volume — that alone qualifies as cross-volume.
    if ((hook.payoffTiming === "endgame" || hook.payoffTiming === "slow-burn")
        && seedVolumeIndex < volumeBoundaries.length - 1) {
        return true;
    }
    return false;
}
function findVolumeIndex(boundaries, chapter) {
    for (let i = 0; i < boundaries.length; i++) {
        const vol = boundaries[i];
        if (chapter >= vol.startCh && chapter <= vol.endCh)
            return i;
    }
    // Chapter 0 (seed time) counts as volume 0 if volumes start at 1.
    if (chapter <= 0 && boundaries.length > 0)
        return 0;
    return -1;
}
const VOLUME_PATTERNS = [
    /第\s*([一二三四五六七八九十百千\d]+)\s*卷/u,
    /volume\s+(\d+)/i,
    /vol\.?\s*(\d+)/i,
];
function extractVolumeIndexFromArc(arc) {
    const trimmed = arc.trim();
    if (!trimmed)
        return null;
    for (const pattern of VOLUME_PATTERNS) {
        const match = trimmed.match(pattern);
        if (!match)
            continue;
        const token = match[1] ?? "";
        const n = parseVolumeNumber(token);
        if (n !== null)
            return n - 1; // 1-indexed in prose, 0-indexed here.
    }
    return null;
}
const CHINESE_NUMERALS = {
    一: 1, 二: 2, 三: 3, 四: 4, 五: 5,
    六: 6, 七: 7, 八: 8, 九: 9, 十: 10,
};
function parseVolumeNumber(token) {
    if (/^\d+$/.test(token))
        return parseInt(token, 10);
    if (token.length === 1 && CHINESE_NUMERALS[token])
        return CHINESE_NUMERALS[token];
    if (token === "十")
        return 10;
    return null;
}
/**
 * Derive the default half-life (in chapters) for a hook that did not set it
 * explicitly. Mirrors the prompt defaults: immediate/near-term = 10,
 * mid-arc = 30, slow-burn/endgame = 80. Unknown timing falls to mid-arc.
 */
export function defaultHalfLifeChapters(payoffTiming) {
    switch (payoffTiming) {
        case "immediate":
        case "near-term":
            return 10;
        case "slow-burn":
        case "endgame":
            return 80;
        case "mid-arc":
        default:
            return 30;
    }
}
export function resolveHalfLifeChapters(hook) {
    return hook.halfLifeChapters ?? defaultHalfLifeChapters(hook.payoffTiming);
}
// ---------------------------------------------------------------------------
// Shared advanced_count promotion pass (used by both consolidator and runner)
// ---------------------------------------------------------------------------
/**
 * Escape special regex characters in a string so it can be used as a
 * literal pattern inside `new RegExp(...)`.
 */
export function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
 * Derive hook advancement counts from chapter_summaries.md content.
 *
 * Counts how many chapter-summary data rows mention each hook id in the
 * hookActivity column (index 5, 0-based — "伏笔动态" / "hookActivity").
 */
export function deriveAdvancedCountsFromSummaries(summariesRaw, hookIds) {
    const counts = new Map();
    if (!summariesRaw.trim() || hookIds.length === 0)
        return counts;
    const lines = summariesRaw.split("\n");
    // Detect hookActivity column index from the header row.
    const hookActivityIndex = detectHookActivityColumnIndex(lines);
    for (const hookId of hookIds) {
        const escaped = escapeRegex(hookId);
        const pattern = new RegExp(`\\b${escaped}\\b`, "i");
        let count = 0;
        for (const line of lines) {
            if (!line.startsWith("|"))
                continue;
            // Skip header / separator rows.
            if (line.includes("---") || /\|\s*(章节|Chapter)\s*\|/i.test(line))
                continue;
            // Only match in the hookActivity column, not the full row.
            const cell = extractColumn(line, hookActivityIndex);
            if (cell !== null && pattern.test(cell))
                count += 1;
        }
        if (count > 0)
            counts.set(hookId, count);
    }
    return counts;
}
/**
 * Find the 0-based column index of the hookActivity / 伏笔动态 header.
 * Falls back to 5 (the standard position in our schema).
 */
function detectHookActivityColumnIndex(lines) {
    const DEFAULT_INDEX = 5;
    for (const line of lines) {
        if (!line.startsWith("|"))
            continue;
        if (/\|\s*(章节|Chapter)\s*\|/i.test(line)) {
            const cols = line.split("|").map((c) => c.trim());
            const idx = cols.findIndex((c) => /^(伏笔动态|hookActivity)$/i.test(c));
            return idx >= 0 ? idx : DEFAULT_INDEX;
        }
    }
    return DEFAULT_INDEX;
}
/**
 * Extract a single column value from a pipe-delimited table row.
 * Returns null when the column index is out of range.
 */
function extractColumn(row, index) {
    const cols = row.split("|");
    if (index >= 0 && index < cols.length) {
        return cols[index].trim();
    }
    return null;
}
/**
 * Lightweight promotion pass: read hooks + chapter_summaries, check
 * advancedCount >= 2, flip promoted flag. No LLM calls.
 *
 * Returns the result without doing any I/O — caller decides whether to
 * persist.
 */
export function rerunPromotionPass(hooks, summariesRaw) {
    if (hooks.length === 0) {
        return { updated: false, hooks, flippedCount: 0 };
    }
    const derivedCounts = deriveAdvancedCountsFromSummaries(summariesRaw, hooks.map((h) => h.hookId));
    let flipped = 0;
    const nextHooks = hooks.map((hook) => {
        if (hook.promoted === true)
            return hook;
        const advanced = hook.advancedCount ?? derivedCounts.get(hook.hookId) ?? 0;
        if (advanced >= 2) {
            flipped += 1;
            return { ...hook, promoted: true };
        }
        return hook;
    });
    return {
        updated: flipped > 0,
        hooks: nextHooks,
        flippedCount: flipped,
    };
}
//# sourceMappingURL=hook-promotion.js.map