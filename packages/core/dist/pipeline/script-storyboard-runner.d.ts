import type { AgentContext } from "../agents/base.js";
import { type ScriptTargetFormat } from "../agents/script-storyboard.js";
export interface ScriptCreationRunOptions {
    readonly projectRoot: string;
    readonly runtime: AgentContext;
    readonly title: string;
    readonly instruction: string;
    readonly sourceKind?: string;
    readonly targetFormat?: ScriptTargetFormat;
    readonly sourceText?: string;
    readonly sourcePath?: string;
    readonly requirements?: string;
    readonly episodeCount?: number;
    readonly episodeDuration?: string;
    readonly language?: "zh" | "en";
    readonly projectId?: string;
    readonly outDir?: string;
    readonly onProgress?: (message: string) => void;
}
export interface StoryboardCreationRunOptions {
    readonly projectRoot: string;
    readonly runtime: AgentContext;
    readonly title: string;
    readonly instruction: string;
    readonly sourceKind?: string;
    readonly sourceText?: string;
    readonly sourcePath?: string;
    readonly requirements?: string;
    readonly visualStyle?: string;
    readonly aspectRatio?: string;
    readonly granularity?: string;
    readonly maxShots?: number;
    readonly language?: "zh" | "en";
    readonly projectId?: string;
    readonly outDir?: string;
    readonly onProgress?: (message: string) => void;
}
export interface InteractiveFilmCreationRunOptions {
    readonly projectRoot: string;
    readonly runtime: AgentContext;
    readonly title: string;
    readonly instruction: string;
    readonly sourceKind?: string;
    readonly sourceText?: string;
    readonly sourcePath?: string;
    readonly requirements?: string;
    readonly targetAudience?: string;
    readonly episodeCount?: number;
    readonly episodeDuration?: string;
    readonly budget?: string;
    readonly referenceMode?: string;
    readonly language?: "zh" | "en";
    readonly projectId?: string;
    readonly outDir?: string;
    readonly onProgress?: (message: string) => void;
}
export interface ScriptCreationRunResult {
    readonly projectId: string;
    readonly baseDir: string;
    readonly specPath: string;
    readonly scriptPath: string;
}
export interface InteractiveFilmCreationRunResult {
    readonly projectId: string;
    readonly baseDir: string;
    readonly storyGraphPath: string;
    readonly specPath: string;
    readonly storyTreePath: string;
    readonly flagsPath: string;
    readonly scriptPath: string;
    readonly storyboardPath: string;
    readonly imagePromptsPath: string;
    readonly assetsManifestPath: string;
    readonly assetsDir: string;
}
export interface StoryboardCreationRunResult {
    readonly projectId: string;
    readonly baseDir: string;
    readonly specPath: string;
    readonly storyboardPath: string;
    readonly imagePromptsPath: string;
    readonly assetsManifestPath: string;
    readonly assetsDir: string;
}
export interface StoryboardImageAssetVariant {
    readonly id: string;
    readonly path: string;
    readonly status: "pending" | "generated" | "selected" | "failed";
    readonly model?: string;
    readonly provider?: string;
    readonly createdAt?: string;
    readonly error?: string;
}
export interface StoryboardImageAsset {
    readonly shotId: string;
    readonly prompt: string;
    readonly sourceRefs: readonly string[];
    readonly variants: readonly StoryboardImageAssetVariant[];
    readonly selectedPath?: string;
    readonly status: "prompt_ready" | "generated" | "selected" | "failed";
}
export interface StoryboardAssetsManifest {
    readonly version: 1;
    readonly kind: "storyboard_assets";
    readonly title: string;
    readonly projectId: string;
    readonly baseDir: string;
    readonly storyboardPath: string;
    readonly imagePromptsPath: string;
    readonly assetsDir: string;
    readonly sourceDir: string;
    readonly generatedDir: string;
    readonly selectedDir: string;
    readonly createdAt: string;
    readonly assets: readonly StoryboardImageAsset[];
}
export declare function runScriptCreation(options: ScriptCreationRunOptions): Promise<ScriptCreationRunResult>;
export declare function runInteractiveFilmCreation(options: InteractiveFilmCreationRunOptions): Promise<InteractiveFilmCreationRunResult>;
export declare function runStoryboardCreation(options: StoryboardCreationRunOptions): Promise<StoryboardCreationRunResult>;
export declare function createStoryboardAssetsManifest(args: {
    readonly title: string;
    readonly projectId: string;
    readonly baseDir: string;
    readonly storyboardPath: string;
    readonly imagePromptsPath: string;
    readonly imagePrompts: string;
    readonly createdAt: string;
}): StoryboardAssetsManifest;
export declare function projectFileExists(projectRoot: string, relativePath: string): Promise<boolean>;
//# sourceMappingURL=script-storyboard-runner.d.ts.map