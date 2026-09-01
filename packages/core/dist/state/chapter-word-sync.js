import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { countChapterLength, resolveLengthCountingMode } from "../utils/length-metrics.js";
/**
 * Recount every indexed chapter from its markdown file and write corrected
 * word counts back to chapters/index.json. Used to realign the index after
 * chapter files were edited outside the pipeline (e.g. by hand).
 */
export async function syncChapterWordCounts(deps, bookId) {
    const book = await deps.loadBookConfig(bookId);
    const countingMode = resolveLengthCountingMode(book.language);
    const index = await deps.loadChapterIndex(bookId);
    if (index.length === 0) {
        return { bookId, countingMode, checkedChapters: 0, changes: [], missingChapterFiles: [] };
    }
    const chaptersDir = join(deps.bookDir(bookId), "chapters");
    const fileByNumber = new Map();
    for (const entry of await readdir(chaptersDir)) {
        const match = entry.match(/^(\d+)[_-]?.*\.md$/);
        if (!match)
            continue;
        const number = parseInt(match[1], 10);
        if (!fileByNumber.has(number))
            fileByNumber.set(number, entry);
    }
    const now = new Date().toISOString();
    const changes = [];
    const missingChapterFiles = [];
    const nextIndex = [];
    for (const chapter of index) {
        const fileName = fileByNumber.get(chapter.number);
        if (!fileName) {
            missingChapterFiles.push(chapter.number);
            nextIndex.push(chapter);
            continue;
        }
        const content = await readFile(join(chaptersDir, fileName), "utf-8");
        const wordCount = countChapterLength(content, countingMode);
        if (wordCount === chapter.wordCount) {
            nextIndex.push(chapter);
            continue;
        }
        changes.push({
            number: chapter.number,
            title: chapter.title,
            previousWordCount: chapter.wordCount,
            wordCount,
        });
        nextIndex.push({ ...chapter, wordCount, updatedAt: now });
    }
    if (changes.length > 0) {
        await deps.saveChapterIndex(bookId, nextIndex);
    }
    return {
        bookId,
        countingMode,
        checkedChapters: index.length,
        changes,
        missingChapterFiles,
    };
}
//# sourceMappingURL=chapter-word-sync.js.map