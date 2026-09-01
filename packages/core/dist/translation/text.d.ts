export interface TranslationTextChapter {
    readonly title: string;
    readonly content: string;
}
export declare function normalizeTranslationText(value: string): string;
export declare function splitTranslationChapters(text: string): ReadonlyArray<TranslationTextChapter>;
export declare function segmentTranslationText(text: string, maxChars?: number): ReadonlyArray<string>;
export declare function stripHtml(html: string): string;
export declare function decodeHtml(value: string): string;
//# sourceMappingURL=text.d.ts.map