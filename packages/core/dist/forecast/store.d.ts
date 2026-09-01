import { type NarrativeForecast } from "./schema.js";
export interface ForecastStoreOptions {
    readonly now?: () => Date;
    readonly idFactory?: () => string;
}
export declare function assertSafeForecastId(value: string): string;
export declare class ForecastStore {
    private readonly bookDir;
    private readonly options;
    constructor(bookDir: string, options?: ForecastStoreOptions);
    get forecastsDir(): string;
    forecastDir(forecastId: string): string;
    forecastJsonPath(forecastId: string): string;
    comparisonPath(forecastId: string): string;
    selectedPlanPath(forecastId: string): string;
    now(): Date;
    /**
     * Derive the next forecast id: injected factory first, otherwise a
     * timestamp from the injected clock; suffix -2/-3/... if the directory
     * already exists so re-runs never overwrite an earlier forecast.
     */
    allocateForecastId(): Promise<string>;
    save(forecast: NarrativeForecast, comparisonMarkdown: string): Promise<{
        readonly forecastJsonPath: string;
        readonly comparisonPath: string;
    }>;
    load(forecastId: string): Promise<NarrativeForecast>;
    list(): Promise<ReadonlyArray<string>>;
    markStale(forecast: NarrativeForecast): Promise<NarrativeForecast>;
    writeSelectedPlan(forecastId: string, markdown: string): Promise<string>;
}
//# sourceMappingURL=store.d.ts.map