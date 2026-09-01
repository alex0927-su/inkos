export type CliLanguage = "zh" | "en";
type WriteIssue = {
    readonly severity: string;
    readonly category: string;
    readonly description: string;
};
type WriteResultShape = {
    readonly chapterNumber: number;
    readonly title: string;
    readonly wordCount: number;
    readonly status: string;
    readonly revised: boolean;
    readonly issues: ReadonlyArray<WriteIssue>;
    readonly auditPassed?: boolean;
    readonly passedAudit?: boolean;
};
type ImportResultShape = {
    readonly importedCount: number;
    readonly totalWords: number;
    readonly nextChapter: number;
    readonly continueBookId: string;
};
export declare function resolveCliLanguage(language?: string, env?: NodeJS.ProcessEnv): CliLanguage;
export declare function formatBookCreateCreating(language: CliLanguage, title: string, genre: string, platform: string): string;
export declare function formatBookCreateCreated(language: CliLanguage, bookId: string): string;
export declare function formatBookCreateLocation(language: CliLanguage, bookId: string): string;
export declare function formatBookCreateFoundationReady(language: CliLanguage): string;
export declare function formatBookCreateNextStep(language: CliLanguage, bookId: string): string;
export declare function formatWriteNextProgress(language: CliLanguage, current: number, total: number, bookId: string): string;
export declare function formatWriteNextResultLines(language: CliLanguage, result: WriteResultShape): string[];
export declare function formatWriteNextComplete(language: CliLanguage): string;
export declare function formatAutoWriteStart(language: CliLanguage, bookId: string, startChapter: number, targetChapter: number): string;
export declare function formatAutoWriteAlreadyComplete(language: CliLanguage, bookId: string, writtenChapters: number, targetChapter: number): string;
export type NotifyCommandAction = "write-next" | "write-rewrite" | "revise" | "audit" | "auto";
export declare function formatNotifyCommandTitle(language: CliLanguage, action: NotifyCommandAction, bookName: string | undefined, succeeded: boolean): string;
export declare function formatNotifyBatchWriteBody(language: CliLanguage, chapters: ReadonlyArray<{
    readonly chapterNumber: number;
    readonly title: string;
    readonly wordCount: number;
    readonly auditPassed: boolean;
}>): string;
export declare function formatNotifyAuditBody(language: CliLanguage, result: {
    readonly chapterNumber: number;
    readonly passed: boolean;
    readonly issueCount: number;
    readonly summary: string;
}): string;
export declare function formatNotifyReviseBody(language: CliLanguage, result: {
    readonly chapterNumber: number;
    readonly applied: boolean;
    readonly wordCount: number;
    readonly fixedCount: number;
    readonly skippedReason?: string;
}): string;
export declare function formatNotifyFailureBody(language: CliLanguage, error: unknown): string;
export declare function formatImportChaptersDiscovery(language: CliLanguage, chapterCount: number, bookId: string): string;
export declare function formatImportChaptersResume(language: CliLanguage, resumeFrom: number): string;
export declare function formatImportChaptersComplete(language: CliLanguage, result: ImportResultShape): string[];
export declare function formatImportCanonStart(language: CliLanguage, parentBookId: string, targetBookId: string): string;
export declare function formatImportCanonComplete(language: CliLanguage): string[];
export declare function formatListModelsEmpty(language: CliLanguage, service: string): string;
export declare function formatListModelsHeader(language: CliLanguage, service: string, count: number): string;
export declare function formatDoctorHintQuota(language: CliLanguage): string;
export declare function formatDoctorHintOpenAiProbeExhausted(language: CliLanguage): string;
export declare function formatDoctorHintBaseUrl(language: CliLanguage): string;
export declare function formatDoctorHintStreamRequirement(language: CliLanguage): string;
export declare function formatDoctorHintModelName(language: CliLanguage): string;
export declare function formatDoctorHintInvalidApiKey(language: CliLanguage): string;
export declare function formatFanficInvalidModeError(mode: string): string;
export declare function formatFanficSourceTooShortError(length: number): string;
export declare function formatFanficCanonMissingError(): string;
export declare function formatFanficSourceDirEmptyError(sourcePath: string): string;
export declare function formatChapterSyncNoChanges(language: CliLanguage, checked: number): string;
export declare function formatChapterSyncChange(language: CliLanguage, change: {
    number: number;
    title: string;
    previousWordCount: number;
    wordCount: number;
}, countingMode: "zh_chars" | "en_words"): string;
export declare function formatChapterSyncSummary(language: CliLanguage, changed: number, checked: number): string;
export declare function formatChapterSyncMissingFiles(language: CliLanguage, numbers: ReadonlyArray<number>): string;
export declare function formatChapterDeleteConfirm(language: CliLanguage, params: {
    bookTitle: string;
    bookId: string;
    number: number;
    title: string;
}): string;
export declare function formatChapterDeleteCancelled(language: CliLanguage): string;
export declare function formatChapterDeleteDone(language: CliLanguage, params: {
    number: number;
    title: string;
    trashedFiles: ReadonlyArray<string>;
    rolledBackTo: number;
}): string;
export declare function formatBookBackupCreated(language: CliLanguage, bookId: string, backupId: string): string;
export declare function formatBookBackupListEmpty(language: CliLanguage, bookId: string): string;
export declare function formatBookRestoreDone(language: CliLanguage, params: {
    bookId: string;
    backupId: string;
    preRestoreBackupId: string | null;
}): string;
export {};
//# sourceMappingURL=localization.d.ts.map