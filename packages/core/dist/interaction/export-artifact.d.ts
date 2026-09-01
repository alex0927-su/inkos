export interface ExportStateLike {
    readonly bookDir: (bookId: string) => string;
    readonly loadBookConfig: (bookId: string) => Promise<{
        readonly title: string;
        readonly language?: string;
    }>;
    readonly loadChapterIndex: (bookId: string) => Promise<ReadonlyArray<{
        readonly number: number;
        readonly status: string;
        readonly wordCount: number;
    }>>;
}
export interface ExportArtifact {
    readonly outputPath: string;
    readonly fileName: string;
    readonly chaptersExported: number;
    readonly totalWords: number;
    readonly format: "txt" | "md" | "epub";
    readonly contentType: string;
    readonly payload: string | Buffer;
}
export declare function buildExportArtifact(state: ExportStateLike, bookId: string, options: {
    readonly format?: "txt" | "md" | "epub";
    readonly approvedOnly?: boolean;
    readonly outputPath?: string;
}): Promise<ExportArtifact>;
export declare function writeExportArtifact(state: ExportStateLike, bookId: string, options: {
    readonly format?: "txt" | "md" | "epub";
    readonly approvedOnly?: boolean;
    readonly outputPath?: string;
}): Promise<Omit<ExportArtifact, "payload" | "contentType" | "fileName">>;
//# sourceMappingURL=export-artifact.d.ts.map