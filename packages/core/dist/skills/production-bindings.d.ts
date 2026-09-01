import type { ActivatedSkillGuidance } from "../agent/skill-tool.js";
import type { AgentSkill } from "./types.js";
export declare const PRODUCTION_SKILL_IDS: {
    readonly longWriting: readonly ["inkos-long-writing"];
    readonly longReview: readonly ["inkos-long-writing", "inkos-story-review"];
    readonly shortWriting: readonly ["inkos-short-writing"];
    readonly play: readonly ["inkos-play-world"];
    readonly script: readonly ["inkos-script-writing"];
    readonly storyboard: readonly ["inkos-storyboard"];
    readonly interactiveFilm: readonly ["inkos-interactive-film"];
    readonly translation: readonly ["inkos-translation"];
};
export type ProductionSkillCapability = keyof typeof PRODUCTION_SKILL_IDS;
export declare const NON_LONG_PRODUCTION_CAPABILITIES: readonly ["shortWriting", "play", "script", "storyboard", "interactiveFilm", "translation"];
export declare function resolveProductionSkillActivations(availableSkills: ReadonlyArray<AgentSkill>, capability: ProductionSkillCapability): ActivatedSkillGuidance[];
export declare function mergeActivatedSkillGuidance(...groups: ReadonlyArray<ReadonlyArray<ActivatedSkillGuidance>>): ActivatedSkillGuidance[];
export declare function activatedSkillIds(activations: ReadonlyArray<ActivatedSkillGuidance>): string[];
//# sourceMappingURL=production-bindings.d.ts.map