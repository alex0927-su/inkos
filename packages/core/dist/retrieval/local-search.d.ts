export interface SearchDocument {
    readonly id: string;
    readonly scope: string;
    readonly kind: string;
    readonly source: string;
    readonly title: string;
    readonly body: string;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface SearchHit extends SearchDocument {
    readonly score: number;
}
export interface MarkdownSearchSegment {
    readonly heading: string;
    readonly body: string;
    readonly charStart: number;
    readonly charEnd: number;
}
/**
 * The single lexical retrieval kernel used by story memory, archived materials,
 * and Skill references. Source files remain authoritative; this database is a
 * rebuildable FTS5 projection.
 */
export declare class LocalSearchIndex {
    private readonly db;
    constructor(path: string);
    replaceScope(scope: string, documents: ReadonlyArray<SearchDocument>): void;
    search(query: string, options: {
        readonly scope: string;
        readonly kinds?: ReadonlyArray<string>;
        readonly limit?: number;
    }): SearchHit[];
    close(): void;
    private migrate;
}
export declare function splitMarkdownForSearch(markdown: string): MarkdownSearchSegment[];
export declare function tokenizeSearchText(text: string): string[];
//# sourceMappingURL=local-search.d.ts.map