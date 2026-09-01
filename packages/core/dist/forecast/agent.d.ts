import { BaseAgent } from "../agents/base.js";
import { type ForecastModelOutput } from "./schema.js";
import { type ForecastLanguage } from "./prompts.js";
export interface ForecastGenerationInput {
    readonly contextMarkdown: string;
    readonly divergence: string;
    readonly branchCount: number;
    readonly horizon: number;
    readonly baseChapter: number;
    readonly language: ForecastLanguage;
}
/**
 * Single-call forecast generator with one validation-driven retry: if the
 * first response fails JSON/schema/branch-count validation, the error is fed
 * back to the model once. A second failure surfaces as a hard error — the
 * runner then writes nothing to disk.
 */
export declare class NarrativeForecastAgent extends BaseAgent {
    get name(): string;
    generateBranches(input: ForecastGenerationInput): Promise<ForecastModelOutput>;
}
//# sourceMappingURL=agent.d.ts.map