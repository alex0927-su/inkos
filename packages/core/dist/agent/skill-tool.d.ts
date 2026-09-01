import type { AgentMessage, AgentTool } from "@mariozechner/pi-agent-core";
import type { AgentSkill, SkillRegistry } from "../skills/index.js";
declare const UseSkillParams: import("@sinclair/typebox").TObject<{
    skillId: import("@sinclair/typebox").TString;
    resourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    query: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export interface CreateUseSkillToolOptions {
    readonly registry: SkillRegistry;
    readonly disabledSkillIds?: ReadonlyArray<string>;
    readonly onActivate?: (activation: ActivatedSkillGuidance) => void;
}
export interface ActivatedSkillResource {
    readonly path: string;
    readonly heading?: string;
    readonly body: string;
    readonly charStart: number;
    readonly charEnd: number;
}
export interface ActivatedSkillGuidance {
    readonly skill: AgentSkill;
    readonly resources: ReadonlyArray<ActivatedSkillResource>;
}
export declare function createUseSkillTool(options: CreateUseSkillToolOptions): AgentTool<typeof UseSkillParams>;
export declare function retrieveSkillResources(skillId: string, baseDir: string, query: string, limit?: number): Promise<{
    path: string;
    heading: string;
    body: string;
    charStart: number;
    charEnd: number;
    score: number;
}[]>;
/**
 * Production workers receive the skill itself from the host. Resolve the
 * relevant static reference sections from the actual task text just before a
 * model call, instead of copying large craft prompts into every pipeline.
 */
export declare function hydrateActivatedSkillGuidance(activations: ReadonlyArray<ActivatedSkillGuidance> | undefined, query: string): Promise<ReadonlyArray<ActivatedSkillGuidance> | undefined>;
export declare function assistantInvokesSkill(message: AgentMessage): boolean;
export declare function sanitizeSkillTurnMessage(message: AgentMessage, stripThinking: boolean): AgentMessage;
export {};
//# sourceMappingURL=skill-tool.d.ts.map