export const KIMI_CODE = {
    id: "kimicode",
    label: "Kimi Code",
    group: "codingPlan",
    api: "anthropic-messages",
    baseUrl: "https://api.kimi.com/coding",
    modelsBaseUrl: "https://api.kimi.com/coding/v1",
    checkModel: "kimi-for-coding",
    temperatureRange: [0, 2],
    defaultTemperature: 1,
    writingTemperature: 1,
    models: [
        { id: "kimi-for-coding", maxOutput: 32768, contextWindowTokens: 262144, enabled: true },
    ],
};
//# sourceMappingURL=kimiCode.js.map