import type { MaterialAsset, MaterialPurpose } from "./ingest.js";
export interface RetrieveMaterialsInput {
    readonly query: string;
    readonly purpose?: MaterialPurpose;
    readonly limit?: number;
}
export interface RetrievedMaterial {
    readonly id: string;
    readonly title: string;
    readonly kind: MaterialAsset["kind"];
    readonly purpose: MaterialPurpose;
    readonly source: string;
    readonly markdownPath: string;
    readonly score: number;
    readonly excerpt: string;
    readonly charStart: number;
    readonly charEnd: number;
}
export declare function retrieveMaterials(projectRoot: string, input: RetrieveMaterialsInput): Promise<RetrievedMaterial[]>;
//# sourceMappingURL=retrieve.d.ts.map