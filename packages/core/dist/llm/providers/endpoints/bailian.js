export const BAILIAN = {
    id: "bailian",
    label: "百炼 (通义千问)",
    group: "china",
    api: "anthropic-messages",
    baseUrl: "https://dashscope.aliyuncs.com/apps/anthropic",
    checkModel: "qwen-turbo",
    temperatureRange: [0, 2],
    defaultTemperature: 0.7,
    writingTemperature: 1,
    models: [
        // --- Qwen3.6 系列（2026-04 发布，Anthropic 通道已放开） ---
        { id: "qwen3.6-max-preview", maxOutput: 65536, contextWindowTokens: 262144, enabled: true, releasedAt: "2026-04-21" },
        { id: "qwen3.6-plus", maxOutput: 65536, contextWindowTokens: 1000000, enabled: true, releasedAt: "2026-04-09" },
        { id: "qwen3.6-flash", maxOutput: 65536, contextWindowTokens: 1000000, enabled: true, releasedAt: "2026-04-17" },
        { id: "qwen3.6-27b", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2026-04-23" },
        // --- Qwen3.5 系列 ---
        { id: "qwen3.5-plus", maxOutput: 65536, contextWindowTokens: 1000000, enabled: true, releasedAt: "2026-02-15" },
        { id: "qwen3.5-flash", maxOutput: 65536, contextWindowTokens: 1000000, enabled: true, releasedAt: "2026-02-24" },
        { id: "qwen3.5-397b-a17b", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2026-02-16" },
        { id: "qwen3.5-122b-a10b", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2026-02-24" },
        { id: "qwen3.5-35b-a3b", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2026-02-24" },
        { id: "qwen3.5-27b", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2026-02-24" },
        // --- Qwen 通用 ---
        { id: "qwen3-max", maxOutput: 65536, contextWindowTokens: 262144, enabled: true, releasedAt: "2026-01-23" },
        { id: "qwen3-max-preview", maxOutput: 65536, contextWindowTokens: 262144, releasedAt: "2025-10-30" },
        { id: "qwen-max", maxOutput: 8192, contextWindowTokens: 131072 },
        { id: "qwen-plus", maxOutput: 32768, contextWindowTokens: 1000000 },
        { id: "qwen-flash", maxOutput: 32768, contextWindowTokens: 1000000, releasedAt: "2025-07-28" },
        { id: "qwen-turbo", maxOutput: 16384, contextWindowTokens: 1000000, releasedAt: "2025-07-15" },
        // --- 第三方代理（Anthropic 通道放开的那部分） ---
        { id: "kimi-k2.5", maxOutput: 32768, contextWindowTokens: 262144, temperature: 1 },
        { id: "kimi-k2-thinking", maxOutput: 16384, contextWindowTokens: 262144, releasedAt: "2025-11-10", temperature: 1 },
        { id: "MiniMax-M2.5", maxOutput: 32768, contextWindowTokens: 196608 },
        { id: "MiniMax-M2.1", maxOutput: 32768, contextWindowTokens: 204800 },
        { id: "glm-5.1", maxOutput: 16384, contextWindowTokens: 202752, enabled: true, releasedAt: "2026-04-23" },
        { id: "glm-5", maxOutput: 16384, contextWindowTokens: 202752 },
        { id: "glm-4.7", maxOutput: 16384, contextWindowTokens: 202752 },
        { id: "glm-4.6", maxOutput: 16384, contextWindowTokens: 202752 },
    ],
};
//# sourceMappingURL=bailian.js.map