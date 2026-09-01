import type { AgentMessage } from "@mariozechner/pi-agent-core";
import type { ContextCompressionCallback } from "../models/context-compression.js";
export declare function createBookContextTransform(bookId: string | null, projectRoot: string, options?: {
    readonly onContextCompression?: ContextCompressionCallback;
}): (messages: AgentMessage[], signal?: AbortSignal) => Promise<AgentMessage[]>;
/**
 * Inject the complete authoritative interactive-film graph for authoring turns.
 * Node ids, choices, conditions and effects are execution state, so silently
 * excerpting them would make edits unsafe. Context-window guards remain the
 * explicit failure boundary until semantic graph compaction is introduced.
 */
export declare function createInteractiveFilmContextTransform(projectId: string, projectRoot: string): (messages: AgentMessage[], signal?: AbortSignal) => Promise<AgentMessage[]>;
//# sourceMappingURL=context-transform.d.ts.map