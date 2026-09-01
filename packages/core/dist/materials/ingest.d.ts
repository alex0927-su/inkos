export type MaterialPurpose = "reference" | "worldbuilding" | "script" | "storyboard" | "research" | "general";
export type MaterialSourceKind = "url" | "file";
export type MaterialKind = "webpage" | "pdf" | "text";
export interface IngestMaterialInput {
    readonly sourceKind: MaterialSourceKind;
    readonly url?: string;
    readonly filePath?: string;
    readonly filename?: string;
    readonly mimeType?: string;
    readonly title?: string;
    readonly purpose?: MaterialPurpose;
}
export interface MaterialAsset {
    readonly id: string;
    readonly title: string;
    readonly kind: MaterialKind;
    readonly purpose: MaterialPurpose;
    readonly source: string;
    readonly mimeType: string;
    readonly markdownPath: string;
    readonly manifestPath: string;
    readonly charCount: number;
    readonly excerpt: string;
    readonly totalPages?: number;
}
export interface IngestMaterialDeps {
    readonly fetch?: typeof fetch;
    readonly now?: () => Date;
}
export declare function ingestMaterial(projectRoot: string, input: IngestMaterialInput, deps?: IngestMaterialDeps): Promise<MaterialAsset>;
//# sourceMappingURL=ingest.d.ts.map