import { BaseAgent } from "./base.js";
export type ScriptTargetFormat = "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script";
export interface ScriptCreationInput {
    readonly title: string;
    readonly sourceKind?: string;
    readonly targetFormat?: ScriptTargetFormat;
    readonly sourceText?: string;
    readonly requirements?: string;
    readonly episodeCount?: number;
    readonly episodeDuration?: string;
    readonly language?: "zh" | "en";
}
export interface StoryboardCreationInput {
    readonly title: string;
    readonly sourceKind?: string;
    readonly sourceText?: string;
    readonly requirements?: string;
    readonly visualStyle?: string;
    readonly aspectRatio?: string;
    readonly granularity?: string;
    readonly maxShots?: number;
    readonly language?: "zh" | "en";
    readonly segment?: {
        readonly label: string;
        readonly index: number;
        readonly count: number;
        readonly estimatedShots: number;
    };
}
export interface InteractiveFilmCreationInput {
    readonly title: string;
    readonly sourceKind?: string;
    readonly sourceText?: string;
    readonly requirements?: string;
    readonly targetAudience?: string;
    readonly episodeCount?: number;
    readonly episodeDuration?: string;
    readonly budget?: string;
    readonly referenceMode?: string;
    readonly language?: "zh" | "en";
}
declare abstract class LongFormProductionAgent extends BaseAgent {
    protected recoverProductionMarkdown(fragments: string, language: "zh" | "en", requiredHeadings: readonly string[]): Promise<string>;
}
export declare class ScriptCreationAgent extends LongFormProductionAgent {
    get name(): string;
    writeScript(input: ScriptCreationInput): Promise<string>;
}
export declare class StoryboardCreationAgent extends LongFormProductionAgent {
    get name(): string;
    writeStoryboard(input: StoryboardCreationInput): Promise<string>;
}
export declare class InteractiveFilmCreationAgent extends LongFormProductionAgent {
    get name(): string;
    writeInteractiveFilm(input: InteractiveFilmCreationInput): Promise<string>;
}
export declare function renderScriptSpec(input: ScriptCreationInput): string;
export declare function renderStoryboardSpec(input: StoryboardCreationInput): string;
export declare function renderInteractiveFilmSpec(input: InteractiveFilmCreationInput): string;
export declare function extractStoryboardImagePrompts(raw: string): string;
export declare function extractMarkdownSection(raw: string, headings: readonly string[]): string | undefined;
export declare function countMarkdownSections(raw: string, headings: readonly string[]): number;
export declare function extractProductionDocument(raw: string, title: string): string;
export declare function normalizeScriptEpisodeEndLabels(script: string): string;
export {};
//# sourceMappingURL=script-storyboard.d.ts.map