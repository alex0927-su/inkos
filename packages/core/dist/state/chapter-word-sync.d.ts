import type { BookConfig } from "../models/book.js";
import type { ChapterMeta } from "../models/chapter.js";
import type { LengthCountingMode } from "../models/length-governance.js";
export interface ChapterWordSyncDeps {
    bookDir(bookId: string): string;
    loadBookConfig(bookId: string): Promise<BookConfig>;
    loadChapterIndex(bookId: string): Promise<ReadonlyArray<ChapterMeta>>;
    saveChapterIndex(bookId: string, index: ReadonlyArray<ChapterMeta>): Promise<void>;
}
export interface ChapterWordCountChange {
    readonly number: number;
    readonly title: string;
    readonly previousWordCount: number;
    readonly wordCount: number;
}
export interface ChapterWordSyncResult {
    readonly bookId: string;
    readonly countingMode: LengthCountingMode;
    readonly checkedChapters: number;
    readonly changes: ReadonlyArray<ChapterWordCountChange>;
    /** Index entries whose chapter markdown file is missing on disk (left untouched). */
    readonly missingChapterFiles: ReadonlyArray<number>;
}
/**
 * Recount every indexed chapter from its markdown file and write corrected
 * word counts back to chapters/index.json. Used to realign the index after
 * chapter files were edited outside the pipeline (e.g. by hand).
 */
export declare function syncChapterWordCounts(deps: ChapterWordSyncDeps, bookId: string): Promise<ChapterWordSyncResult>;
//# sourceMappingURL=chapter-word-sync.d.ts.map