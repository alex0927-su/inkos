import type { AgentEvent, AgentMessage } from "@mariozechner/pi-agent-core";
import type { Model, Api } from "@mariozechner/pi-ai";
import type { PipelineRunner } from "../pipeline/runner.js";
import type { PlayMode, SessionKind } from "../interaction/session.js";
import type { ActionPayload, ActionSource, RequestedIntent } from "../interaction/action-envelope.js";
import type { ContextCompressionCallback } from "../models/context-compression.js";
export interface AgentSessionConfig {
    /** Unique session identifier (typically the BookSession id). */
    sessionId: string;
    /** Book ID, or null if in "new book" mode. */
    bookId: string | null;
    /** Studio conversation surface. Used to narrow the visible tools. */
    sessionKind?: SessionKind;
    /** Play interaction mode chosen by the player at launch (guided = choice-only, open = free text). */
    playMode?: PlayMode;
    /** Where this turn came from. Button/slash turns can execute confirmed production actions. */
    actionSource?: ActionSource;
    /** Explicit user-confirmed action requested by the UI/command surface. */
    requestedIntent?: RequestedIntent;
    /** Structured execution arguments confirmed by the UI/command surface. */
    actionPayload?: ActionPayload;
    /** User/UI-forced Agent Skills for this turn, e.g. @open-world-play. */
    requestedSkills?: ReadonlyArray<string>;
    /** Agent Skills explicitly disabled for this turn. */
    disabledSkills?: ReadonlyArray<string>;
    /** Language for the system prompt. */
    language: string;
    /** PipelineRunner for sub-agent tool delegation. */
    pipeline: PipelineRunner;
    /** Project root directory (books/ lives under this). */
    projectRoot: string;
    /** pi-ai Model to use, or provider+modelId to resolve via getModel. */
    model: Model<Api> | {
        provider: string;
        modelId: string;
    };
    /** Optional API key. When omitted, falls back to env-based key lookup. */
    apiKey?: string;
    /** Allow the read tool to read absolute paths outside projectRoot/books. Defaults to false; set INKOS_AGENT_ALLOW_SYSTEM_READ=1 to enable. */
    allowSystemFileRead?: boolean;
    /** Optional listener for streaming events (for SSE forwarding). */
    onEvent?: (event: AgentEvent) => void;
    /** Optional listener for context compression lifecycle events. */
    onContextCompression?: ContextCompressionCallback;
    /** Attachments uploaded with this user turn. Text is injected as protected user context; images use pi-ai ImageContent. */
    attachments?: ReadonlyArray<AgentSessionAttachment>;
    /**
     * Status block for a production task running in the background of this session
     * (e.g. a confirmed short-fiction run). Appended to the system prompt so the
     * agent can answer progress questions instead of claiming nothing is running.
     * Changing this value evicts the cached Agent so the prompt stays current.
     */
    backgroundTaskContext?: string;
    /**
     * Remove book/artifact-mutating production tools from this turn's tool table
     * (a confirmed production task is already running in this session, so a
     * parallel chat turn must not mutate the same book concurrently). Read-style
     * tools, research/material tools, and propose_action stay available —
     * confirmed actions started via propose_action are gated host-side anyway.
     * Changing this value evicts the cached Agent so the tool table stays current.
     */
    suppressProductionTools?: boolean;
}
export interface AgentSessionResult {
    /** Extracted text from the final assistant message. */
    responseText: string;
    /** Full raw Agent conversation history. */
    messages: AgentMessage[];
    /** Upstream model error surfaced by pi-agent-core, if the final assistant turn failed. */
    errorMessage?: string;
}
export interface AgentSessionAttachment {
    readonly id: string;
    readonly filename: string;
    readonly mimeType: string;
    readonly size: number;
    readonly storedPath?: string;
    readonly text?: string;
    readonly image?: {
        readonly data: string;
        readonly mimeType: string;
    };
}
export declare function isTerminalProductionToolName(toolName: unknown): boolean;
/**
 * Run a single conversation turn within a cached Agent session.
 *
 * If the session already exists in the cache, reuses the Agent (with its full
 * in-memory message history including tool calls). Otherwise creates a new
 * Agent, optionally restoring messages from `initialMessages`.
 */
export declare function runAgentSession(config: AgentSessionConfig, userMessage: string, initialMessages?: Array<{
    role: string;
    content: string;
}>): Promise<AgentSessionResult>;
/** Manually evict a cached Agent session. */
export declare function evictAgentCache(sessionId: string): boolean;
/** Abort an active cached pi-agent session and evict it from cache. */
export declare function abortAgentSession(projectRoot: string, sessionId: string): boolean;
//# sourceMappingURL=agent-session.d.ts.map