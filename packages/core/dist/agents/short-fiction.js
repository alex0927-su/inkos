import { BaseAgent } from "./base.js";
import { countChapterLength, resolveLengthCountingMode } from "../utils/length-metrics.js";
import { buildShortFictionDraftReviewSystemPrompt, buildShortFictionDraftReviewUserPrompt, buildShortFictionDraftContinuationUserPrompt, buildShortFictionDraftRevisionFollowup, buildShortFictionOutlineReviewSystemPrompt, buildShortFictionOutlineReviewUserPrompt, buildShortFictionOutlineRevisionFollowup, buildShortFictionOutlineSystemPrompt, buildShortFictionOutlineUserPrompt, buildShortFictionPackageSystemPrompt, buildShortFictionPackageUserPrompt, buildShortFictionWriterSystemPrompt, buildShortFictionWriterUserPrompt, } from "../prompts/short-fiction.js";
export const SHORT_FICTION_DEFAULT_CHAPTERS = 12;
export const SHORT_FICTION_MIN_CHAPTERS = 12;
export const SHORT_FICTION_MAX_CHAPTERS = 18;
export const SHORT_FICTION_DEFAULT_CHARS_PER_CHAPTER = 1000;
export const SHORT_FICTION_MIN_CHARS_PER_CHAPTER = 900;
export const SHORT_FICTION_MAX_CHARS_PER_CHAPTER = 1200;
// English shorts are calibrated in words, not characters. length-metrics.ts pins
// the full-length chapter defaults at zh 3000 chars ≈ en 2000 words (a 2/3 ratio),
// so the zh short range of 900/1000/1200 chars per chapter converts to
// 600/650/800 words per chapter (1000 × 2/3 ≈ 667, rounded down to 650).
export const SHORT_FICTION_EN_DEFAULT_WORDS_PER_CHAPTER = 650;
export const SHORT_FICTION_EN_MIN_WORDS_PER_CHAPTER = 600;
export const SHORT_FICTION_EN_MAX_WORDS_PER_CHAPTER = 800;
export class ShortFictionOutlineAgent extends BaseAgent {
    get name() {
        return "short-fiction-outline";
    }
    async createOutline(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionOutlineSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionOutlineUserPrompt(input, input.language) },
        ], { temperature: 0.55, maxTokens: 16_384 }), this.name, this.log);
        return parseShortFictionOutline(response.content, input.language);
    }
}
export class ShortFictionOutlineReviewerAgent extends BaseAgent {
    get name() {
        return "short-fiction-outline-reviewer";
    }
    async reviewOutline(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionOutlineReviewSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionOutlineReviewUserPrompt(input, input.language) },
        ], { temperature: 0.3, maxTokens: 4096 }), this.name, this.log);
        return response.content.trim();
    }
}
export class ShortFictionOutlineReviserAgent extends BaseAgent {
    get name() {
        return "short-fiction-outline-reviser";
    }
    async reviseOutline(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionOutlineSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionOutlineUserPrompt(input, input.language) },
            { role: "assistant", content: input.outline.rawContent.trim() },
            { role: "user", content: buildShortFictionOutlineRevisionFollowup(input, input.language) },
        ], { temperature: 0.45, maxTokens: 16_384 }), this.name, this.log);
        return parseShortFictionOutline(response.content, input.language);
    }
}
export class ShortFictionWriterAgent extends BaseAgent {
    get name() {
        return "short-fiction-writer";
    }
    async writeDraft(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionWriterSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionWriterUserPrompt(input, input.language) },
        ], {
            temperature: 0.58,
            maxTokens: estimateShortFictionMaxTokens(input.chapterCount, input.charsPerChapter),
        }), this.name, this.log);
        return parseShortFictionBatchDraft(response.content, { expectedChapters: input.chapterCount, language: input.language });
    }
    async continueDraft(input) {
        const missingChapters = findEmptyShortFictionChapters(input.draft);
        if (missingChapters.length === 0)
            return input.draft;
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionWriterSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionDraftContinuationUserPrompt({
                    direction: input.direction,
                    outlineMarkdown: input.outlineMarkdown,
                    chapterCount: input.chapterCount,
                    charsPerChapter: input.charsPerChapter,
                    existingDraftMarkdown: renderShortFictionDraftMarkdown(input.draft, input.language),
                    missingChapters,
                }, input.language) },
        ], {
            temperature: 0.68,
            maxTokens: estimateShortFictionMaxTokens(missingChapters.length, input.charsPerChapter),
        }), this.name, this.log);
        return parseShortFictionBatchDraft(`${input.draft.rawContent.trim()}\n\n${response.content.trim()}`, { expectedChapters: input.chapterCount, language: input.language });
    }
}
export class ShortFictionDraftReviewerAgent extends BaseAgent {
    get name() {
        return "short-fiction-draft-reviewer";
    }
    async reviewDraft(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionDraftReviewSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionDraftReviewUserPrompt({
                    ...input,
                    draftMarkdown: renderShortFictionDraftMarkdown(input.draft, input.language),
                }, input.language) },
        ], { temperature: 0.3, maxTokens: 8192 }), this.name, this.log);
        return response.content.trim();
    }
}
export class ShortFictionDraftReviserAgent extends BaseAgent {
    get name() {
        return "short-fiction-draft-reviser";
    }
    async reviseDraft(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionWriterSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionWriterUserPrompt(input, input.language) },
            { role: "assistant", content: input.draft.rawContent.trim() || renderShortFictionDraftMarkdown(input.draft, input.language) },
            { role: "user", content: buildShortFictionDraftRevisionFollowup(input, input.language) },
        ], {
            temperature: 0.45,
            maxTokens: estimateShortFictionMaxTokens(input.chapterCount, input.charsPerChapter),
        }), this.name, this.log);
        return parseShortFictionBatchDraft(response.content, { expectedChapters: input.chapterCount, language: input.language });
    }
}
export class ShortFictionPackagingAgent extends BaseAgent {
    get name() {
        return "short-fiction-packaging";
    }
    async generatePackage(input) {
        const response = await retryShortFictionCall(() => this.chat([
            { role: "system", content: buildShortFictionPackageSystemPrompt(input.language) },
            { role: "user", content: buildShortFictionPackageUserPrompt({
                    direction: input.direction,
                    outlineMarkdown: input.outlineMarkdown,
                    draftMarkdown: renderShortFictionDraftMarkdown(input.draft, input.language),
                    draftTitle: input.draft.storyTitle,
                }, input.language) },
        ], { temperature: 0.45, maxTokens: 4096 }), this.name, this.log);
        return parseShortFictionSalesPackage(response.content, input.draft.storyTitle);
    }
}
export function parseShortFictionOutline(rawContent, language = "zh") {
    const fallbackTitle = untitledShortTitle(language);
    const storyTitle = normalizeTitle(extractTaggedBlock(rawContent, "SHORT_FICTION_PLAN_TITLE")
        || extractTaggedBlock(rawContent, "SHORT_FICTION_TITLE")
        || extractFirstHeading(rawContent)
        || fallbackTitle) || fallbackTitle;
    return { storyTitle, rawContent: rawContent.trim() };
}
export function parseShortFictionBatchDraft(rawContent, options) {
    const expectedChapters = options?.expectedChapters ?? SHORT_FICTION_DEFAULT_CHAPTERS;
    const language = options?.language ?? "zh";
    const countingMode = resolveLengthCountingMode(language);
    const fallbackTitle = untitledShortTitle(language);
    const storyTitle = normalizeTitle(extractTaggedBlock(rawContent, "SHORT_FICTION_TITLE")
        || extractFirstHeading(rawContent)
        || fallbackTitle) || fallbackTitle;
    const openingHook = extractTaggedBlock(rawContent, "SHORT_FICTION_OPENING_HOOK")
        || extractTaggedBlock(rawContent, "OPENING_HOOK");
    const chapters = [];
    for (let number = 1; number <= expectedChapters; number += 1) {
        const title = normalizeChapterTitle(extractTaggedBlock(rawContent, `CHAPTER ${number} TITLE`)
            || extractMarkdownChapterTitle(rawContent, number)
            || fallbackChapterTitle(number, language), number, language);
        const content = sanitizeChapterContent(extractLastNonEmptyTaggedBlock(rawContent, `CHAPTER ${number} CONTENT`)
            || extractDuplicateTitleTaggedChapterContent(rawContent, number)
            || extractMarkdownChapterContent(rawContent, number)
            || "");
        chapters.push({
            number,
            title,
            content,
            // charCount is in the language's native counting unit: zh characters or en words.
            charCount: countChapterLength(content, countingMode),
        });
    }
    return {
        storyTitle,
        openingHook: openingHook.trim() || undefined,
        chapters,
        rawContent,
    };
}
export function validateShortFictionDraftForFinal(draft, options) {
    if (options?.expectedChapters !== undefined && draft.chapters.length !== options.expectedChapters) {
        throw new Error(`Short-hit draft is incomplete; expected ${options.expectedChapters} chapters, got ${draft.chapters.length}.`);
    }
    const emptyChapters = findEmptyShortFictionChapters(draft);
    if (emptyChapters.length > 0) {
        throw new Error(`Short-hit draft is incomplete; empty chapters: ${emptyChapters.join(", ")}.`);
    }
}
export function findEmptyShortFictionChapters(draft) {
    return draft.chapters
        .filter((chapter) => !chapter.content.trim())
        .map((chapter) => chapter.number);
}
export function renderShortFictionDraftMarkdown(draft, language = "zh") {
    const hookHeading = language === "en" ? "## Opening Hook" : "## 开篇钩子";
    return [
        `# ${draft.storyTitle}`,
        draft.openingHook ? `${hookHeading}\n\n${draft.openingHook}` : "",
        ...draft.chapters.map((chapter) => [
            `## ${formatShortFictionChapterHeading(chapter.number, chapter.title, language)}`,
            "",
            chapter.content,
        ].join("\n")),
    ].filter(Boolean).join("\n\n");
}
export function parseShortFictionSalesPackage(rawContent, fallbackTitle = "未命名短篇") {
    const title = normalizeTitle(extractTaggedBlock(rawContent, "SHORT_FICTION_PACKAGE_TITLE")
        || extractTaggedBlock(rawContent, "SHORT_FICTION_TITLE")
        || fallbackTitle) || fallbackTitle;
    const intro = extractTaggedBlock(rawContent, "SHORT_FICTION_INTRO")
        || extractTaggedBlock(rawContent, "INTRO")
        || "";
    const sellingRaw = extractTaggedBlock(rawContent, "SHORT_FICTION_SELLING_POINTS")
        || extractTaggedBlock(rawContent, "SELLING_POINTS")
        || "";
    const coverPrompt = extractTaggedBlock(rawContent, "SHORT_FICTION_COVER_PROMPT")
        || extractTaggedBlock(rawContent, "COVER_PROMPT")
        || "";
    return {
        title,
        intro: intro.trim(),
        sellingPoints: sellingRaw
            .split(/\n+/)
            .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
            .filter(Boolean),
        coverPrompt: coverPrompt.trim(),
        rawContent: rawContent.trim(),
    };
}
function extractTaggedBlock(raw, tag) {
    return extractTaggedBlocks(raw, tag)[0] ?? "";
}
function extractLastNonEmptyTaggedBlock(raw, tag) {
    return extractTaggedBlocks(raw, tag)
        .map((block) => block.trim())
        .filter(Boolean)
        .at(-1) ?? "";
}
function extractTaggedBlocks(raw, tag) {
    const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tagPattern = new RegExp(`^\\s*===\\s*${escaped}\\s*===\\s*$`, "gim");
    const nextTagPattern = /^\s*===\s*[A-Z0-9_ ]+\s*===\s*$/gim;
    const blocks = [];
    for (const match of raw.matchAll(tagPattern)) {
        if (match.index === undefined)
            continue;
        const start = match.index + match[0].length;
        const rest = raw.slice(start).replace(/^\s*\n/, "");
        nextTagPattern.lastIndex = 0;
        const next = nextTagPattern.exec(rest);
        blocks.push((next ? rest.slice(0, next.index) : rest).trim());
    }
    return blocks;
}
function extractFirstHeading(raw) {
    return raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
}
function extractMarkdownChapterTitle(raw, number) {
    const pattern = new RegExp(`^##\\s*(?:${markdownChapterPrefixPattern(number)})?(.+)$`, "m");
    return pattern.exec(raw)?.[1]?.trim() ?? "";
}
function extractMarkdownChapterContent(raw, number) {
    const pattern = new RegExp(`^##\\s*(?:${markdownChapterPrefixPattern(number)})?.*$\\n([\\s\\S]*?)(?=^##\\s*(?:${markdownChapterPrefixPattern(number + 1)})?.*$|(?![\\s\\S]))`, "m");
    return pattern.exec(raw)?.[1]?.trim() ?? "";
}
// Matches a zh "第N章" or en "Chapter N" heading prefix inside markdown fallbacks.
function markdownChapterPrefixPattern(number) {
    return `第\\s*${number}\\s*章\\s*|Chapter\\s*${number}\\s*[:：.\\-–—]?\\s*`;
}
function extractDuplicateTitleTaggedChapterContent(raw, number) {
    const escapedTag = `CHAPTER ${number} TITLE`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const titlePattern = new RegExp(`^\\s*===\\s*${escapedTag}\\s*===\\s*$`, "gim");
    const matches = Array.from(raw.matchAll(titlePattern));
    const duplicateTitle = matches[1];
    if (!duplicateTitle || duplicateTitle.index === undefined)
        return "";
    const start = duplicateTitle.index + duplicateTitle[0].length;
    const rest = raw.slice(start).replace(/^\s*\n/, "");
    const nextTag = rest.search(/^\s*===\s*(?:CHAPTER\s+\d+\s+(?:TITLE|CONTENT)|SHORT_FICTION_[A-Z0-9_ ]+)\s*===\s*$/im);
    return (nextTag >= 0 ? rest.slice(0, nextTag) : rest).trim();
}
function sanitizeChapterContent(raw) {
    return raw
        .replace(/^```(?:md|markdown)?\s*/i, "")
        .replace(/```\s*$/i, "")
        .replace(/^===\s*[A-Z0-9_ ]+\s*===\s*$/gim, "")
        .trim();
}
function normalizeTitle(raw) {
    return raw
        .split("\n")
        .map((line) => line.replace(/^#+\s*/, "").trim())
        .find(Boolean)
        ?.replace(/^《(.+)》$/, "$1")
        .trim() ?? "";
}
function normalizeChapterTitle(raw, number, language = "zh") {
    const prefixPattern = language === "en"
        ? new RegExp(`^Chapter\\s*${number}\\s*[:：.\\-–—]?\\s*`, "i")
        : new RegExp(`^第\\s*${number}\\s*章\\s*`);
    const title = normalizeTitle(raw).replace(prefixPattern, "").trim();
    return title || fallbackChapterTitle(number, language);
}
export function formatShortFictionChapterHeading(number, title, language = "zh") {
    const trimmed = title.trim();
    if (!trimmed)
        return fallbackChapterTitle(number, language);
    if (language === "en") {
        if (new RegExp(`^Chapter\\s*${number}\\b`, "i").test(trimmed))
            return trimmed;
        return `Chapter ${number}: ${trimmed}`;
    }
    if (new RegExp(`^第\\s*${number}\\s*章`).test(trimmed))
        return trimmed;
    return `第${number}章 ${trimmed}`;
}
function untitledShortTitle(language) {
    return language === "en" ? "Untitled Short Story" : "未命名短篇";
}
function fallbackChapterTitle(number, language) {
    return language === "en" ? `Chapter ${number}` : `第${number}章`;
}
// charsPerChapter is the language's native unit (zh chars / en words). The 2.2
// multiplier is calibrated for zh chars (~1-1.5 tokens each); for en words
// (~1.3-1.5 tokens each) it simply leaves extra headroom, which is safe for a cap.
function estimateShortFictionMaxTokens(chapterCount, charsPerChapter) {
    return Math.max(12_288, Math.ceil(chapterCount * charsPerChapter * 2.2) + 4096);
}
async function retryShortFictionCall(operation, label, logger) {
    let lastError;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
        try {
            return await operation();
        }
        catch (e) {
            lastError = e;
            if (attempt >= 2 || !isTransientShortFictionError(e))
                throw e;
            logger?.warn(`[${label}] transient LLM interruption, retrying once: ${String(e)}`);
        }
    }
    throw lastError;
}
function isTransientShortFictionError(error) {
    const message = String(error).toLowerCase();
    return message.includes("unexpected eof")
        || message.includes("econnreset")
        || message.includes("socket hang up")
        || message.includes("terminated")
        || message.includes("fetch failed");
}
//# sourceMappingURL=short-fiction.js.map