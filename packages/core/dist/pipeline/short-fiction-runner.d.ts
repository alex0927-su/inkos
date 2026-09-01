import { Buffer } from "node:buffer";
import type { AgentContext } from "../agents/base.js";
import { type ShortFictionLanguage, type ShortFictionReference } from "../agents/short-fiction.js";
import { type CoverProviderPreset } from "../llm/cover-providers.js";
export interface ShortFictionRunRuntimes {
    readonly planner: AgentContext;
    readonly outlineReview: AgentContext;
    readonly writer: AgentContext;
    readonly draftReview: AgentContext;
    readonly revise: AgentContext;
    readonly package: AgentContext;
}
export interface ShortFictionRunOptions {
    readonly projectRoot: string;
    readonly title?: string;
    readonly direction: string;
    readonly runtimes: ShortFictionRunRuntimes;
    readonly reference?: ShortFictionReference;
    readonly storyId?: string;
    readonly outDir?: string;
    readonly chapterCount?: number;
    readonly charsPerChapter?: number;
    readonly language?: ShortFictionLanguage;
    readonly cover?: boolean;
    readonly coverBaseUrl?: string;
    readonly coverEndpoint?: string;
    readonly coverModel?: string;
    readonly coverSize?: string;
    readonly coverApiKeyEnv?: string;
    readonly signal?: AbortSignal;
    readonly onProgress?: (message: string) => void;
}
export interface ShortFictionRunResult {
    readonly storyId: string;
    readonly outlinePath: string;
    readonly outlineReviewPath: string;
    readonly draftReviewPath: string;
    readonly finalMarkdownPath: string;
    readonly finalJsonPath: string;
    readonly salesPackagePath: string;
    readonly coverPromptPath: string;
    readonly coverImagePath?: string;
    readonly coverError?: string;
}
export interface ShortFictionCoverOptions {
    readonly projectRoot: string;
    readonly title: string;
    readonly intro?: string;
    readonly sellingPoints?: string | ReadonlyArray<string>;
    readonly coverPrompt?: string;
    readonly promptMode?: CoverPromptMode;
    readonly language?: ShortFictionLanguage;
    readonly outputDir?: string;
    readonly coverBaseUrl?: string;
    readonly coverEndpoint?: string;
    readonly coverModel?: string;
    readonly coverSize?: string;
    readonly coverApiKeyEnv?: string;
    readonly signal?: AbortSignal;
}
export interface ShortFictionCoverResult {
    readonly title: string;
    readonly outputDir: string;
    readonly coverPromptPath: string;
    readonly coverImagePath: string;
}
type CoverPromptMode = "short" | "generic";
export declare function runShortFictionProduction(options: ShortFictionRunOptions): Promise<ShortFictionRunResult>;
export declare function generateShortFictionCover(options: ShortFictionCoverOptions): Promise<ShortFictionCoverResult>;
/**
 * Generate one image from a free-text prompt via whichever image API the cover
 * config resolves to (gemini / images / responses). Shared by cover generation
 * and the interactive-world (Play) illustration feature so both go through the
 * same provider plumbing.
 */
export declare function generateImageFromPrompt(request: ShortFictionCoverRequest, prompt: string, size: string, signal?: AbortSignal): Promise<{
    readonly buffer: Buffer;
    readonly extension: "png" | "jpg";
}>;
export interface ShortFictionCoverRequest {
    readonly api: CoverProviderPreset["api"];
    readonly baseUrl: string;
    readonly endpoint?: string;
    readonly model: string;
    readonly apiKey: string;
}
export declare function resolveCoverGenerationRequest(input: {
    readonly root: string;
    readonly coverBaseUrl?: string;
    readonly coverEndpoint?: string;
    readonly coverModel?: string;
    readonly coverApiKeyEnv?: string;
}): Promise<ShortFictionCoverRequest>;
export declare function extractImagesGenerationImage(payload: unknown): ({
    readonly base64: string;
    readonly extension: "png" | "jpg";
    readonly url?: undefined;
} | {
    readonly url: string;
    readonly base64?: undefined;
    readonly extension?: undefined;
}) | undefined;
export declare function extractResponsesImageBase64(payload: unknown): string | undefined;
export declare function extractGeminiImageBase64(payload: unknown): {
    readonly base64: string;
    readonly extension: "png" | "jpg";
} | undefined;
export declare function resolveCoverApiKey(apiKeyEnv: string): string;
export {};
//# sourceMappingURL=short-fiction-runner.d.ts.map