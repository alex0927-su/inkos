import type { StoredHook, StoredSummary } from "../state/memory-db.js";
import { type MemorySelection } from "./memory-retrieval.js";
export interface PlanningSeedMaterials {
    readonly storyDir: string;
    readonly authorIntent: string;
    readonly currentFocus: string;
    readonly storyBible: string;
    readonly volumeOutline: string;
    readonly bookRulesRaw: string;
    readonly currentState: string;
    readonly chapterSummariesRaw: string;
    readonly brief: string;
    readonly outlineNode?: string;
    readonly recentSummaries: ReadonlyArray<StoredSummary>;
    readonly previousEndingHook?: string;
    readonly previousEndingExcerpt?: string;
}
export interface PlanningMaterials extends PlanningSeedMaterials {
    readonly activeHooks: ReadonlyArray<StoredHook>;
    readonly memorySelection: MemorySelection;
    readonly plannerInputs: ReadonlyArray<string>;
}
export declare function loadPlanningSeedMaterials(params: {
    readonly bookDir: string;
    readonly chapterNumber: number;
}): Promise<PlanningSeedMaterials>;
export declare function gatherPlanningMaterials(params: {
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly goal: string;
    readonly outlineNode?: string;
    readonly mustKeep?: ReadonlyArray<string>;
    readonly seed?: PlanningSeedMaterials;
}): Promise<PlanningMaterials>;
//# sourceMappingURL=planning-materials.d.ts.map