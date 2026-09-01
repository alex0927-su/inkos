import type { LLMClient } from "../llm/provider.js";
import type { ActivatedSkillGuidance } from "../agent/skill-tool.js";
import { type StoryGraph } from "./graph-schema.js";
export interface GenerateStoryGraphInput {
    readonly projectId: string;
    readonly title: string;
    readonly premise: string;
}
export declare function generateStoryGraph(client: LLMClient, model: string, input: GenerateStoryGraphInput, options?: {
    readonly maxTokens?: number;
    readonly language?: "zh" | "en";
    readonly activatedSkills?: ReadonlyArray<ActivatedSkillGuidance>;
    readonly signal?: AbortSignal;
}): Promise<StoryGraph>;
//# sourceMappingURL=generate.d.ts.map