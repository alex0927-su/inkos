import { type ChapterMemo } from "../models/input-governance.js";
export declare class PlannerParseError extends Error {
    constructor(message: string);
}
/**
 * Parse a planner memo produced by the LLM.
 *
 * Format: plain Markdown containing a `## 本章目标` / `## Chapter goal`
 * section, an optional thread-ref section, and the required memo section
 * headings.
 *
 * Strict on the LLM-owned memo sections. Caller-owned fields (chapter /
 * golden-opening) come from the host, not from the model. A long chapter goal
 * is kept in the memo body and reduced only to a short display label for the
 * schema field, so parser robustness does not silently delete planning intent.
 *
 * The parser strips a wrapping Markdown code fence and any leading assistant
 * prose ("好的，下面是...") before the first memo heading. It does not accept
 * YAML frontmatter as a required model protocol anymore.
 */
export declare function parseMemo(raw: string, expectedChapter: number, isGoldenOpening: boolean): ChapterMemo;
//# sourceMappingURL=chapter-memo-parser.d.ts.map