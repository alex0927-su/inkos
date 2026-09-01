import type { MaterialAsset } from "../materials/ingest.js";
export interface BookReferenceBinding {
    readonly materialId: string;
    readonly uses: ReadonlyArray<string>;
    readonly note?: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export interface BookReferenceManifest {
    readonly version: 1;
    readonly bookId: string;
    readonly bindings: ReadonlyArray<BookReferenceBinding>;
}
export interface BindBookReferenceInput {
    readonly materialId: string;
    readonly uses: ReadonlyArray<string>;
    readonly note?: string;
}
export interface BookReferenceDeps {
    readonly now?: () => Date;
}
export interface ResolvedBookReference extends BookReferenceBinding {
    readonly available: boolean;
    readonly title?: string;
    readonly asset?: MaterialAsset;
    readonly error?: string;
}
export interface BookReferenceList {
    readonly manifest: BookReferenceManifest;
    readonly references: ReadonlyArray<ResolvedBookReference>;
}
export declare function bindBookReference(projectRoot: string, bookId: string, input: BindBookReferenceInput, deps?: BookReferenceDeps): Promise<BookReferenceManifest>;
export declare function unbindBookReference(projectRoot: string, bookId: string, materialIdInput: string): Promise<{
    readonly removed: boolean;
    readonly manifest: BookReferenceManifest;
}>;
export declare function listBookReferences(projectRoot: string, bookId: string): Promise<BookReferenceList>;
export declare function loadBookReferenceManifest(projectRoot: string, bookId: string): Promise<BookReferenceManifest>;
export declare function loadMaterialAsset(projectRoot: string, materialIdInput: string): Promise<MaterialAsset>;
//# sourceMappingURL=book-references.d.ts.map