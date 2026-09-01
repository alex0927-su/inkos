import type { SessionKind } from "../interaction/session.js";
import type { ActionSource, RequestedIntent } from "../interaction/action-envelope.js";
import type { SkillResolutionResult } from "../skills/index.js";
export interface AgentSystemPromptOptions {
    readonly actionSource?: ActionSource;
    readonly requestedIntent?: RequestedIntent;
    readonly playWorldExists?: boolean;
    readonly skills?: SkillResolutionResult;
    readonly allowIntentSkillSelection?: boolean;
}
export declare function buildAgentSystemPrompt(bookId: string | null, language: string, sessionKind?: SessionKind, options?: AgentSystemPromptOptions): string;
//# sourceMappingURL=agent-system-prompt.d.ts.map