import { AsyncLocalStorage } from "node:async_hooks";
import { createHash, randomUUID } from "node:crypto";
const trajectoryStorage = new AsyncLocalStorage();
export function opaqueConversationId(sessionId) {
    return `inkos-${createHash("sha256").update(sessionId).digest("hex").slice(0, 32)}`;
}
export function runWithAgentTrajectory(input, task) {
    return trajectoryStorage.run({ ...input, counter: { piTurn: 0 } }, task);
}
export function runWithAgentTrajectoryRole(agentRole, task, parentToolCallId) {
    const current = trajectoryStorage.getStore();
    if (!current)
        return task();
    return trajectoryStorage.run({
        ...current,
        agentRole,
        ...(parentToolCallId ? { parentToolCallId } : {}),
    }, task);
}
export function runAsWorkflowTrajectory(task) {
    const current = trajectoryStorage.getStore();
    if (!current || current.agentRole !== "main")
        return task();
    return runWithAgentTrajectoryRole("workflow", task);
}
export function beginAgentModelCall() {
    const current = trajectoryStorage.getStore();
    if (!current)
        return undefined;
    if (current.agentRole === "main") {
        current.counter.piTurn += 1;
    }
    return {
        conversationId: current.conversationId,
        runId: current.runId,
        modelCallId: randomUUID(),
        agentRole: current.agentRole,
        piTurnIndex: Math.max(current.counter.piTurn, 1),
        ...(current.parentToolCallId ? { parentToolCallId: current.parentToolCallId } : {}),
    };
}
export function isKkaiapiEndpoint(baseUrl) {
    if (!baseUrl)
        return false;
    try {
        const hostname = new URL(baseUrl).hostname.toLowerCase();
        return hostname === "kkaiapi.com" || hostname.endsWith(".kkaiapi.com");
    }
    catch {
        return false;
    }
}
export function agentTrajectoryHeaders(baseUrl, trace, clientAttempt, thinking) {
    if (!trace || !isKkaiapiEndpoint(baseUrl))
        return {};
    return {
        "X-InkOS-Trace-Version": "1",
        "X-InkOS-Scaffold": "pi-inkos",
        "X-InkOS-Conversation-ID": trace.conversationId,
        "X-InkOS-Run-ID": trace.runId,
        "X-InkOS-Model-Call-ID": trace.modelCallId,
        "X-InkOS-Agent-Role": trace.agentRole,
        "X-InkOS-Pi-Turn-Index": String(trace.piTurnIndex),
        "X-InkOS-Client-Attempt": String(clientAttempt),
        "X-InkOS-Thinking-Effort": thinking.effort,
        ...(thinking.budgetTokens !== undefined
            ? { "X-InkOS-Thinking-Budget-Tokens": String(thinking.budgetTokens) }
            : {}),
        ...(trace.parentToolCallId
            ? { "X-InkOS-Parent-Tool-Call-ID": trace.parentToolCallId }
            : {}),
    };
}
//# sourceMappingURL=agent-trajectory.js.map