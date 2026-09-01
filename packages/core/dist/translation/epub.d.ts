export interface ExtractedEpubChapter {
    readonly title: string;
    readonly content: string;
}
export interface ExtractedEpub {
    readonly title?: string;
    readonly chapters: ReadonlyArray<ExtractedEpubChapter>;
}
export declare function extractEpub(buffer: Buffer): Promise<ExtractedEpub>;
//# sourceMappingURL=epub.d.ts.map