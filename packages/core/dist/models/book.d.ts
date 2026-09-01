import { z } from "zod";
export declare const PlatformSchema: z.ZodEnum<["tomato", "feilu", "qidian", "other"]>;
export type Platform = z.infer<typeof PlatformSchema>;
export declare function normalizePlatformId(platform: unknown): Platform | undefined;
export declare function normalizePlatformOrOther(platform: unknown): Platform;
export declare const GenreSchema: z.ZodString;
export type Genre = z.infer<typeof GenreSchema>;
export declare const BookStatusSchema: z.ZodEnum<["incubating", "outlining", "active", "paused", "completed", "dropped"]>;
export type BookStatus = z.infer<typeof BookStatusSchema>;
export declare const FanficModeSchema: z.ZodEnum<["canon", "au", "ooc", "cp"]>;
export type FanficMode = z.infer<typeof FanficModeSchema>;
export declare const BookConfigSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    platform: z.ZodEnum<["tomato", "feilu", "qidian", "other"]>;
    genre: z.ZodString;
    status: z.ZodEnum<["incubating", "outlining", "active", "paused", "completed", "dropped"]>;
    targetChapters: z.ZodDefault<z.ZodNumber>;
    chapterWordCount: z.ZodDefault<z.ZodNumber>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    parentBookId: z.ZodOptional<z.ZodString>;
    fanficMode: z.ZodOptional<z.ZodEnum<["canon", "au", "ooc", "cp"]>>;
    writing: z.ZodOptional<z.ZodObject<{
        reviewMode: z.ZodOptional<z.ZodEnum<["auto", "manual"]>>;
        revisionGate: z.ZodOptional<z.ZodEnum<["strict", "lenient", "always"]>>;
    }, "strip", z.ZodTypeAny, {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
    }, {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "incubating" | "outlining" | "active" | "paused" | "completed" | "dropped";
    id: string;
    title: string;
    platform: "tomato" | "feilu" | "qidian" | "other";
    genre: string;
    targetChapters: number;
    chapterWordCount: number;
    createdAt: string;
    updatedAt: string;
    language?: "zh" | "en" | undefined;
    parentBookId?: string | undefined;
    fanficMode?: "canon" | "au" | "ooc" | "cp" | undefined;
    writing?: {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
    } | undefined;
}, {
    status: "incubating" | "outlining" | "active" | "paused" | "completed" | "dropped";
    id: string;
    title: string;
    platform: "tomato" | "feilu" | "qidian" | "other";
    genre: string;
    createdAt: string;
    updatedAt: string;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    parentBookId?: string | undefined;
    fanficMode?: "canon" | "au" | "ooc" | "cp" | undefined;
    writing?: {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
    } | undefined;
}>;
export type BookConfig = z.infer<typeof BookConfigSchema>;
export type ChapterReviewMode = "auto" | "manual";
/**
 * Resolve the effective chapter review mode for a book:
 * book-level `writing.reviewMode` (book.json) overrides the project-level
 * `writing.reviewMode` (inkos.json); both unset falls back to "auto".
 */
export declare function resolveChapterReviewMode(book: Pick<BookConfig, "writing">, projectWriting?: {
    readonly reviewMode?: ChapterReviewMode;
}): ChapterReviewMode;
export type RevisionGate = "strict" | "lenient" | "always";
/**
 * Resolve the effective manual-revision gate for a book:
 * book-level `writing.revisionGate` (book.json) overrides the project-level
 * `writing.revisionGate` (inkos.json); both unset falls back to "strict".
 *
 * - "strict": apply only when audit counts do not worsen AND at least one of
 *   blocking/AI-tell improves (historical default behavior).
 * - "lenient": apply whenever audit counts do not worsen (no improvement required).
 * - "always": always apply manual revisions; audit counts are recorded only.
 */
export declare function resolveRevisionGate(book: Pick<BookConfig, "writing">, projectWriting?: {
    readonly revisionGate?: RevisionGate;
}): RevisionGate;
//# sourceMappingURL=book.d.ts.map