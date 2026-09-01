import type { LLMClient, LLMMessage, LLMResponse, OnStreamProgress } from "../llm/provider.js";
import { type WorkerResultTool } from "../agent/worker-agent.js";
import type { Static, TSchema } from "@sinclair/typebox";
import type { Logger } from "../utils/logger.js";
import { type ActivatedSkillGuidance } from "../agent/skill-tool.js";
export interface AgentContext {
    readonly client: LLMClient;
    readonly model: string;
    readonly projectRoot: string;
    readonly bookId?: string;
    readonly logger?: Logger;
    readonly onStreamProgress?: OnStreamProgress;
    readonly signal?: AbortSignal;
    readonly activatedSkills?: ReadonlyArray<ActivatedSkillGuidance>;
}
export declare abstract class BaseAgent {
    protected readonly ctx: AgentContext;
    constructor(ctx: AgentContext);
    protected get log(): Logger | undefined;
    protected chat(messages: ReadonlyArray<LLMMessage>, options?: {
        readonly temperature?: number;
        readonly maxTokens?: number;
    }): Promise<LLMResponse>;
    protected submitStructured<TParameters extends TSchema>(messages: ReadonlyArray<LLMMessage>, resultTool: WorkerResultTool<TParameters>, options?: {
        readonly temperature?: number;
        readonly maxTokens?: number;
    }): Promise<Static<TParameters>>;
    protected withPromptPackGuidance(basePrompt: string, promptId: string): Promise<string>;
    private appendTaskSkillGuidance;
    /**
     * Chat with web search enabled.
     * OpenAI: uses native web_search_options / web_search_preview.
     * Other providers: searches via Tavily API (TAVILY_API_KEY), injects results into prompt.
     */
    protected chatWithSearch(messages: ReadonlyArray<LLMMessage>, options?: {
        readonly temperature?: number;
        readonly maxTokens?: number;
    }): Promise<LLMResponse>;
    abstract get name(): string;
}
export declare function appendActivatedSkillGuidance(messages: ReadonlyArray<LLMMessage>, activations: ReadonlyArray<ActivatedSkillGuidance> | undefined): ReadonlyArray<LLMMessage>;
//# sourceMappingURL=base.d.ts.map