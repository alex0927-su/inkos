import { type ParsedGenreProfile } from "../models/genre-profile.js";
import { type ParsedBookRules } from "../models/book-rules.js";
/**
 * Load genre profile. Lookup order:
 * 1. Project-level: {projectRoot}/genres/{genreId}.md
 * 2. Built-in:     packages/core/genres/{genreId}.md
 * 3. Fallback:     built-in other.md
 */
export declare function readGenreProfile(projectRoot: string, genreId: string): Promise<ParsedGenreProfile>;
/**
 * List all available genre profiles (project-level + built-in, deduped).
 * Returns array of { id, name, source }.
 */
export declare function listAvailableGenres(projectRoot: string): Promise<ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly source: "project" | "builtin";
}>>;
/** Return the path to the built-in genres directory. */
export declare function getBuiltinGenresDir(): string;
/**
 * Load structured book rules.
 *
 * New books keep the authoritative rules in story/book_rules.md as ordinary
 * Markdown; parseBookRules() extracts the small structured surface the runtime
 * needs and preserves the Markdown as body. Older Phase 5 books may still have
 * YAML frontmatter on outline/story_frame.md with book_rules.md as a shim; that
 * path is legacy fallback only.
 */
export declare function readBookRules(bookDir: string): Promise<ParsedBookRules | null>;
export declare function readBookLanguage(bookDir: string): Promise<"zh" | "en" | undefined>;
//# sourceMappingURL=rules-reader.d.ts.map