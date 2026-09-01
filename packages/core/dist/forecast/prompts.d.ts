export type ForecastLanguage = "zh" | "en";
export interface ForecastPromptInput {
    readonly contextMarkdown: string;
    readonly divergence: string;
    readonly branchCount: number;
    readonly horizon: number;
    readonly baseChapter: number;
}
export declare function buildForecastSystemPrompt(language: ForecastLanguage): string;
export declare function buildForecastUserPrompt(input: ForecastPromptInput, language: ForecastLanguage): string;
export declare function buildForecastRepairPrompt(validationError: string, language: ForecastLanguage): string;
//# sourceMappingURL=prompts.d.ts.map