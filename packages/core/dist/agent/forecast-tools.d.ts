import type { AgentTool } from "@mariozechner/pi-agent-core";
import type { PipelineRunner } from "../pipeline/runner.js";
declare const ForecastCreateParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    divergence: import("@sinclair/typebox").TString;
    branchCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    horizon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare function createNarrativeForecastCreateTool(pipeline: PipelineRunner, activeBookId: string | null, projectRoot: string): AgentTool<typeof ForecastCreateParams>;
declare const ForecastGetParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    forecastId: import("@sinclair/typebox").TString;
}>;
export declare function createNarrativeForecastGetTool(activeBookId: string | null, projectRoot: string): AgentTool<typeof ForecastGetParams>;
declare const ForecastSelectParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    forecastId: import("@sinclair/typebox").TString;
    branchId: import("@sinclair/typebox").TString;
}>;
export declare function createNarrativeForecastSelectTool(activeBookId: string | null, projectRoot: string): AgentTool<typeof ForecastSelectParams>;
export {};
//# sourceMappingURL=forecast-tools.d.ts.map