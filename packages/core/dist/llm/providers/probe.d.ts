/**
 * 通用 OpenAI 兼容 /models 探针。
 * 任何失败（网络错、超时、非 JSON、非 2xx）一律返回空数组，不抛异常。
 */
export interface ProbedModel {
    readonly id: string;
    readonly name: string;
    readonly contextWindow: number;
}
export declare function probeModelsFromUpstream(baseUrl: string, apiKey: string, timeoutMs?: number): Promise<ReadonlyArray<ProbedModel>>;
//# sourceMappingURL=probe.d.ts.map