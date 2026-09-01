import { type RuntimeStateDelta } from "../models/runtime-state.js";
import type { Fact, StoredHook, StoredSummary } from "./memory-db.js";
import { type RuntimeStateSnapshot } from "./state-reducer.js";
export interface RuntimeStateArtifacts {
    readonly snapshot: RuntimeStateSnapshot;
    readonly resolvedDelta: RuntimeStateDelta;
    readonly currentStateMarkdown: string;
    readonly hooksMarkdown: string;
    readonly chapterSummariesMarkdown: string;
}
export interface NarrativeMemorySeed {
    readonly summaries: ReadonlyArray<StoredSummary>;
    readonly hooks: ReadonlyArray<StoredHook>;
}
export declare function loadRuntimeStateSnapshot(bookDir: string): Promise<RuntimeStateSnapshot>;
export declare function loadRuntimeStateSnapshotAtChapter(params: {
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly language: "zh" | "en";
}): Promise<RuntimeStateSnapshot>;
export declare function buildRuntimeStateArtifacts(params: {
    readonly bookDir: string;
    readonly delta: RuntimeStateDelta;
    readonly language: "zh" | "en";
    readonly allowReapply?: boolean;
    readonly allowNewHooks?: boolean;
}): Promise<RuntimeStateArtifacts>;
export declare function buildRuntimeStateArtifactsFromSnapshot(params: {
    readonly snapshot: RuntimeStateSnapshot;
    readonly delta: RuntimeStateDelta;
    readonly language: "zh" | "en";
    readonly allowReapply?: boolean;
    readonly allowNewHooks?: boolean;
}): RuntimeStateArtifacts;
export declare function saveRuntimeStateSnapshot(bookDir: string, snapshot: RuntimeStateSnapshot): Promise<void>;
export declare function loadNarrativeMemorySeed(bookDir: string): Promise<NarrativeMemorySeed>;
export declare function loadSnapshotCurrentStateFacts(bookDir: string, chapterNumber: number): Promise<ReadonlyArray<Fact>>;
//# sourceMappingURL=runtime-state-store.d.ts.map