export type ShortFictionLanguage = "zh" | "en";
export interface ShortFictionReferencePromptInput {
    readonly text?: string;
}
export interface ShortFictionOutlinePromptInput {
    readonly direction: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
    readonly reference?: ShortFictionReferencePromptInput;
}
export interface ShortFictionOutlineReviewPromptInput {
    readonly direction: string;
    readonly outline: {
        readonly rawContent: string;
    };
    readonly reference?: ShortFictionReferencePromptInput;
}
export interface ShortFictionOutlineRevisionPromptInput extends ShortFictionOutlineReviewPromptInput {
    readonly review: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
}
export interface ShortFictionDraftPromptInput {
    readonly direction: string;
    readonly outlineMarkdown: string;
    readonly chapterCount: number;
    readonly charsPerChapter: number;
}
export interface ShortFictionDraftContinuationPromptInput extends ShortFictionDraftPromptInput {
    readonly existingDraftMarkdown: string;
    readonly missingChapters: readonly number[];
}
export interface ShortFictionDraftReviewPromptInput extends ShortFictionDraftPromptInput {
    readonly draftMarkdown: string;
}
export interface ShortFictionDraftRevisionPromptInput extends ShortFictionDraftPromptInput {
    readonly review: string;
}
export interface ShortFictionPackagePromptInput {
    readonly direction: string;
    readonly outlineMarkdown: string;
    readonly draftMarkdown: string;
    readonly draftTitle: string;
}
export declare function buildShortFictionOutlineSystemPrompt(language?: ShortFictionLanguage): string;
export declare function buildShortFictionOutlineUserPrompt(input: ShortFictionOutlinePromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionOutlineReviewSystemPrompt(language?: ShortFictionLanguage): string;
export declare function buildShortFictionOutlineReviewUserPrompt(input: ShortFictionOutlineReviewPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionOutlineRevisionFollowup(input: ShortFictionOutlineRevisionPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionWriterSystemPrompt(language?: ShortFictionLanguage): string;
export declare function buildShortFictionWriterUserPrompt(input: ShortFictionDraftPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionDraftContinuationUserPrompt(input: ShortFictionDraftContinuationPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionDraftReviewSystemPrompt(language?: ShortFictionLanguage): string;
export declare function buildShortFictionDraftReviewUserPrompt(input: ShortFictionDraftReviewPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionDraftRevisionFollowup(input: ShortFictionDraftRevisionPromptInput, language?: ShortFictionLanguage): string;
export declare function buildShortFictionPackageSystemPrompt(language?: ShortFictionLanguage): string;
export declare function buildShortFictionPackageUserPrompt(input: ShortFictionPackagePromptInput, language?: ShortFictionLanguage): string;
//# sourceMappingURL=short-fiction.d.ts.map