export type AgentTrajectoryRole = "main" | "subagent" | "workflow";
export interface AgentTrajectoryScopeInput {
    readonly conversationId: string;
    readonly runId: string;
    readonly agentRole: AgentTrajectoryRole;
    readonly parentToolCallId?: string;
}
export interface AgentModelCallTrace {
    readonly conversationId: string;
    readonly runId: string;
    readonly modelCallId: string;
    readonly agentRole: AgentTrajectoryRole;
    readonly piTurnIndex: number;
    readonly parentToolCallId?: string;
}
export interface ThinkingTrace {
    readonly effort: string;
    readonly budgetTokens?: number;
}
export declare function opaqueConversationId(sessionId: string): string;
export declare function runWithAgentTrajectory<T>(input: AgentTrajectoryScopeInput, task: () => T): T;
export declare function runWithAgentTrajectoryRole<T>(agentRole: AgentTrajectoryRole, task: () => T, parentToolCallId?: string): T;
export declare function runAsWorkflowTrajectory<T>(task: () => T): T;
export declare function beginAgentModelCall(): AgentModelCallTrace | undefined;
export declare function isKkaiapiEndpoint(baseUrl: string | undefined): boolean;
export declare function agentTrajectoryHeaders(baseUrl: string | undefined, trace: AgentModelCallTrace | undefined, clientAttempt: number, thinking: ThinkingTrace): Record<string, string>;
//# sourceMappingURL=agent-trajectory.d.ts.map