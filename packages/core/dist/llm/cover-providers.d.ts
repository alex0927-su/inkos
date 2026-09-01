export type CoverProviderId = "kkaiapi" | "openai" | "google";
export interface CoverProviderPreset {
    readonly service: CoverProviderId;
    readonly label: string;
    readonly baseUrl: string;
    readonly api: "responses" | "images" | "gemini";
    readonly defaultModel: string;
    readonly models: readonly string[];
}
export declare const COVER_PROVIDER_PRESETS: readonly CoverProviderPreset[];
export declare function resolveCoverProviderPreset(service: string | undefined): CoverProviderPreset | undefined;
export declare function normalizeCoverBaseUrl(value: unknown): string | undefined;
export declare function coverSecretKey(service: string): string;
//# sourceMappingURL=cover-providers.d.ts.map