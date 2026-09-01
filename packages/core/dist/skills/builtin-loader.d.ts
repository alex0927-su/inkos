import { type ExternalSkillDiagnostic, type LoadConfiguredAgentSkillsInput } from "./external-loader.js";
import type { AgentSkill } from "./types.js";
export interface LoadAvailableAgentSkillsResult {
    readonly skills: ReadonlyArray<AgentSkill>;
    readonly diagnostics: ReadonlyArray<ExternalSkillDiagnostic>;
}
export declare function loadBuiltinAgentSkills(builtinRoot?: string): Promise<LoadAvailableAgentSkillsResult>;
export declare function loadAvailableAgentSkills(input: LoadConfiguredAgentSkillsInput): Promise<LoadAvailableAgentSkillsResult>;
//# sourceMappingURL=builtin-loader.d.ts.map