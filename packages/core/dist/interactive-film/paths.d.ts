import type { StoryGraph } from "./graph-schema.js";
export interface RuntimePath {
    readonly nodeIds: readonly string[];
    readonly endingId: string | null;
    readonly length: number;
}
export declare function enumerateRuntimePaths(graph: StoryGraph, opts?: {
    maxPaths?: number;
    maxDepth?: number;
}): {
    paths: RuntimePath[];
    truncated: boolean;
};
//# sourceMappingURL=paths.d.ts.map