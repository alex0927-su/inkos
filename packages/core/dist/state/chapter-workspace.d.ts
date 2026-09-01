export type ChapterVersionSource = "manual" | "agent" | "revision" | "regeneration" | "restore";
export interface ChapterVersion {
    readonly id: string;
    readonly chapterNumber: number;
    readonly source: ChapterVersionSource;
    readonly createdAt: string;
    readonly characterCount: number;
}
export declare function readChapterUserBrief(bookDir: string, chapterNumber: number): Promise<string>;
export declare function saveChapterUserBrief(bookDir: string, chapterNumber: number, brief: string): Promise<void>;
export declare function readChapterPlanDocument(bookDir: string, chapterNumber: number): Promise<string | null>;
export declare function archiveChapterVersion(bookDir: string, chapterNumber: number, content: string, source: ChapterVersionSource, now?: Date): Promise<ChapterVersion>;
export declare function listChapterVersions(bookDir: string, chapterNumber: number): Promise<ReadonlyArray<ChapterVersion>>;
export declare function readChapterVersion(bookDir: string, chapterNumber: number, versionId: string): Promise<string>;
//# sourceMappingURL=chapter-workspace.d.ts.map