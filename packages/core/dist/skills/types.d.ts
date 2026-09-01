import { z } from "zod";
export declare const AgentSkillSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    body: z.ZodDefault<z.ZodString>;
    source: z.ZodDefault<z.ZodEnum<["builtin", "project", "user", "external"]>>;
    baseDir: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    id: string;
    name: string;
    body: string;
    source: "user" | "builtin" | "project" | "external";
    description: string;
    baseDir?: string | undefined;
}, {
    id: string;
    name: string;
    description: string;
    body?: string | undefined;
    source?: "user" | "builtin" | "project" | "external" | undefined;
    baseDir?: string | undefined;
}>;
export type AgentSkill = z.infer<typeof AgentSkillSchema>;
export interface SkillResolutionInput {
    readonly requestedSkills?: ReadonlyArray<string>;
    readonly disabledSkills?: ReadonlyArray<string>;
}
export interface SkillResolutionResult {
    readonly usedSkills: ReadonlyArray<AgentSkill>;
    readonly forcedSkillIds: ReadonlyArray<string>;
    readonly missingSkillIds: ReadonlyArray<string>;
    readonly disabledSkillIds: ReadonlyArray<string>;
    readonly availableSkills: ReadonlyArray<AgentSkill>;
    readonly availableSkillIds: ReadonlyArray<string>;
}
export interface SkillRegistry {
    listSkills(): ReadonlyArray<AgentSkill>;
    getSkill(id: string): AgentSkill | undefined;
    resolveSkills(input: SkillResolutionInput): SkillResolutionResult;
}
//# sourceMappingURL=types.d.ts.map