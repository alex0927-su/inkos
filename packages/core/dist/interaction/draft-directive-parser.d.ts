/**
 * Draft directive parser — extracts structured form data from LLM output
 * that uses markdown directive syntax (:::type{attrs}...:::).
 *
 * Used by both TUI (textContent) and Studio (raw + fields).
 */
export interface ParsedDraftResponse {
    /** key → value extracted from directive blocks */
    fields: Record<string, string>;
    /** Raw text with all ::: directive blocks stripped (for TUI display) */
    textContent: string;
    /** Auto-generated turn summary, e.g. "确立了书名、世界观和主角" */
    summary: string;
    /** Original LLM output, untouched */
    raw: string;
}
/**
 * Parse raw LLM output containing markdown directive blocks.
 *
 * State machine:
 *   text → directive (on :::type{...})
 *   text → codeblock (on ``` or ~~~)
 *   directive → text (on standalone :::)
 *   directive → directive (on nested :::type{...} inside group)
 *   codeblock → text (on matching fence close)
 */
export declare function parseDraftDirectives(raw: string): ParsedDraftResponse;
/**
 * Creates a stateful filter function for streaming LLM output.
 * Text portions pass through immediately; directive blocks (:::...:::)
 * are buffered and suppressed.
 *
 * Usage:
 *   const filter = createDirectiveStreamFilter();
 *   onChunk(chunk => { const visible = filter(chunk); display(visible); });
 */
export declare function createDirectiveStreamFilter(): (chunk: string) => string;
//# sourceMappingURL=draft-directive-parser.d.ts.map