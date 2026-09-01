import type { ForecastBranch, ForecastModelBranch, NarrativeForecast } from "../../forecast/schema.js";
export declare function makeForecastBranch(overrides?: Partial<ForecastBranch>): ForecastBranch;
export declare function makeModelBranch(overrides?: Partial<ForecastBranch>): ForecastModelBranch;
/** Minimal canonical book on disk for forecast runner tests. */
export declare function writeForecastFixtureBook(bookDir: string): Promise<void>;
/**
 * Snapshot every canonical file under bookDir (excluding the forecast output
 * directory) so tests can assert that forecast operations never touch canon.
 */
export declare function snapshotCanonicalFiles(bookDir: string): Promise<ReadonlyMap<string, string>>;
export declare function makeForecast(overrides?: Partial<NarrativeForecast>): NarrativeForecast;
//# sourceMappingURL=forecast-fixture.d.ts.map