import type { AgentSkill, SkillRegistry } from "./types.js";
export interface CreateSkillRegistryOptions {
    readonly skills?: ReadonlyArray<AgentSkill>;
}
export declare function createSkillRegistry(options?: CreateSkillRegistryOptions): SkillRegistry;
//# sourceMappingURL=registry.d.ts.map