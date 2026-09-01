/**
 * Phase 7 hotfix 4 — edge-case coverage for hotfixes 1/2/3.
 *
 * These tests pin down the hotfix-specific invariants that the pre-existing
 * Phase 7 suites did not cover:
 *
 *   hotfix 1: half_life roundtrips through render/parse (12-col), empty cell
 *             falls back to undefined, legacy 11-col still parses.
 *   hotfix 2: architect tags core_hook seeds as promoted=true at seed time;
 *             consolidator re-promotes seeds whose advancedCount>=2 at volume
 *             boundary; reviewer prompt gates critical severity on promoted.
 *   hotfix 3: blocked-distance computation embeds the 已阻 N 章 token.
 */
export {};
//# sourceMappingURL=phase7-hotfix.test.d.ts.map