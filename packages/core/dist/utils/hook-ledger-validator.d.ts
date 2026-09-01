/**
 * Phase 9-3: hard gate that a chapter draft actually acts on the hook ledger
 * the planner declared in the memo's "## 本章 hook 账" / "## Hook ledger for
 * this chapter" section.
 *
 * The planner commits, per chapter, to:
 *   - advance: <hook_id> "name" → state-change
 *   - resolve: <hook_id> "name" → action
 *
 * The validator parses those two lists and checks that every committed hook
 * has observable evidence in the draft. "Evidence" means the draft mentions
 * at least one keyword from the ledger line's descriptor (hook name, key
 * noun, etc.). We deliberately do NOT require the draft to repeat the raw
 * hook_id like "H007" — writers don't embed IDs in prose.
 */
export interface HookLedgerViolation {
    readonly severity: "critical" | "warning";
    readonly category: string;
    readonly description: string;
    readonly suggestion: string;
}
export interface HookLedgerEntry {
    readonly id: string;
    /** Raw text of the ledger line after the hook_id. */
    readonly descriptor: string;
    /** 2+ char CJK sequences and 3+ letter ASCII words extracted from descriptor. */
    readonly keywords: ReadonlyArray<string>;
}
export interface HookLedger {
    readonly open: ReadonlyArray<HookLedgerEntry>;
    readonly advance: ReadonlyArray<HookLedgerEntry>;
    readonly resolve: ReadonlyArray<HookLedgerEntry>;
    readonly defer: ReadonlyArray<HookLedgerEntry>;
    /**
     * Count of `[new] ...` placeholder lines in the `open:` subsection. These
     * are brand-new hooks declared by the planner that have no pre-existing
     * hook_id (extractLedgerEntry rejects them because they carry no id to
     * match downstream), but they still count as "a new hook opened" for the
     * 揭 1 埋 1 floor check.
     */
    readonly newOpenCount: number;
}
export declare function parseHookLedger(memoBody: string): HookLedger;
/**
 * Enforce: every hook declared under advance / resolve must have observable
 * evidence in the draft text. We do NOT validate `open` (new hooks don't have
 * a pre-existing id/descriptor to echo) or `defer` (deferred = deliberately
 * not touched).
 *
 * Additionally enforces the "揭 1 埋 1" hard floor (Xu Er Jia De Mao, 番茄文章
 * 10): whenever a chapter resolves one or more hooks, it must open at least
 * as many new hooks in the same memo. "Resolve without opening" leaves the
 * reader feeling "解完即索然无味" — the story loses forward pull. The softer
 * "揭 1 埋 2" rule is a planner-prompt recommendation, not a hard gate here,
 * because enforcing ×2 would conflict with the "≤ 2 new hooks per chapter"
 * cap on the planner side when resolve=2.
 */
export declare function validateHookLedger(memoBody: string, draftContent: string): ReadonlyArray<HookLedgerViolation>;
declare function extractLedgerSection(memoBody: string): string | undefined;
declare function extractLedgerEntry(line: string): HookLedgerEntry | undefined;
/**
 * Extract content-matching tokens from a ledger line's descriptor.
 *
 * Priority 1: quoted hook name — `H007 "胖虎借条" → ...` — this is the most
 * informative token the planner attached, and it's what the writer should
 * echo. We split compound CJK names into leading/trailing 2-grams so
 * partial echoes still count.
 *
 * Priority 2: if no quoted name, fall back to the descriptor text UP TO the
 * first state-transition arrow (→ or ->), same CJK/ASCII splitting. Anything
 * AFTER the arrow describes new state, not the hook itself, and risks
 * character-name false positives.
 */
declare function extractKeywords(descriptor: string): ReadonlyArray<string>;
export declare const INTERNAL: {
    SUBSECTION_KEYS: readonly (keyof HookLedger)[];
    extractLedgerSection: typeof extractLedgerSection;
    extractLedgerEntry: typeof extractLedgerEntry;
    extractKeywords: typeof extractKeywords;
};
export {};
//# sourceMappingURL=hook-ledger-validator.d.ts.map