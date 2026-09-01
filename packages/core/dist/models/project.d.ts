import { z } from "zod";
export declare const LLMConfigSchema: z.ZodObject<{
    provider: z.ZodEnum<["anthropic", "openai", "custom"]>;
    service: z.ZodDefault<z.ZodString>;
    configSource: z.ZodDefault<z.ZodEnum<["env", "studio"]>>;
    baseUrl: z.ZodString;
    apiKey: z.ZodDefault<z.ZodString>;
    model: z.ZodString;
    proxyUrl: z.ZodOptional<z.ZodString>;
    temperature: z.ZodDefault<z.ZodNumber>;
    thinkingBudget: z.ZodDefault<z.ZodNumber>;
    extra: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    apiFormat: z.ZodDefault<z.ZodEnum<["chat", "responses"]>>;
    stream: z.ZodDefault<z.ZodBoolean>;
    services: z.ZodOptional<z.ZodArray<z.ZodObject<{
        service: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        baseUrl: z.ZodOptional<z.ZodString>;
        models: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        temperature: z.ZodOptional<z.ZodNumber>;
        apiFormat: z.ZodOptional<z.ZodEnum<["chat", "responses"]>>;
        stream: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        service: string;
        name?: string | undefined;
        baseUrl?: string | undefined;
        models?: string[] | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
    }, {
        service: string;
        name?: string | undefined;
        baseUrl?: string | undefined;
        models?: string[] | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
    }>, "many">>;
    defaultModel: z.ZodOptional<z.ZodString>;
    cover: z.ZodOptional<z.ZodObject<{
        service: z.ZodEnum<["kkaiapi", "openai", "google"]>;
        model: z.ZodString;
        baseUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        service: "kkaiapi" | "openai" | "google";
        model: string;
        baseUrl?: string | undefined;
    }, {
        service: "kkaiapi" | "openai" | "google";
        model: string;
        baseUrl?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    service: string;
    baseUrl: string;
    temperature: number;
    apiFormat: "chat" | "responses";
    stream: boolean;
    model: string;
    provider: "custom" | "openai" | "anthropic";
    configSource: "env" | "studio";
    apiKey: string;
    thinkingBudget: number;
    proxyUrl?: string | undefined;
    extra?: Record<string, unknown> | undefined;
    headers?: Record<string, string> | undefined;
    services?: {
        service: string;
        name?: string | undefined;
        baseUrl?: string | undefined;
        models?: string[] | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
    }[] | undefined;
    defaultModel?: string | undefined;
    cover?: {
        service: "kkaiapi" | "openai" | "google";
        model: string;
        baseUrl?: string | undefined;
    } | undefined;
}, {
    baseUrl: string;
    model: string;
    provider: "custom" | "openai" | "anthropic";
    service?: string | undefined;
    temperature?: number | undefined;
    apiFormat?: "chat" | "responses" | undefined;
    stream?: boolean | undefined;
    configSource?: "env" | "studio" | undefined;
    apiKey?: string | undefined;
    proxyUrl?: string | undefined;
    thinkingBudget?: number | undefined;
    extra?: Record<string, unknown> | undefined;
    headers?: Record<string, string> | undefined;
    services?: {
        service: string;
        name?: string | undefined;
        baseUrl?: string | undefined;
        models?: string[] | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
    }[] | undefined;
    defaultModel?: string | undefined;
    cover?: {
        service: "kkaiapi" | "openai" | "google";
        model: string;
        baseUrl?: string | undefined;
    } | undefined;
}>;
export type LLMConfig = z.infer<typeof LLMConfigSchema>;
export declare const NotifyChannelSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"telegram">;
    botToken: z.ZodString;
    chatId: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
}, "strip", z.ZodTypeAny, {
    type: "telegram";
    botToken: string;
    chatId: string;
    format: "markdown" | "text";
}, {
    type: "telegram";
    botToken: string;
    chatId: string;
    format?: "markdown" | "text" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"wechat-work">;
    webhookUrl: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
}, "strip", z.ZodTypeAny, {
    type: "wechat-work";
    format: "markdown" | "text";
    webhookUrl: string;
}, {
    type: "wechat-work";
    webhookUrl: string;
    format?: "markdown" | "text" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"feishu">;
    webhookUrl: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
}, "strip", z.ZodTypeAny, {
    type: "feishu";
    format: "markdown" | "text";
    webhookUrl: string;
}, {
    type: "feishu";
    webhookUrl: string;
    format?: "markdown" | "text" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"webhook">;
    url: z.ZodString;
    secret: z.ZodOptional<z.ZodString>;
    events: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
}, "strip", z.ZodTypeAny, {
    type: "webhook";
    format: "markdown" | "text";
    url: string;
    events: string[];
    secret?: string | undefined;
}, {
    type: "webhook";
    url: string;
    format?: "markdown" | "text" | undefined;
    secret?: string | undefined;
    events?: string[] | undefined;
}>]>;
export type NotifyChannel = z.infer<typeof NotifyChannelSchema>;
export declare const DetectionConfigSchema: z.ZodObject<{
    provider: z.ZodDefault<z.ZodEnum<["gptzero", "originality", "custom"]>>;
    apiUrl: z.ZodString;
    apiKeyEnv: z.ZodString;
    threshold: z.ZodDefault<z.ZodNumber>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    autoRewrite: z.ZodDefault<z.ZodBoolean>;
    maxRetries: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    provider: "custom" | "gptzero" | "originality";
    apiUrl: string;
    apiKeyEnv: string;
    threshold: number;
    enabled: boolean;
    autoRewrite: boolean;
    maxRetries: number;
}, {
    apiUrl: string;
    apiKeyEnv: string;
    provider?: "custom" | "gptzero" | "originality" | undefined;
    threshold?: number | undefined;
    enabled?: boolean | undefined;
    autoRewrite?: boolean | undefined;
    maxRetries?: number | undefined;
}>;
export type DetectionConfig = z.infer<typeof DetectionConfigSchema>;
export declare const QualityGatesSchema: z.ZodObject<{
    maxAuditRetries: z.ZodDefault<z.ZodNumber>;
    pauseAfterConsecutiveFailures: z.ZodDefault<z.ZodNumber>;
    retryTemperatureStep: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    maxAuditRetries: number;
    pauseAfterConsecutiveFailures: number;
    retryTemperatureStep: number;
}, {
    maxAuditRetries?: number | undefined;
    pauseAfterConsecutiveFailures?: number | undefined;
    retryTemperatureStep?: number | undefined;
}>;
export type QualityGates = z.infer<typeof QualityGatesSchema>;
export declare const FoundationConfigSchema: z.ZodObject<{
    reviewRetries: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    reviewRetries: number;
}, {
    reviewRetries?: number | undefined;
}>;
export type FoundationConfig = z.infer<typeof FoundationConfigSchema>;
export declare const WritingConfigSchema: z.ZodObject<{
    reviewRetries: z.ZodDefault<z.ZodNumber>;
    reviewMode: z.ZodDefault<z.ZodEnum<["auto", "manual"]>>;
    revisionGate: z.ZodDefault<z.ZodEnum<["strict", "lenient", "always"]>>;
}, "strip", z.ZodTypeAny, {
    reviewMode: "auto" | "manual";
    revisionGate: "strict" | "lenient" | "always";
    reviewRetries: number;
}, {
    reviewMode?: "auto" | "manual" | undefined;
    revisionGate?: "strict" | "lenient" | "always" | undefined;
    reviewRetries?: number | undefined;
}>;
export type WritingConfig = z.infer<typeof WritingConfigSchema>;
export declare const AgentLLMOverrideSchema: z.ZodObject<{
    model: z.ZodString;
    provider: z.ZodOptional<z.ZodEnum<["anthropic", "openai", "custom"]>>;
    baseUrl: z.ZodOptional<z.ZodString>;
    apiKeyEnv: z.ZodOptional<z.ZodString>;
    stream: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    model: string;
    baseUrl?: string | undefined;
    stream?: boolean | undefined;
    provider?: "custom" | "openai" | "anthropic" | undefined;
    apiKeyEnv?: string | undefined;
}, {
    model: string;
    baseUrl?: string | undefined;
    stream?: boolean | undefined;
    provider?: "custom" | "openai" | "anthropic" | undefined;
    apiKeyEnv?: string | undefined;
}>;
export type AgentLLMOverride = z.infer<typeof AgentLLMOverrideSchema>;
export declare const ResearchSearchConfigSchema: z.ZodDefault<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    provider: z.ZodDefault<z.ZodEnum<["tavily", "custom"]>>;
    baseUrl: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    apiKeyEnv: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    provider: "custom" | "tavily";
    enabled: boolean;
    baseUrl?: string | undefined;
    apiKey?: string | undefined;
    apiKeyEnv?: string | undefined;
}, {
    baseUrl?: string | undefined;
    provider?: "custom" | "tavily" | undefined;
    apiKey?: string | undefined;
    apiKeyEnv?: string | undefined;
    enabled?: boolean | undefined;
}>>;
export type ResearchSearchConfig = z.infer<typeof ResearchSearchConfigSchema>;
export declare const ProjectConfigSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodLiteral<"0.1.0">;
    language: z.ZodDefault<z.ZodEnum<["zh", "en"]>>;
    llm: z.ZodObject<{
        provider: z.ZodEnum<["anthropic", "openai", "custom"]>;
        service: z.ZodDefault<z.ZodString>;
        configSource: z.ZodDefault<z.ZodEnum<["env", "studio"]>>;
        baseUrl: z.ZodString;
        apiKey: z.ZodDefault<z.ZodString>;
        model: z.ZodString;
        proxyUrl: z.ZodOptional<z.ZodString>;
        temperature: z.ZodDefault<z.ZodNumber>;
        thinkingBudget: z.ZodDefault<z.ZodNumber>;
        extra: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        apiFormat: z.ZodDefault<z.ZodEnum<["chat", "responses"]>>;
        stream: z.ZodDefault<z.ZodBoolean>;
        services: z.ZodOptional<z.ZodArray<z.ZodObject<{
            service: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            baseUrl: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            temperature: z.ZodOptional<z.ZodNumber>;
            apiFormat: z.ZodOptional<z.ZodEnum<["chat", "responses"]>>;
            stream: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }, {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }>, "many">>;
        defaultModel: z.ZodOptional<z.ZodString>;
        cover: z.ZodOptional<z.ZodObject<{
            service: z.ZodEnum<["kkaiapi", "openai", "google"]>;
            model: z.ZodString;
            baseUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        }, {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        service: string;
        baseUrl: string;
        temperature: number;
        apiFormat: "chat" | "responses";
        stream: boolean;
        model: string;
        provider: "custom" | "openai" | "anthropic";
        configSource: "env" | "studio";
        apiKey: string;
        thinkingBudget: number;
        proxyUrl?: string | undefined;
        extra?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        services?: {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }[] | undefined;
        defaultModel?: string | undefined;
        cover?: {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        } | undefined;
    }, {
        baseUrl: string;
        model: string;
        provider: "custom" | "openai" | "anthropic";
        service?: string | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
        configSource?: "env" | "studio" | undefined;
        apiKey?: string | undefined;
        proxyUrl?: string | undefined;
        thinkingBudget?: number | undefined;
        extra?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        services?: {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }[] | undefined;
        defaultModel?: string | undefined;
        cover?: {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        } | undefined;
    }>;
    notify: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"telegram">;
        botToken: z.ZodString;
        chatId: z.ZodString;
        format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "telegram";
        botToken: string;
        chatId: string;
        format: "markdown" | "text";
    }, {
        type: "telegram";
        botToken: string;
        chatId: string;
        format?: "markdown" | "text" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"wechat-work">;
        webhookUrl: z.ZodString;
        format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "wechat-work";
        format: "markdown" | "text";
        webhookUrl: string;
    }, {
        type: "wechat-work";
        webhookUrl: string;
        format?: "markdown" | "text" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"feishu">;
        webhookUrl: z.ZodString;
        format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "feishu";
        format: "markdown" | "text";
        webhookUrl: string;
    }, {
        type: "feishu";
        webhookUrl: string;
        format?: "markdown" | "text" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"webhook">;
        url: z.ZodString;
        secret: z.ZodOptional<z.ZodString>;
        events: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        format: z.ZodDefault<z.ZodEnum<["markdown", "text"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "webhook";
        format: "markdown" | "text";
        url: string;
        events: string[];
        secret?: string | undefined;
    }, {
        type: "webhook";
        url: string;
        format?: "markdown" | "text" | undefined;
        secret?: string | undefined;
        events?: string[] | undefined;
    }>]>, "many">>;
    detection: z.ZodOptional<z.ZodObject<{
        provider: z.ZodDefault<z.ZodEnum<["gptzero", "originality", "custom"]>>;
        apiUrl: z.ZodString;
        apiKeyEnv: z.ZodString;
        threshold: z.ZodDefault<z.ZodNumber>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        autoRewrite: z.ZodDefault<z.ZodBoolean>;
        maxRetries: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        provider: "custom" | "gptzero" | "originality";
        apiUrl: string;
        apiKeyEnv: string;
        threshold: number;
        enabled: boolean;
        autoRewrite: boolean;
        maxRetries: number;
    }, {
        apiUrl: string;
        apiKeyEnv: string;
        provider?: "custom" | "gptzero" | "originality" | undefined;
        threshold?: number | undefined;
        enabled?: boolean | undefined;
        autoRewrite?: boolean | undefined;
        maxRetries?: number | undefined;
    }>>;
    foundation: z.ZodDefault<z.ZodObject<{
        reviewRetries: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        reviewRetries: number;
    }, {
        reviewRetries?: number | undefined;
    }>>;
    writing: z.ZodDefault<z.ZodObject<{
        reviewRetries: z.ZodDefault<z.ZodNumber>;
        reviewMode: z.ZodDefault<z.ZodEnum<["auto", "manual"]>>;
        revisionGate: z.ZodDefault<z.ZodEnum<["strict", "lenient", "always"]>>;
    }, "strip", z.ZodTypeAny, {
        reviewMode: "auto" | "manual";
        revisionGate: "strict" | "lenient" | "always";
        reviewRetries: number;
    }, {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
        reviewRetries?: number | undefined;
    }>>;
    researchSearch: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        provider: z.ZodDefault<z.ZodEnum<["tavily", "custom"]>>;
        baseUrl: z.ZodOptional<z.ZodString>;
        apiKey: z.ZodOptional<z.ZodString>;
        apiKeyEnv: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        provider: "custom" | "tavily";
        enabled: boolean;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
        apiKeyEnv?: string | undefined;
    }, {
        baseUrl?: string | undefined;
        provider?: "custom" | "tavily" | undefined;
        apiKey?: string | undefined;
        apiKeyEnv?: string | undefined;
        enabled?: boolean | undefined;
    }>>;
    modelOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodObject<{
        model: z.ZodString;
        provider: z.ZodOptional<z.ZodEnum<["anthropic", "openai", "custom"]>>;
        baseUrl: z.ZodOptional<z.ZodString>;
        apiKeyEnv: z.ZodOptional<z.ZodString>;
        stream: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        model: string;
        baseUrl?: string | undefined;
        stream?: boolean | undefined;
        provider?: "custom" | "openai" | "anthropic" | undefined;
        apiKeyEnv?: string | undefined;
    }, {
        model: string;
        baseUrl?: string | undefined;
        stream?: boolean | undefined;
        provider?: "custom" | "openai" | "anthropic" | undefined;
        apiKeyEnv?: string | undefined;
    }>]>>>;
    daemon: z.ZodDefault<z.ZodObject<{
        schedule: z.ZodObject<{
            radarCron: z.ZodDefault<z.ZodString>;
            writeCron: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            radarCron: string;
            writeCron: string;
        }, {
            radarCron?: string | undefined;
            writeCron?: string | undefined;
        }>;
        maxConcurrentBooks: z.ZodDefault<z.ZodNumber>;
        chaptersPerCycle: z.ZodDefault<z.ZodNumber>;
        retryDelayMs: z.ZodDefault<z.ZodNumber>;
        cooldownAfterChapterMs: z.ZodDefault<z.ZodNumber>;
        maxChaptersPerDay: z.ZodDefault<z.ZodNumber>;
        qualityGates: z.ZodDefault<z.ZodObject<{
            maxAuditRetries: z.ZodDefault<z.ZodNumber>;
            pauseAfterConsecutiveFailures: z.ZodDefault<z.ZodNumber>;
            retryTemperatureStep: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxAuditRetries: number;
            pauseAfterConsecutiveFailures: number;
            retryTemperatureStep: number;
        }, {
            maxAuditRetries?: number | undefined;
            pauseAfterConsecutiveFailures?: number | undefined;
            retryTemperatureStep?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        schedule: {
            radarCron: string;
            writeCron: string;
        };
        maxConcurrentBooks: number;
        chaptersPerCycle: number;
        retryDelayMs: number;
        cooldownAfterChapterMs: number;
        maxChaptersPerDay: number;
        qualityGates: {
            maxAuditRetries: number;
            pauseAfterConsecutiveFailures: number;
            retryTemperatureStep: number;
        };
    }, {
        schedule: {
            radarCron?: string | undefined;
            writeCron?: string | undefined;
        };
        maxConcurrentBooks?: number | undefined;
        chaptersPerCycle?: number | undefined;
        retryDelayMs?: number | undefined;
        cooldownAfterChapterMs?: number | undefined;
        maxChaptersPerDay?: number | undefined;
        qualityGates?: {
            maxAuditRetries?: number | undefined;
            pauseAfterConsecutiveFailures?: number | undefined;
            retryTemperatureStep?: number | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    language: "zh" | "en";
    writing: {
        reviewMode: "auto" | "manual";
        revisionGate: "strict" | "lenient" | "always";
        reviewRetries: number;
    };
    name: string;
    version: "0.1.0";
    llm: {
        service: string;
        baseUrl: string;
        temperature: number;
        apiFormat: "chat" | "responses";
        stream: boolean;
        model: string;
        provider: "custom" | "openai" | "anthropic";
        configSource: "env" | "studio";
        apiKey: string;
        thinkingBudget: number;
        proxyUrl?: string | undefined;
        extra?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        services?: {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }[] | undefined;
        defaultModel?: string | undefined;
        cover?: {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        } | undefined;
    };
    notify: ({
        type: "telegram";
        botToken: string;
        chatId: string;
        format: "markdown" | "text";
    } | {
        type: "wechat-work";
        format: "markdown" | "text";
        webhookUrl: string;
    } | {
        type: "feishu";
        format: "markdown" | "text";
        webhookUrl: string;
    } | {
        type: "webhook";
        format: "markdown" | "text";
        url: string;
        events: string[];
        secret?: string | undefined;
    })[];
    foundation: {
        reviewRetries: number;
    };
    researchSearch: {
        provider: "custom" | "tavily";
        enabled: boolean;
        baseUrl?: string | undefined;
        apiKey?: string | undefined;
        apiKeyEnv?: string | undefined;
    };
    daemon: {
        schedule: {
            radarCron: string;
            writeCron: string;
        };
        maxConcurrentBooks: number;
        chaptersPerCycle: number;
        retryDelayMs: number;
        cooldownAfterChapterMs: number;
        maxChaptersPerDay: number;
        qualityGates: {
            maxAuditRetries: number;
            pauseAfterConsecutiveFailures: number;
            retryTemperatureStep: number;
        };
    };
    detection?: {
        provider: "custom" | "gptzero" | "originality";
        apiUrl: string;
        apiKeyEnv: string;
        threshold: number;
        enabled: boolean;
        autoRewrite: boolean;
        maxRetries: number;
    } | undefined;
    modelOverrides?: Record<string, string | {
        model: string;
        baseUrl?: string | undefined;
        stream?: boolean | undefined;
        provider?: "custom" | "openai" | "anthropic" | undefined;
        apiKeyEnv?: string | undefined;
    }> | undefined;
}, {
    name: string;
    version: "0.1.0";
    llm: {
        baseUrl: string;
        model: string;
        provider: "custom" | "openai" | "anthropic";
        service?: string | undefined;
        temperature?: number | undefined;
        apiFormat?: "chat" | "responses" | undefined;
        stream?: boolean | undefined;
        configSource?: "env" | "studio" | undefined;
        apiKey?: string | undefined;
        proxyUrl?: string | undefined;
        thinkingBudget?: number | undefined;
        extra?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        services?: {
            service: string;
            name?: string | undefined;
            baseUrl?: string | undefined;
            models?: string[] | undefined;
            temperature?: number | undefined;
            apiFormat?: "chat" | "responses" | undefined;
            stream?: boolean | undefined;
        }[] | undefined;
        defaultModel?: string | undefined;
        cover?: {
            service: "kkaiapi" | "openai" | "google";
            model: string;
            baseUrl?: string | undefined;
        } | undefined;
    };
    language?: "zh" | "en" | undefined;
    writing?: {
        reviewMode?: "auto" | "manual" | undefined;
        revisionGate?: "strict" | "lenient" | "always" | undefined;
        reviewRetries?: number | undefined;
    } | undefined;
    notify?: ({
        type: "telegram";
        botToken: string;
        chatId: string;
        format?: "markdown" | "text" | undefined;
    } | {
        type: "wechat-work";
        webhookUrl: string;
        format?: "markdown" | "text" | undefined;
    } | {
        type: "feishu";
        webhookUrl: string;
        format?: "markdown" | "text" | undefined;
    } | {
        type: "webhook";
        url: string;
        format?: "markdown" | "text" | undefined;
        secret?: string | undefined;
        events?: string[] | undefined;
    })[] | undefined;
    detection?: {
        apiUrl: string;
        apiKeyEnv: string;
        provider?: "custom" | "gptzero" | "originality" | undefined;
        threshold?: number | undefined;
        enabled?: boolean | undefined;
        autoRewrite?: boolean | undefined;
        maxRetries?: number | undefined;
    } | undefined;
    foundation?: {
        reviewRetries?: number | undefined;
    } | undefined;
    researchSearch?: {
        baseUrl?: string | undefined;
        provider?: "custom" | "tavily" | undefined;
        apiKey?: string | undefined;
        apiKeyEnv?: string | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    modelOverrides?: Record<string, string | {
        model: string;
        baseUrl?: string | undefined;
        stream?: boolean | undefined;
        provider?: "custom" | "openai" | "anthropic" | undefined;
        apiKeyEnv?: string | undefined;
    }> | undefined;
    daemon?: {
        schedule: {
            radarCron?: string | undefined;
            writeCron?: string | undefined;
        };
        maxConcurrentBooks?: number | undefined;
        chaptersPerCycle?: number | undefined;
        retryDelayMs?: number | undefined;
        cooldownAfterChapterMs?: number | undefined;
        maxChaptersPerDay?: number | undefined;
        qualityGates?: {
            maxAuditRetries?: number | undefined;
            pauseAfterConsecutiveFailures?: number | undefined;
            retryTemperatureStep?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
//# sourceMappingURL=project.d.ts.map