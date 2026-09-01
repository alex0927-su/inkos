import { normalizePlatformOrOther, defaultChapterLength } from "@actalk/inkos-core";
export { waitForStudioBookReady } from "../lib/book-ready.js";
export function normalizeStudioPlatform(platform) {
    return normalizePlatformOrOther(platform);
}
export function buildStudioBookConfig(body, now) {
    return {
        id: body.title
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fff]/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 30),
        title: body.title,
        platform: normalizeStudioPlatform(body.platform),
        genre: body.genre,
        status: "outlining",
        targetChapters: body.targetChapters ?? 200,
        chapterWordCount: body.chapterWordCount ?? defaultChapterLength(body.language === "en" ? "en" : "zh"),
        ...(body.language === "en"
            ? { language: "en" }
            : body.language === "zh"
                ? { language: "zh" }
                : {}),
        createdAt: now,
        updatedAt: now,
    };
}
//# sourceMappingURL=book-create.js.map