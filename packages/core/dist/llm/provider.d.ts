import type { LLMConfig } from "../models/project.js";
import type { Api as PiApi, Model as PiModel, Context as PiContext, AssistantMessageEventStream } from "@mariozechner/pi-ai";
export interface StreamProgress {
    readonly elapsedMs: number;
    readonly totalChars: number;
    readonly chineseChars: number;
    readonly status: "streaming" | "done";
}
export type OnStreamProgress = (progress: StreamProgress) => void;
export interface StreamDeadlineOptions {
    readonly firstEventTimeoutMs?: number;
    readonly idleTimeoutMs?: number;
}
export declare class LLMStreamInactivityError extends Error {
    readonly stage: "first-event" | "idle";
    readonly timeoutMs: number;
    constructor(stage: "first-event" | "idle", timeoutMs: number);
}
export declare function guardAssistantMessageStream<TApi extends PiApi>(model: PiModel<TApi>, start: (signal: AbortSignal) => AssistantMessageEventStream, callerSignal?: AbortSignal, deadlineOptions?: StreamDeadlineOptions): AssistantMessageEventStream;
export declare function createStreamMonitor(onProgress?: OnStreamProgress, intervalMs?: number): {
    readonly onChunk: (text: string) => void;
    readonly stop: () => void;
};
export interface LLMResponse {
    readonly content: string;
    readonly usage: {
        readonly promptTokens: number;
        readonly completionTokens: number;
        readonly totalTokens: number;
    };
}
export interface LLMMessage {
    readonly role: "system" | "user" | "assistant";
    readonly content: string;
}
export interface LLMClient {
    readonly provider: "openai" | "anthropic";
    readonly service?: string;
    readonly configSource?: LLMConfig["configSource"];
    readonly apiFormat: "chat" | "responses";
    readonly stream: boolean;
    readonly proxyUrl?: string;
    readonly _piModel?: PiModel<PiApi>;
    readonly _apiKey?: string;
    readonly defaults: {
        readonly temperature: number;
        /**
         * Per-call fallback: 当 agent 调 chat() 不传 options.maxTokens 时用这个值。
         * 命中模型卡时来自 providers bank 的 modelCard.maxOutput；未知模型走写作兜底预算。
         */
        readonly maxTokens: number;
        /**
         * Legacy mock compatibility only. v2 provider resolution no longer caps
         * per-call maxTokens from project config; model max output comes from the
         * provider bank.
         */
        readonly maxTokensCap?: number | null;
        readonly thinkingBudget: number;
        readonly extra: Record<string, unknown>;
    };
}
export declare function createLLMClient(config: LLMConfig): LLMClient;
export declare class PartialResponseError extends Error {
    readonly partialContent: string;
    readonly reason: "output-limit" | "interrupted";
    constructor(partialContent: string, cause: unknown, reason?: "output-limit" | "interrupted");
}
export declare class ContextWindowExceededError extends Error {
    readonly estimatedInputTokens: number;
    readonly reservedOutputTokens: number;
    readonly contextWindow: number;
    constructor(params: {
        readonly estimatedInputTokens: number;
        readonly reservedOutputTokens: number;
        readonly contextWindow: number;
        readonly model: string;
    });
}
export declare function __resetFixedTemperatureWarnings(): void;
export declare function estimateTextTokens(text: string): number;
export declare function estimatePiContextTokens(context: PiContext): number;
export declare function assertWithinContextWindow(params: {
    readonly piModel: PiModel<PiApi>;
    readonly model: string;
    readonly estimatedInputTokens: number;
    readonly reservedOutputTokens: number;
}): void;
/**
 * Transient *HTTP-level* upstream failures worth retrying: 429 (rate limit),
 * 502/503/504 (gateway / temporarily unavailable / overloaded). These are the
 * aggregator blips that previously aborted whole architect/writer/short runs
 * because only transport-level errors were retried.
 *
 * Deliberately does NOT match a bare 500 / "MODEL_NOT_AVAILABLE": on providers
 * like PPIO a 500 means the model isn't on inference at all — retrying is futile
 * and just delays the real error.
 */
export declare function isTransientLLMHttpError(error: unknown): boolean;
export declare function chatCompletion(client: LLMClient, model: string, messages: ReadonlyArray<LLMMessage>, options?: {
    readonly temperature?: number;
    readonly maxTokens?: number;
    readonly webSearch?: boolean;
    readonly onStreamProgress?: OnStreamProgress;
    readonly onTextDelta?: (text: string) => void;
    readonly signal?: AbortSignal;
    readonly firstEventTimeoutMs?: number;
    readonly streamIdleTimeoutMs?: number;
    readonly retry?: boolean;
}): Promise<LLMResponse>;
//# sourceMappingURL=provider.d.ts.map