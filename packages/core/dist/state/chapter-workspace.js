import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
const VERSION_ID_PATTERN = /^(\d{13})_(manual|agent|revision|regeneration|restore)_([0-9a-f-]{36})$/;
export async function readChapterUserBrief(bookDir, chapterNumber) {
    try {
        return (await readFile(userBriefPath(bookDir, chapterNumber), "utf-8")).trim();
    }
    catch (error) {
        if (isMissingFile(error))
            return "";
        throw error;
    }
}
export async function saveChapterUserBrief(bookDir, chapterNumber, brief) {
    const path = userBriefPath(bookDir, chapterNumber);
    const normalized = brief.trim();
    if (!normalized) {
        await rm(path, { force: true });
        return;
    }
    await mkdir(join(bookDir, "story", "runtime"), { recursive: true });
    await writeFile(path, `${normalized}\n`, "utf-8");
}
export async function readChapterPlanDocument(bookDir, chapterNumber) {
    try {
        return await readFile(planPath(bookDir, chapterNumber), "utf-8");
    }
    catch (error) {
        if (isMissingFile(error))
            return null;
        throw error;
    }
}
export async function archiveChapterVersion(bookDir, chapterNumber, content, source, now = new Date()) {
    assertChapterNumber(chapterNumber);
    const id = `${now.getTime()}_${source}_${randomUUID()}`;
    const dir = versionsDir(bookDir, chapterNumber);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, `${id}.md`), content, "utf-8");
    return {
        id,
        chapterNumber,
        source,
        createdAt: now.toISOString(),
        characterCount: content.length,
    };
}
export async function listChapterVersions(bookDir, chapterNumber) {
    assertChapterNumber(chapterNumber);
    let files;
    try {
        files = await readdir(versionsDir(bookDir, chapterNumber));
    }
    catch (error) {
        if (isMissingFile(error))
            return [];
        throw error;
    }
    const versions = await Promise.all(files.flatMap((file) => {
        if (!file.endsWith(".md"))
            return [];
        const id = file.slice(0, -3);
        const parsed = parseVersionId(id);
        if (!parsed)
            return [];
        return [readFile(join(versionsDir(bookDir, chapterNumber), file), "utf-8").then((content) => ({
                id,
                chapterNumber,
                source: parsed.source,
                createdAt: new Date(parsed.timestamp).toISOString(),
                characterCount: content.length,
            }))];
    }));
    return versions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function readChapterVersion(bookDir, chapterNumber, versionId) {
    assertChapterNumber(chapterNumber);
    if (!parseVersionId(versionId)) {
        throw new Error(`Invalid chapter version id: ${versionId}`);
    }
    return readFile(join(versionsDir(bookDir, chapterNumber), `${versionId}.md`), "utf-8");
}
function userBriefPath(bookDir, chapterNumber) {
    assertChapterNumber(chapterNumber);
    return join(bookDir, "story", "runtime", `chapter-${padChapter(chapterNumber)}.user-brief.md`);
}
function planPath(bookDir, chapterNumber) {
    assertChapterNumber(chapterNumber);
    return join(bookDir, "story", "runtime", `chapter-${padChapter(chapterNumber)}.plan.md`);
}
function versionsDir(bookDir, chapterNumber) {
    return join(bookDir, "chapters", ".versions", padChapter(chapterNumber));
}
function padChapter(chapterNumber) {
    return String(chapterNumber).padStart(4, "0");
}
function assertChapterNumber(chapterNumber) {
    if (!Number.isInteger(chapterNumber) || chapterNumber < 1) {
        throw new Error(`Invalid chapter number: ${chapterNumber}`);
    }
}
function parseVersionId(versionId) {
    const match = versionId.match(VERSION_ID_PATTERN);
    if (!match)
        return null;
    const timestamp = Number.parseInt(match[1], 10);
    if (!Number.isFinite(timestamp))
        return null;
    return {
        timestamp,
        source: match[2],
    };
}
function isMissingFile(error) {
    return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
//# sourceMappingURL=chapter-workspace.js.map