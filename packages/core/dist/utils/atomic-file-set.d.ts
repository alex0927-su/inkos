export interface AtomicFileWrite {
    readonly relativePath: string;
    readonly content: string | Uint8Array;
}
export interface AtomicFileSet {
    readonly rootDir: string;
    readonly writes: ReadonlyArray<AtomicFileWrite>;
    readonly deletes?: ReadonlyArray<string>;
    readonly renameFile?: (from: string, to: string) => Promise<void>;
}
export declare function commitAtomicFileSet(input: AtomicFileSet): Promise<void>;
//# sourceMappingURL=atomic-file-set.d.ts.map