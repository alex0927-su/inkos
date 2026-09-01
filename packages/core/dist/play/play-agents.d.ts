import { z } from "zod";
import { BaseAgent, type AgentContext } from "../agents/base.js";
import { type PlayActionIntent, type PlayActionIntentInput, type PlayMutation, type PlayMutationInput } from "../models/play.js";
export interface PlayActionInterpreterInput {
    readonly input: string;
    readonly sceneBrief: string;
    readonly language?: "zh" | "en";
}
export interface PlayWorldMutatorInput {
    readonly turn: number;
    readonly input: string;
    readonly action: PlayActionIntentInput;
    readonly context: string;
    readonly language?: "zh" | "en";
}
export interface PlaySceneRenderInput {
    readonly input: string;
    readonly action: PlayActionIntentInput;
    readonly context?: string;
    readonly mutationSummary: string;
    readonly stateBrief: string;
    readonly replayContext?: string;
    readonly language?: "zh" | "en";
    readonly worldPremise?: string;
}
export interface PlaySceneReconcileInput {
    readonly turn: number;
    readonly input: string;
    readonly action: PlayActionIntentInput;
    readonly mutation: PlayMutationInput;
    readonly sceneText: string;
    readonly context: string;
    readonly stateBrief: string;
    readonly language?: "zh" | "en";
    readonly worldPremise?: string;
}
declare const PlaySceneRenderSchema: z.ZodObject<{
    sceneText: z.ZodString;
    suggestedActions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sceneText: string;
    suggestedActions: string[];
}, {
    sceneText: string;
    suggestedActions?: string[] | undefined;
}>;
export type PlaySceneRender = z.infer<typeof PlaySceneRenderSchema>;
export declare class PlayActionInterpreterAgent extends BaseAgent {
    constructor(ctx: AgentContext);
    get name(): string;
    interpret(input: PlayActionInterpreterInput): Promise<PlayActionIntent>;
}
export declare class PlayWorldMutatorAgent extends BaseAgent {
    constructor(ctx: AgentContext);
    get name(): string;
    proposeMutation(input: PlayWorldMutatorInput): Promise<PlayMutation>;
}
export declare class PlaySceneRendererAgent extends BaseAgent {
    constructor(ctx: AgentContext);
    get name(): string;
    render(input: PlaySceneRenderInput & {
        readonly mode?: "open" | "guided";
    }): Promise<PlaySceneRender>;
}
export declare class PlaySceneReconcilerAgent extends BaseAgent {
    constructor(ctx: AgentContext);
    get name(): string;
    reconcile(input: PlaySceneReconcileInput): Promise<PlayMutationInput>;
}
export declare function buildSceneRendererSystemPrompt(mode?: "open" | "guided", language?: "zh" | "en"): string;
export {};
//# sourceMappingURL=play-agents.d.ts.map