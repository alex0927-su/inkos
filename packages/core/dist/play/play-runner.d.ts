import type { AgentContext } from "../agents/base.js";
import { type PlayActionIntent, type PlayActionIntentInput, type PlayMutation, type PlayMutationInput } from "../models/play.js";
import { type PlaySceneRender } from "./play-agents.js";
import { type PlayReducerDB } from "./play-reducer.js";
import { PlayStore } from "./play-store.js";
export interface PlayActionInterpreterLike {
    readonly interpret: (input: {
        readonly input: string;
        readonly sceneBrief: string;
        readonly language?: "zh" | "en";
    }) => Promise<PlayActionIntentInput>;
}
export interface PlayWorldMutatorLike {
    readonly proposeMutation: (input: {
        readonly turn: number;
        readonly input: string;
        readonly action: PlayActionIntentInput;
        readonly context: string;
        readonly language?: "zh" | "en";
    }) => Promise<PlayMutationInput>;
}
export interface PlaySceneRendererLike {
    readonly render: (input: {
        readonly input: string;
        readonly action: PlayActionIntentInput;
        readonly context?: string;
        readonly mutationSummary: string;
        readonly stateBrief: string;
        readonly replayContext?: string;
        readonly mode?: "open" | "guided";
        readonly language?: "zh" | "en";
        readonly worldPremise?: string;
    }) => Promise<PlaySceneRender>;
}
export interface PlaySceneReconcilerLike {
    readonly reconcile: (input: {
        readonly turn: number;
        readonly input: string;
        readonly action: PlayActionIntentInput;
        readonly mutation: PlayMutationInput;
        readonly sceneText: string;
        readonly context: string;
        readonly stateBrief: string;
        readonly language?: "zh" | "en";
        readonly worldPremise?: string;
    }) => Promise<PlayMutationInput>;
}
export interface PlayRunnerOptions {
    readonly projectRoot: string;
    readonly worldId: string;
    readonly runId: string;
    readonly ctx?: AgentContext;
    readonly store?: PlayStore;
    readonly db?: PlayReducerDB;
    readonly agents?: {
        readonly actionInterpreter?: PlayActionInterpreterLike;
        readonly worldMutator?: PlayWorldMutatorLike;
        readonly sceneRenderer?: PlaySceneRendererLike;
        readonly sceneReconciler?: PlaySceneReconcilerLike;
    };
}
export interface PlayStepResult extends PlaySceneRender {
    readonly action: PlayActionIntent;
    readonly mutation: PlayMutation;
}
export interface PlayReplayResult extends PlayStepResult {
    readonly previousVariantId?: string;
    readonly variantId?: string;
    readonly replayedInput: string;
}
export interface PlayVariantRestoreResult {
    readonly turn: number;
    readonly variantId: string;
    readonly sceneText: string;
}
export interface PlayOpeningSeedResult {
    readonly mutation: PlayMutation;
}
export declare class PlayOpeningSeedError extends Error {
    constructor(message: string);
}
export declare class PlayRunner {
    private readonly options;
    private readonly store;
    private readonly db;
    private readonly ownsDb;
    private dbClosed;
    private readonly actionInterpreter;
    private readonly worldMutator;
    private readonly sceneRenderer;
    private readonly sceneReconciler;
    constructor(options: PlayRunnerOptions);
    /**
     * 关闭 runner 自己创建的数据库连接（外部传入的 db 由调用方负责关闭）。
     * SQLite 文件句柄不关闭时 Windows 上无法删除 play.db；node:sqlite 的
     * close 不允许二次调用，所以这里做幂等保护。
     */
    close(): void;
    seedOpening(input: {
        readonly sceneText: string;
        readonly suggestedActions?: readonly string[];
    }): Promise<PlayOpeningSeedResult | null>;
    step(input: string, options?: {
        readonly replayContext?: string;
    }): Promise<PlayStepResult>;
    private executeStep;
    private writeRunStatus;
    regenerateLastTurn(input?: string): Promise<PlayReplayResult>;
    restoreVariant(input: {
        readonly turn: number;
        readonly variantId: string;
    }): Promise<PlayVariantRestoreResult>;
    private buildContextBrief;
    private readOptionalProjection;
}
//# sourceMappingURL=play-runner.d.ts.map