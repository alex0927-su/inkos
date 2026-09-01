import type { ChapterTrace, ContextPackage, RuleStack } from "../models/input-governance.js";
import type { PlanChapterOutput } from "../agents/planner.js";
/**
 * Compose the per-chapter rule stack used by writer / continuity / reviser
 * prompts. Source names follow the Phase 5 layout (story_frame, volume_map,
 * roles/) and activeOverrides are derived from the planner's intent so the
 * "Governed Control Stack" block surfaces the actual gating in effect for
 * the current chapter — it used to be a static stub that ignored both
 * `plan` and `chapterNumber`.
 *
 * Phase hotfix 6 (Option A): make this honestly dynamic instead of deleting
 * it, because writer.ts (~L820/L900), continuity.ts (~L590), and
 * reviser.ts (~L600) all render ruleStack.sections / activeOverrides into
 * the model prompt. Removing the function would require a much larger
 * prompt refactor; making it real fixes the lie at the source.
 */
export declare function buildGovernedRuleStack(plan: PlanChapterOutput, chapterNumber: number): RuleStack;
export declare function buildGovernedTrace(params: {
    readonly chapterNumber: number;
    readonly plan: PlanChapterOutput;
    readonly contextPackage: ContextPackage;
    readonly composerInputs: ReadonlyArray<string>;
    readonly notes?: ReadonlyArray<string>;
    readonly promptPacks?: ReadonlyArray<string>;
    readonly compression?: ChapterTrace["compression"];
    readonly retrieval?: ChapterTrace["retrieval"];
}): ChapterTrace;
export declare function isProtectedContextSource(source: string): boolean;
//# sourceMappingURL=context-assembly.d.ts.map