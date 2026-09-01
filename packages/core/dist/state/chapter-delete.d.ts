import type { ChapterMeta } from "../models/chapter.js";
export interface ChapterDeleteDeps {
    bookDir(bookId: string): string;
    loadChapterIndex(bookId: string): Promise<ReadonlyArray<ChapterMeta>>;
    rollbackToChapter(bookId: string, targetChapter: number): Promise<ReadonlyArray<number>>;
}
export interface DeleteLatestChapterOptions {
    /** Must equal the latest chapter number; defaults to it. Middle chapters are not deletable. */
    readonly chapterNumber?: number;
}
export interface DeleteLatestChapterResult {
    readonly bookId: string;
    readonly deletedChapter: number;
    readonly title: string;
    /** Book-relative POSIX paths of chapter files preserved under chapters/.trash/. */
    readonly trashedFiles: ReadonlyArray<string>;
    readonly rolledBackTo: number;
    readonly discarded: ReadonlyArray<number>;
}
/**
 * Delete the latest chapter of a book: the chapter markdown is preserved under
 * chapters/.trash/ (never hard-deleted), then the index, snapshots, runtime
 * artifacts, and story state are rolled back to the previous chapter via the
 * same rollback mechanism the review-reject flow uses.
 *
 * Only the latest chapter is deletable — removing a middle chapter would
 * require renumbering every later chapter and replaying state on top of it.
 */
export declare function deleteLatestChapter(deps: ChapterDeleteDeps, bookId: string, options?: DeleteLatestChapterOptions): Promise<DeleteLatestChapterResult>;
//# sourceMappingURL=chapter-delete.d.ts.map