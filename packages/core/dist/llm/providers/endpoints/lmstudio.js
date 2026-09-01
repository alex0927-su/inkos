export const LMSTUDIO = {
    id: "lmstudio",
    label: "LM Studio (本地)",
    group: "local",
    api: "openai-completions",
    baseUrl: "http://localhost:1234/v1",
    modelsBaseUrl: "http://localhost:1234/v1",
    transportDefaults: {
        apiFormat: "chat",
        stream: true,
    },
    // LM Studio exposes the models installed by the user through /v1/models.
    models: [],
};
//# sourceMappingURL=lmstudio.js.map