import type { AgentContext } from "../agents/base.js";
import { type ForecastBranch, type NarrativeForecast } from "./schema.js";
import { type ForecastStoreOptions } from "./store.js";
export interface CreateNarrativeForecastOptions {
    readonly projectRoot: string;
    readonly bookId: string;
    readonly divergence: string;
    readonly branchCount?: number;
    readonly horizon?: number;
    readonly runtime: AgentContext;
    readonly determinism?: ForecastStoreOptions;
    readonly onProgress?: (message: string) => void;
}
export interface NarrativeForecastCreateResult {
    readonly forecast: NarrativeForecast;
    readonly forecastJsonPath: string;
    readonly comparisonPath: string;
}
export declare function createNarrativeForecast(options: CreateNarrativeForecastOptions): Promise<NarrativeForecastCreateResult>;
export interface GetNarrativeForecastOptions {
    readonly projectRoot: string;
    readonly bookId: string;
    readonly forecastId: string;
}
export interface NarrativeForecastGetResult {
    readonly forecast: NarrativeForecast;
    readonly stale: boolean;
    readonly forecastJsonPath: string;
    readonly comparisonPath: string;
}
export declare function getNarrativeForecast(options: GetNarrativeForecastOptions): Promise<NarrativeForecastGetResult>;
export interface SelectNarrativeBranchOptions {
    readonly projectRoot: string;
    readonly bookId: string;
    readonly forecastId: string;
    readonly branchId: string;
    readonly determinism?: ForecastStoreOptions;
}
export interface NarrativeForecastSelectResult {
    readonly forecast: NarrativeForecast;
    readonly branch: ForecastBranch;
    readonly stale: boolean;
    readonly planPath: string;
}
/**
 * Select one branch: writes ONLY selected-branch-plan.md. Applying the plan
 * to the outline / chapter intents / canonical state is a separate,
 * user-confirmed operation outside v1.
 */
export declare function selectNarrativeBranch(options: SelectNarrativeBranchOptions): Promise<NarrativeForecastSelectResult>;
//# sourceMappingURL=runner.d.ts.map