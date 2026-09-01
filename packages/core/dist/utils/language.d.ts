export type WritingLanguage = "zh" | "en";
/**
 * Infer the writing language from a free-text brief/premise when the user did not set one explicitly.
 *
 * Conservative by design: defaults to "zh" (preserving prior behaviour for Chinese users) and only
 * returns "en" when the text is clearly Latin-dominant. A Chinese brief that mentions an English name
 * or term still resolves to "zh"; incidental CJK inside an otherwise English brief resolves to "en".
 */
export declare function inferLanguage(text?: string | null): WritingLanguage;
//# sourceMappingURL=language.d.ts.map