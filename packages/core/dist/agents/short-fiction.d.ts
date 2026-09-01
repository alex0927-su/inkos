import { BaseAgent } from "./base.js";
import { type ShortFictionLanguage } from "../prompts/short-fiction.js";
export declare const SHORT_FICTION_DEFAULT_CHAPTERS = 12;
export declare const SHORT_FICTION_MIN_CHAPTERS = 12;
export declare const SHORT_FICTION_MAX_CHAPTERS = 18;
export declare const SHORT_FICTION_DEFAULT_CHARS_PER_CHAPTER = 1000;
export declare const SHORT_FICTION_MIN_CHARS_PER_CHAPTER = 900;
export declare const SHORT_FICTION_MAX_CHARS_PER_CHAPTER = 1200;
export declare const SHORT_FICTION_EN_DEFAULT_WORDS_PER_CHAPTER = 650;
export declare const SHORT_FICTION_EN_MIN_WORDS_PER_CHAPTER = 600;
export declare const SHORT_FICTION_EN_MAX_WORDS_PER_CHAPTER = 800;
export type { ShortFictionLanguage } from "../prompts/short-fiction.js";
export interface ShortFictionOutline {
    readonly storyTitle: string;
    readonly rawContent: string;
}
export interface ShortFictionChapter {
    readonly number: number;
    readonly title: string;
    readonly content: string;
    readonly charCount: number;
}
export interface ShortFictionBatchDraft {
    readonly storyTitle: string;
    readonly openingHook?: string;
    readonly chapters: ReadonlyArray<ShortFictionChapter>;
    readonly rawContent: string;
}
export interface ShortFictionSalesPackage {
    readonly title: string;
    readonly intro: string;
    readonly sellingPoints: ReadonlyArray<string>;
    readonly coverPrompt: string;
    readonly rawContent: string;
}
export interface ShortFictionReference {
    readonly path?: string;
    readonly text: string;
}
export interface ShortFictionOutlineInput {
    readonly direction: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
    readonly reference?: ShortFictionReference;
    readonly language?: ShortFictionLanguage;
}
export interface ShortFictionOutlineReviewInput {
    readonly direction: string;
    readonly outline: ShortFictionOutline;
    readonly reference?: ShortFictionReference;
    readonly language?: ShortFictionLanguage;
}
export interface ShortFictionOutlineRevisionInput extends ShortFictionOutlineReviewInput {
    readonly review: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
}
export interface ShortFictionDraftInput {
    readonly direction: string;
    readonly outlineMarkdown: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
    readonly language?: ShortFictionLanguage;
}
export interface ShortFictionDraftReviewInput extends ShortFictionDraftInput {
    readonly draft: ShortFictionBatchDraft;
}
export interface ShortFictionDraftRevisionInput extends ShortFictionDraftReviewInput {
    readonly review: string;
}
export interface ShortFictionPackageInput {
    readonly direction: string;
    readonly outlineMarkdown: string;
    readonly draft: ShortFictionBatchDraft;
    readonly language?: ShortFictionLanguage;
}
export declare class ShortFictionOutlineAgent extends BaseAgent {
    get name(): string;
    createOutline(input: ShortFictionOutlineInput): Promise<ShortFictionOutline>;
}
export declare class ShortFictionOutlineReviewerAgent extends BaseAgent {
    get name(): string;
    reviewOutline(input: ShortFictionOutlineReviewInput): Promise<string>;
}
export declare class ShortFictionOutlineReviserAgent extends BaseAgent {
    get name(): string;
    reviseOutline(input: ShortFictionOutlineRevisionInput): Promise<ShortFictionOutline>;
}
export declare class ShortFictionWriterAgent extends BaseAgent {
    get name(): string;
    writeDraft(input: ShortFictionDraftInput): Promise<ShortFictionBatchDraft>;
    continueDraft(input: ShortFictionDraftInput & {
        readonly draft: ShortFictionBatchDraft;
    }): Promise<ShortFictionBatchDraft>;
}
export declare class ShortFictionDraftReviewerAgent extends BaseAgent {
    get name(): string;
    reviewDraft(input: ShortFictionDraftReviewInput): Promise<string>;
}
export declare class ShortFictionDraftReviserAgent extends BaseAgent {
    get name(): string;
    reviseDraft(input: ShortFictionDraftRevisionInput): Promise<ShortFictionBatchDraft>;
}
export declare class ShortFictionPackagingAgent extends BaseAgent {
    get name(): string;
    generatePackage(input: ShortFictionPackageInput): Promise<ShortFictionSalesPackage>;
}
export declare function parseShortFictionOutline(rawContent: string, language?: ShortFictionLanguage): ShortFictionOutline;
export declare function parseShortFictionBatchDraft(rawContent: string, options?: {
    readonly expectedChapters?: number;
    readonly language?: ShortFictionLanguage;
}): ShortFictionBatchDraft;
export declare function validateShortFictionDraftForFinal(draft: ShortFictionBatchDraft, options?: {
    readonly expectedChapters?: number;
}): void;
export declare function findEmptyShortFictionChapters(draft: ShortFictionBatchDraft): number[];
export declare function renderShortFictionDraftMarkdown(draft: ShortFictionBatchDraft, language?: ShortFictionLanguage): string;
export declare function parseShortFictionSalesPackage(rawContent: string, fallbackTitle?: string): ShortFictionSalesPackage;
export declare function formatShortFictionChapterHeading(number: number, title: string, language?: ShortFictionLanguage): string;
//# sourceMappingURL=short-fiction.d.ts.map