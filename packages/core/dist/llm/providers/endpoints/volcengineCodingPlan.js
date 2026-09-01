export const VOLCENGINE_CODING_PLAN = {
    id: "volcengineCodingPlan",
    label: "火山 Coding Plan",
    group: "codingPlan",
    api: "anthropic-messages",
    baseUrl: "https://ark.cn-beijing.volces.com/api/coding",
    checkModel: "doubao-seed-2.0-code",
    temperatureRange: [0, 1],
    defaultTemperature: 0.7,
    writingTemperature: 1,
    models: [
        // --- Doubao-Seed-2.0 主力（2026-02-14 发布） ---
        { id: "doubao-seed-2.0-code", maxOutput: 128000, contextWindowTokens: 256000, enabled: true, releasedAt: "2026-02-15" },
        { id: "doubao-seed-2.0-pro", maxOutput: 128000, contextWindowTokens: 256000, enabled: true, releasedAt: "2026-02-15" },
        { id: "doubao-seed-2.0-lite", maxOutput: 128000, contextWindowTokens: 256000, enabled: true, releasedAt: "2026-02-15" },
        // --- 老版 ---
        { id: "doubao-seed-code", maxOutput: 32000, contextWindowTokens: 256000, releasedAt: "2025-11-01" },
        // --- 订阅包里的第三方模型 ---
        { id: "minimax-m2.5", maxOutput: 131072, contextWindowTokens: 204800, enabled: true },
        { id: "glm-4.7", maxOutput: 131072, contextWindowTokens: 200000, enabled: true },
        { id: "deepseek-v3.2", maxOutput: 65536, contextWindowTokens: 262144, enabled: true },
        { id: "kimi-k2.5", maxOutput: 32768, contextWindowTokens: 262144, enabled: true, temperature: 1 },
    ],
};
//# sourceMappingURL=volcengineCodingPlan.js.map