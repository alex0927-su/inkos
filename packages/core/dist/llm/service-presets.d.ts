export interface ServicePreset {
    readonly providerFamily: "openai" | "anthropic";
    readonly api: string;
    readonly baseUrl: string;
    readonly label: string;
    readonly temperatureRange?: readonly [number, number];
    readonly defaultTemperature?: number;
    readonly writingTemperature?: number;
    readonly temperatureHint?: string;
    readonly knownModels?: readonly string[];
    readonly piProvider?: string;
    readonly modelsBaseUrl?: string;
}
export declare const SERVICE_PRESETS: Record<string, ServicePreset>;
export declare function resolveServicePreset(service: string): ServicePreset | undefined;
export declare function resolveServiceProviderFamily(service: string): "openai" | "anthropic" | undefined;
export declare function resolveServicePiProvider(service: string): string | undefined;
export declare function resolveServiceModelsBaseUrl(service: string): string | undefined;
export declare function clampTemperature(service: string, temperature: number): number;
export declare function getWritingTemperature(service: string): number;
export declare function guessServiceFromBaseUrl(baseUrl: string): string;
export declare const SERVICE_TO_PI_PROVIDER: Record<string, string>;
export interface ModelInfo {
    readonly id: string;
    readonly name: string;
    readonly contextWindow: number;
    /** 模型输出上限（来自 providers bank 或 live /models 补充） */
    readonly maxOutput?: number;
}
/**
 * listModelsForService（R4 精修）：
 * - 先试 live /models probe（如果 baseUrl + apiKey 具备）
 * - probe 失败或无 apiKey：fallback 到 provider.models（inkos bank）
 * - 不再做 INKOS_LLM_MODEL env 补丁（会污染跨 service 菜单；bank 已足够全）
 *
 * custom / newapi / higress 等 baseUrl 空的 gateway provider：
 *   必须传 liveBaseUrl 才能做 probe；否则只依赖 bank。
 */
export declare function listModelsForService(service: string, apiKey?: string, liveBaseUrl?: string): Promise<ReadonlyArray<ModelInfo>>;
export declare function listServicesWithModelCount(): Promise<ReadonlyArray<{
    service: string;
    label: string;
    modelCount: number;
}>>;
//# sourceMappingURL=service-presets.d.ts.map