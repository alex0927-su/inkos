export declare const GLOBAL_CONFIG_DIR: string;
export declare const GLOBAL_ENV_PATH: string;
export type LLMEnvMap = Record<string, string | undefined>;
export interface LLMEnvLayers {
    readonly global: LLMEnvMap;
    readonly project: LLMEnvMap;
    readonly process: LLMEnvMap;
}
export declare function loadLLMEnvLayers(root: string, processEnv?: NodeJS.ProcessEnv): Promise<LLMEnvLayers>;
export declare function mergeEnvMaps(...layers: readonly LLMEnvMap[]): LLMEnvMap;
export declare function studioIgnoredEnv(layers: LLMEnvLayers): LLMEnvMap;
export declare function cliOverlayEnv(layers: LLMEnvLayers): LLMEnvMap;
export declare function legacyEnv(layers: LLMEnvLayers): LLMEnvMap;
//# sourceMappingURL=llm-env.d.ts.map