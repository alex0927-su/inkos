/**
 * Phase 5 (v13) path resolution — prefer the new prose outline files, fall
 * back to legacy paths so older books keep working during transition.
 *
 * Maps:
 *   story/outline/story_frame.md  →  preferred replacement for story_bible.md
 *   story/outline/volume_map.md   →  preferred replacement for volume_outline.md
 *   story/roles/主要角色/*.md +
 *   story/roles/次要角色/*.md    →  preferred replacement for character_matrix.md
 *
 * All helpers accept a bookDir (path to a book root, containing `story/`)
 * and return a string — either the new-file content when it exists, or the
 * legacy file content, or an empty default placeholder.
 */
/**
 * Detect whether a book uses the Phase 5 new layout (outline/story_frame.md
 * exists on disk). If yes, story_bible.md / book_rules.md are compat shims.
 * If no, those files ARE the authoritative source.
 */
export declare function isNewLayoutBook(bookDir: string): Promise<boolean>;
/**
 * Whether a book's architect foundation is fully written on disk. A long
 * architect run (especially on a stronger model) can outlive the in-memory
 * create-status tracking — or the server can restart mid-run — leaving the
 * status endpoint with no entry. Checking disk lets create-status answer
 * "ready" truthfully instead of an ambiguous 404 that reads as "failed".
 *
 * "Complete" mirrors the five sections the architect must emit
 * (story_frame / volume_map / book_rules / pending_hooks / roles); a half-built
 * book that is missing any of these is NOT ready.
 */
export declare function isBookFoundationComplete(bookDir: string): Promise<boolean>;
/** Read story_frame.md, falling back to legacy story_bible.md. */
export declare function readStoryFrame(bookDir: string, fallbackPlaceholder?: string): Promise<string>;
/** Read volume_map.md, falling back to legacy volume_outline.md. */
export declare function readVolumeMap(bookDir: string, fallbackPlaceholder?: string): Promise<string>;
/** Read the rhythm principles file (zh or en variant). */
export declare function readRhythmPrinciples(bookDir: string): Promise<string>;
export interface RoleCard {
    readonly tier: "major" | "minor";
    readonly name: string;
    readonly content: string;
}
/**
 * Read the roles/ directory. Returns [] when no roles are present (e.g. old
 * books still on character_matrix.md).
 */
export declare function readRoleCards(bookDir: string): Promise<ReadonlyArray<RoleCard>>;
/**
 * Render role cards in a format compatible with downstream consumers that
 * previously expected character_matrix.md prose. When no role cards exist,
 * returns the legacy character_matrix.md content or the placeholder.
 */
export declare function readCharacterContext(bookDir: string, fallbackPlaceholder?: string): Promise<string>;
export declare function isCurrentStateSeedPlaceholder(raw: string): boolean;
/**
 * Read current_state.md; when the file is only a seed placeholder (chapter 0,
 * before consolidator has appended anything), derive an initial-state block
 * from roles/*.Current_State + pending_hooks startChapter=0 rows so callers
 * still have substantive content to feed into writer / analyzer prompts.
 */
export declare function readCurrentStateWithFallback(bookDir: string, fallbackPlaceholder?: string): Promise<string>;
//# sourceMappingURL=outline-paths.d.ts.map