import type { LLMClient } from "../llm/provider.js";
import type { ActivatedSkillGuidance } from "../agent/skill-tool.js";
import type { TranslationModelPort } from "./types.js";
export declare function createLLMTranslationModel(input: {
    readonly client: LLMClient;
    readonly model: string;
    readonly maxTokens?: number;
    readonly activatedSkills?: ReadonlyArray<ActivatedSkillGuidance>;
    readonly signal?: AbortSignal;
}): TranslationModelPort;
//# sourceMappingURL=llm-model.d.ts.map