import type { AgentMessage } from "@mariozechner/pi-agent-core";
import { type BookSession } from "./session.js";
import type { MessageEvent, SessionKind, TranscriptEvent } from "./session-transcript-schema.js";
export declare const TOOL_RESULT_BRIDGE_TEXT = "I have processed the tool results.";
export declare function appendRestoredHistoryBoundary(messages: AgentMessage[], language: string): AgentMessage[];
export declare function cleanRestoredAgentMessages(messages: AgentMessage[]): AgentMessage[];
interface TargetModelIdentity {
    readonly api?: unknown;
    readonly provider?: unknown;
    readonly id?: unknown;
    readonly compat?: unknown;
}
export declare function adaptRestoredAgentMessagesForModel(messages: AgentMessage[], target: TargetModelIdentity): AgentMessage[];
export declare function committedMessageEvents(events: TranscriptEvent[], sessionKind?: SessionKind): MessageEvent[];
export declare function restoreAgentMessagesFromTranscript(projectRoot: string, sessionId: string, sessionKind?: SessionKind): Promise<AgentMessage[]>;
export declare function deriveBookSessionFromTranscript(projectRoot: string, sessionId: string): Promise<BookSession | null>;
export {};
//# sourceMappingURL=session-transcript-restore.d.ts.map