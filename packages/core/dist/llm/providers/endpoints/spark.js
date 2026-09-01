export const SPARK = {
    id: "spark",
    label: "讯飞星火",
    group: "china",
    api: "openai-completions",
    baseUrl: "https://spark-api-open.xf-yun.com/v1",
    checkModel: "lite",
    temperatureRange: [0, 1],
    defaultTemperature: 0.5,
    writingTemperature: 0.95,
    models: [
        // id 即官方文档 model 字段。对应产品名写在行尾注释
        { id: "4.0Ultra", maxOutput: 32768, contextWindowTokens: 32768, enabled: true }, // Spark 4.0 Ultra
        { id: "pro-128k", maxOutput: 32768, contextWindowTokens: 131072, enabled: true }, // Spark Pro-128K
        { id: "max-32k", maxOutput: 8192, contextWindowTokens: 32768 }, // Spark Max-32K
        { id: "generalv3.5", maxOutput: 8192, contextWindowTokens: 8192 }, // Spark Max (2026-03-10 后台升级到 Ultra)
        { id: "generalv3", maxOutput: 8192, contextWindowTokens: 8192 }, // Spark Pro
        { id: "lite", maxOutput: 4096, contextWindowTokens: 8192, enabled: true }, // Spark Lite
    ],
};
//# sourceMappingURL=spark.js.map