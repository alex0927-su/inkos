import type { StoredHook } from "../state/memory-db.js";
/**
 * Phase 5: prefer roles/ directory; fall back to legacy character_matrix.md.
 * storyDir is <bookDir>/story, so the caller indirectly points us at bookDir
 * via dirname().
 */
export declare function readCharacterMatrix(storyDir: string): Promise<string>;
export declare function readSubplotBoard(storyDir: string): Promise<string>;
export declare function readEmotionalArcs(storyDir: string): Promise<string>;
export declare function readBrief(storyDir: string): Promise<string>;
/**
 * Render the structured book rules (protagonist / prohibitions / genreLock /
 * behavioral constraints) as a compact markdown block for the planner prompt.
 *
 * Phase 5 cleanup #3: reads the YAML frontmatter via readStructuredBookRules
 * (which prefers story_frame.md and falls back to legacy book_rules.md).
 * Returns "" when no structured rules are defined — the planner template
 * provides its own placeholder for that case.
 */
export declare function readBookRules(storyDir: string): Promise<string>;
/**
 * Grab the last N row(s) from chapter_summaries.md formatted as markdown
 * table. Returns original table slice (with header) so the planner gets
 * column meaning implicitly.
 */
export declare function formatRecentSummaries(chapterSummariesRaw: string, chapterNumber: number, limit: number): string;
/**
 * Option A: temporarily compose current_arc prose from subplot_board.md
 * active rows + emotional_arcs.md recent rows. Phase 8 will replace this
 * source with a dedicated tier2_current_arc.md file.
 */
export declare function composeCurrentArcProse(subplotBoardRaw: string, emotionalArcsRaw: string, chapterNumber: number): string;
/**
 * Extract the protagonist row from character_matrix.md. Protagonist is detected
 * by a cell in the 与主角关系 column matching "主角本人" / "主角" / "protagonist"
 * (case-insensitive). Falls back to the first non-header data row if no
 * explicit match is found — that row is almost always the protagonist by
 * convention.
 */
export declare function extractProtagonistRow(characterMatrixRaw: string): string;
export declare function extractOpponentRows(characterMatrixRaw: string, limit: number): string;
export declare function extractCollaboratorRows(characterMatrixRaw: string, limit: number): string;
export declare function formatRelevantThreads(hooks: ReadonlyArray<StoredHook>, subplotBoardRaw: string, language?: "zh" | "en"): string;
/**
 * Phase 9-2: render stale hooks that the planner MUST dispose of in this
 * chapter's memo ("## 本章 hook 账"). These are already filtered by
 * computeRecyclableHooks; here we just format them for the prompt.
 *
 * Language switch mirrors the rest of the planner prompt: zh by default,
 * en for English books.
 */
export declare function formatRecyclableHooks(hooks: ReadonlyArray<StoredHook>, chapterNumber: number, language?: "zh" | "en"): string;
//# sourceMappingURL=planner-context.d.ts.map