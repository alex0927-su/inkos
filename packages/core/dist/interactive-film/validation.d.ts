import type { StoryGraph } from "./graph-schema.js";
export interface ValidationIssue {
    readonly code: "DEAD_END" | "BROKEN_LINK" | "UNREACHABLE" | "NO_PATH_TO_ENDING" | "VARIABLE_UNWRITTEN" | "VARIABLE_UNUSED" | "ENDING_VARIETY" | "IMAGE_MISSING" | "GATED_UNREACHABLE" | "ENDING_UNREACHABLE" | "ILLUSORY_BRANCH" | "LINEAR_GRAPH" | "ISOLATED_NODE" | "LONG_LINEAR_CHAIN";
    readonly level: "error" | "warning" | "info";
    readonly message: string;
    readonly nodeIds: readonly string[];
}
export interface ValidationReport {
    readonly ok: boolean;
    readonly issues: readonly ValidationIssue[];
}
export declare function validateStoryGraph(graph: StoryGraph): ValidationReport;
export declare function reviewStoryGraph(graph: StoryGraph): ValidationReport;
//# sourceMappingURL=validation.d.ts.map