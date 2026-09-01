import type { Static, TSchema } from "@sinclair/typebox";
import { type LLMClient, type LLMMessage, type LLMResponse, type OnStreamProgress } from "../llm/provider.js";
export interface WorkerAgentOptions {
    readonly temperature?: number;
    readonly maxTokens?: number;
    readonly webSearch?: boolean;
    readonly onStreamProgress?: OnStreamProgress;
    readonly onTextDelta?: (text: string) => void;
    readonly signal?: AbortSignal;
}
export interface WorkerResultTool<TParameters extends TSchema> {
    readonly name: string;
    readonly label: string;
    readonly description: string;
    readonly parameters: TParameters;
}
export declare function runWorkerAgent(client: LLMClient, modelId: string, messages: ReadonlyArray<LLMMessage>, options?: WorkerAgentOptions): Promise<LLMResponse>;
/**
 * Run a worker whose result is host-consumed state rather than prose.
 * The model must submit validated arguments through one Pi tool; the host owns
 * the tool result and never scrapes JSON out of assistant text.
 */
export declare function runWorkerAgentTool<TParameters extends TSchema>(client: LLMClient, modelId: string, messages: ReadonlyArray<LLMMessage>, resultTool: WorkerResultTool<TParameters>, options?: WorkerAgentOptions): Promise<Static<TParameters>>;
//# sourceMappingURL=worker-agent.d.ts.map