export interface VerifyResult {
    readonly recommendedTransport?: {
        readonly apiFormat?: "chat" | "responses";
        readonly stream?: boolean;
    };
    readonly probe: {
        readonly ok: boolean;
        readonly models: number;
        readonly error?: string;
    };
    readonly chat: {
        readonly ok: boolean;
        readonly latencyMs?: number;
        readonly error?: string;
    } | null;
}
/**
 * verifyService: 两步验证。
 * Step 1 probe /models。
 * Step 2 chat hello 到 checkModel（命中 provider.checkModel 才做；custom / newapi / higress 没有 checkModel，chat 字段返回 null）。
 */
export declare function verifyService(service: string, apiKey: string, opts?: {
    checkModel?: string;
    baseUrl?: string;
    proxyUrl?: string;
}): Promise<VerifyResult>;
//# sourceMappingURL=verify.d.ts.map