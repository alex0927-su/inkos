import type { AssistantMessageEventStream, Model, Api } from "@mariozechner/pi-ai";
import type { LLMMessage, LLMResponse } from "../llm/provider.js";
export declare function isLlmStubEnabled(): boolean;
/**
 * Returns a deterministic AssistantMessageEventStream that either emits a
 * propose_action toolCall (when the latest user text mentions "结构/骨架/structure"
 * and propose_action hasn't run yet) or a plain "好的。" text reply.
 *
 * Mirrors localAssistantStopStream in agent-session.ts exactly — same
 * createAssistantMessageEventStream() + queueMicrotask pattern.
 */
export declare function stubAgentStream(model: Model<Api>, context: unknown): AssistantMessageEventStream;
/**
 * Deterministic replacement for the chatCompletion network call.
 * Returns STRUCTURE_JSON when the prompt mentions structure/骨架/nodes,
 * otherwise a single node JSON.
 */
export declare function stubChatCompletion(messages: ReadonlyArray<LLMMessage>, _model: string): LLMResponse;
//# sourceMappingURL=llm-stub.d.ts.map