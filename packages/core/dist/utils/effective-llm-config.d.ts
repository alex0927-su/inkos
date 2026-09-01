import { type LLMConfig, type ProjectConfig } from "../models/project.js";
import { type LLMEnvLayers } from "./llm-env.js";
export type LLMConsumer = "studio" | "cli" | "daemon" | "deploy";
export type LLMConfigMode = "studio-project" | "cli-project" | "legacy-env";
export type LLMValueSource = "project" | "studio-secret" | "env" | "cli" | "default";
export interface LLMConfigCliOverrides {
    readonly service?: string;
    readonly model?: string;
    readonly apiKeyEnv?: string;
    readonly baseUrl?: string;
    readonly apiFormat?: "chat" | "responses";
    readonly stream?: boolean;
}
export interface ResolveEffectiveLLMConfigInput {
    readonly consumer: LLMConsumer;
    readonly projectRoot: string;
    readonly envLayers: LLMEnvLayers;
    readonly cli?: LLMConfigCliOverrides;
    readonly requireApiKey?: boolean;
}
export interface EffectiveLLMDiagnostics {
    readonly configMode: LLMConfigMode;
    readonly serviceSource: LLMValueSource;
    readonly modelSource: LLMValueSource;
    readonly apiKeySource: LLMValueSource;
    readonly warnings: readonly string[];
}
export interface EffectiveLLMConfigResult {
    readonly config: ProjectConfig;
    readonly llm: LLMConfig;
    readonly diagnostics: EffectiveLLMDiagnostics;
}
export declare function resolveEffectiveLLMConfig(input: ResolveEffectiveLLMConfigInput): Promise<EffectiveLLMConfigResult>;
//# sourceMappingURL=effective-llm-config.d.ts.map