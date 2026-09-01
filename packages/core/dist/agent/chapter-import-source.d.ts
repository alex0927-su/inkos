import { type SplitChapter } from "../utils/chapter-splitter.js";
export declare function compareChapterSourceNames(left: string, right: string): number;
/**
 * Load chapters from a local source path for `import_chapters`.
 *
 * - Directory mode: each `.md`/`.txt` file becomes one chapter, in filename
 *   natural numeric order. The chapter title is the filename without its extension and
 *   without a leading numeric prefix (e.g. `03_风暴.md` → `风暴`).
 * - Single-file mode: the file is split into chapters with `splitChapters`,
 *   using `splitPattern` as a custom heading regex when provided.
 *
 * This mirrors the pure loading logic of `inkos import chapters` in the CLI
 * so the agent tool does not depend on the CLI package.
 */
export declare function loadChaptersFromPath(sourcePath: string, splitPattern?: string): Promise<ReadonlyArray<SplitChapter>>;
//# sourceMappingURL=chapter-import-source.d.ts.map