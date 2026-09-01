import type { ForecastBranch, NarrativeForecast } from "./schema.js";
export declare function renderForecastComparisonMarkdown(forecast: NarrativeForecast): string;
export declare function renderSelectedBranchPlanMarkdown(input: {
    readonly forecast: NarrativeForecast;
    readonly branch: ForecastBranch;
    readonly selectedAt: string;
    readonly stale: boolean;
}): string;
//# sourceMappingURL=render.d.ts.map