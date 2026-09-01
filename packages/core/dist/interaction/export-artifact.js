import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { EPub } from "epub-gen-memory";
function buildChapterFileLookup(files) {
    const lookup = new Map();
    for (const file of files) {
        if (!file.endsWith(".md") || !/^\d{4}/.test(file)) {
            continue;
        }
        const chapterNumber = parseInt(file.slice(0, 4), 10);
        if (!lookup.has(chapterNumber)) {
            lookup.set(chapterNumber, file);
        }
    }
    return lookup;
}
function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
function markdownToSimpleHtml(markdown) {
    const title = markdown.match(/^#\s+(.+)/m)?.[1]?.trim() ?? "Untitled Chapter";
    const html = markdown
        .split("\n")
        .filter((line) => !line.startsWith("#"))
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `<p>${escapeHtml(line)}</p>`)
        .join("\n");
    return { title, html };
}
export async function buildExportArtifact(state, bookId, options) {
    const format = options.format ?? "txt";
    const index = await state.loadChapterIndex(bookId);
    const book = await state.loadBookConfig(bookId);
    const chapters = options.approvedOnly
        ? index.filter((chapter) => chapter.status === "approved")
        : index;
    if (chapters.length === 0) {
        throw new Error("No chapters to export.");
    }
    const bookDir = state.bookDir(bookId);
    const chaptersDir = join(bookDir, "chapters");
    const projectRoot = dirname(dirname(bookDir));
    const outputPath = options.outputPath ?? join(projectRoot, `${bookId}_export.${format}`);
    const chapterFiles = buildChapterFileLookup(await readdir(chaptersDir));
    const totalWords = chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);
    if (format === "epub") {
        const epubChapters = [];
        for (const chapter of chapters) {
            const match = chapterFiles.get(chapter.number);
            if (!match) {
                continue;
            }
            const markdown = await readFile(join(chaptersDir, match), "utf-8");
            const { title, html } = markdownToSimpleHtml(markdown);
            epubChapters.push({ title, content: html });
        }
        const epubInstance = new EPub({ title: book.title, lang: book.language === "en" ? "en" : "zh-CN" }, epubChapters);
        return {
            outputPath,
            fileName: `${bookId}.epub`,
            chaptersExported: chapters.length,
            totalWords,
            format,
            contentType: "application/epub+zip",
            payload: await epubInstance.genEpub(),
        };
    }
    const parts = [];
    parts.push(format === "md" ? `# ${book.title}\n\n---\n` : `${book.title}\n\n`);
    for (const chapter of chapters) {
        const match = chapterFiles.get(chapter.number);
        if (!match) {
            continue;
        }
        parts.push(await readFile(join(chaptersDir, match), "utf-8"));
        parts.push("\n\n");
    }
    return {
        outputPath,
        fileName: `${bookId}.${format}`,
        chaptersExported: chapters.length,
        totalWords,
        format,
        contentType: format === "md" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8",
        payload: parts.join(format === "md" ? "\n---\n\n" : "\n"),
    };
}
export async function writeExportArtifact(state, bookId, options) {
    const artifact = await buildExportArtifact(state, bookId, options);
    await mkdir(dirname(artifact.outputPath), { recursive: true });
    await writeFile(artifact.outputPath, artifact.payload);
    return {
        outputPath: artifact.outputPath,
        chaptersExported: artifact.chaptersExported,
        totalWords: artifact.totalWords,
        format: artifact.format,
    };
}
//# sourceMappingURL=export-artifact.js.map