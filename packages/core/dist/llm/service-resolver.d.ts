import type { Model, Api } from "@mariozechner/pi-ai";
export interface ResolvedModel {
    model: Model<Api>;
    apiKey: string;
    writingTemperature?: number;
    temperatureRange?: readonly [number, number];
    temperatureHint?: string;
}
export declare function resolveServiceModel(service: string, modelId: string, projectRoot: string, customBaseUrl?: string, customApiFormat?: "chat" | "responses"): Promise<ResolvedModel>;
//# sourceMappingURL=service-resolver.d.ts.map