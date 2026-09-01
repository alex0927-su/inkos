import { type StoryGraph } from "./graph-schema.js";
import { type StoryGraphDelta } from "./delta.js";
export interface AuthoringState {
    readonly phase: "world" | "scale" | "structure" | "workshop";
    readonly rev: number;
    readonly phaseRevs?: Record<string, number>;
}
export declare function authoringStatePath(projectRoot: string, projectId: string): string;
export declare function loadAuthoringState(projectRoot: string, projectId: string): Promise<AuthoringState>;
/**
 * Applies a delta to the project's story graph and advances the authoring rev.
 *
 * The returned graph shares element references with the input; callers must
 * treat it as immutable — do not mutate nodes/arrays in place.
 *
 * Concurrent calls for the same project are serialized via a per-project async
 * mutex, preventing lost-update races (two callers both reading rev=N and both
 * writing rev=N+1).
 */
export declare function applyGraphDelta(params: {
    projectRoot: string;
    projectId: string;
    delta: StoryGraphDelta;
    phase?: AuthoringState["phase"];
}): Promise<{
    graph: StoryGraph;
    rev: number;
}>;
export declare function revertToSnapshot(params: {
    projectRoot: string;
    projectId: string;
    rev: number;
}): Promise<StoryGraph>;
export declare function recordPhaseVisit(projectRoot: string, projectId: string, phase: string): Promise<void>;
//# sourceMappingURL=authoring-store.d.ts.map