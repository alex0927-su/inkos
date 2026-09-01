import type { AgentMessage } from "@mariozechner/pi-agent-core";
import { type TranscriptEvent } from "./session-transcript-schema.js";
import type { SessionKind } from "./session-transcript-schema.js";
export declare function sessionsDir(projectRoot: string): string;
export declare function transcriptPath(projectRoot: string, sessionId: string): string;
export declare function legacyBookSessionPath(projectRoot: string, sessionId: string): string;
export declare function readTranscriptEvents(projectRoot: string, sessionId: string): Promise<TranscriptEvent[]>;
export declare function nextTranscriptSeq(projectRoot: string, sessionId: string): Promise<number>;
export declare function appendTranscriptEvent(projectRoot: string, event: TranscriptEvent): Promise<void>;
export declare function appendTranscriptEvents(projectRoot: string, sessionId: string, buildEvents: (context: {
    readonly events: ReadonlyArray<TranscriptEvent>;
    readonly nextSeq: number;
}) => ReadonlyArray<TranscriptEvent> | Promise<ReadonlyArray<TranscriptEvent>>): Promise<TranscriptEvent[]>;
export declare function appendManualSessionMessages(projectRoot: string, sessionId: string, messages: ReadonlyArray<AgentMessage>, input?: string, options?: {
    readonly sessionKind?: SessionKind;
    readonly legacyDisplay?: {
        readonly thinking?: string;
        readonly toolExecutions?: readonly unknown[];
    };
}): Promise<void>;
//# sourceMappingURL=session-transcript.d.ts.map