import { type SearchResult } from "../utils/web-search.js";
export type ResearchPurpose = "worldbuilding" | "era" | "profession" | "market" | "fact-check" | "general";
export type ResearchDepth = "quick" | "standard" | "deep";
export interface ResearchInput {
    readonly topic: string;
    readonly purpose: ResearchPurpose;
    readonly depth: ResearchDepth;
}
export interface ResearchSource {
    readonly id: string;
    readonly title: string;
    readonly url: string;
    readonly snippet: string;
    readonly excerpt?: string;
}
export interface ResearchClaim {
    readonly text: string;
    readonly sourceIds: readonly string[];
    readonly confidence: "low" | "medium" | "high";
}
export interface ResearchReport {
    readonly summary: string;
    readonly claims: readonly ResearchClaim[];
    readonly conflicts: readonly string[];
    readonly unknowns: readonly string[];
    readonly creativeImplications: readonly string[];
    readonly sources: readonly ResearchSource[];
    readonly confidence: "low" | "medium" | "high";
    readonly queryLog: readonly string[];
    readonly partialFailures: readonly string[];
    readonly markdown: string;
}
export interface ResearchDeps {
    readonly search?: (query: string, maxResults: number) => Promise<ReadonlyArray<SearchResult>>;
    readonly fetch?: (url: string, maxChars: number) => Promise<string>;
}
export declare function runResearchReport(input: ResearchInput, deps?: ResearchDeps): Promise<ResearchReport>;
//# sourceMappingURL=researcher.d.ts.map