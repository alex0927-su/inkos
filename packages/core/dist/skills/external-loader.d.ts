import { type AgentSkill } from "./types.js";
export interface LoadExternalAgentSkillsInput {
    readonly externalDirs: ReadonlyArray<string>;
    readonly source?: AgentSkill["source"];
}
export interface ExternalSkillDiagnostic {
    readonly path: string;
    readonly message: string;
}
export interface LoadExternalAgentSkillsResult {
    readonly skills: ReadonlyArray<AgentSkill>;
    readonly diagnostics: ReadonlyArray<ExternalSkillDiagnostic>;
}
export interface LoadConfiguredAgentSkillsInput {
    readonly projectRoot: string;
    readonly env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
    readonly homeDir?: string;
}
export interface ParseAgentSkillDocumentOptions {
    readonly skillPath: string;
    readonly source?: AgentSkill["source"];
}
export declare function loadExternalAgentSkills(input: LoadExternalAgentSkillsInput): Promise<LoadExternalAgentSkillsResult>;
export declare function loadConfiguredAgentSkills(input: LoadConfiguredAgentSkillsInput): Promise<LoadExternalAgentSkillsResult>;
export declare function parseAgentSkillDocument(raw: string, options: ParseAgentSkillDocumentOptions): AgentSkill;
//# sourceMappingURL=external-loader.d.ts.map