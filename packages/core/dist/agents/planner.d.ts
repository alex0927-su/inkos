import { BaseAgent } from "./base.js";
import type { BookConfig } from "../models/book.js";
import type { LengthSpec } from "../models/length-governance.js";
import { type ChapterIntent, type ChapterMemo } from "../models/input-governance.js";
import type { StoredHook } from "../state/memory-db.js";
export interface PlanChapterInput {
    readonly book: BookConfig;
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly externalContext?: string;
}
export interface PlanChapterOutput {
    readonly intent: ChapterIntent;
    readonly memo: ChapterMemo;
    readonly intentMarkdown: string;
    readonly plannerInputs: ReadonlyArray<string>;
    readonly runtimePath: string;
}
/**
 * Phase 3 planner.
 *
 * Produces:
 *   - a simplified ChapterIntent (goal + outline + keep/avoid/style) —
 *     still deterministic, used for retrieval hints and the intent markdown.
 *   - a full ChapterMemo (plain markdown sections) via LLM call + strict
 *     parser.
 *
 * Retry policy: up to 3 attempts. Each failed parse appends an error
 * feedback block to the user message and re-invokes the LLM. If all attempts
 * fail, the planner emits a degraded but valid memo with an explicit warning
 * instead of crashing the whole chapter pipeline.
 */
export declare class PlannerAgent extends BaseAgent {
    get name(): string;
    planChapter(input: PlanChapterInput): Promise<PlanChapterOutput>;
    /**
     * Invoke the LLM to produce a 7-section memo and parse it. Retries up to
     * 3 times on parse failure, injecting the error message back into the user
     * prompt so the LLM can correct itself.
     */
    planChapterMemo(input: {
        readonly storyDir: string;
        readonly bookDir: string;
        readonly chapterNumber: number;
        readonly isGoldenOpening: boolean;
        readonly fallbackGoal: string;
        readonly chapterSummariesRaw: string;
        readonly previousEndingExcerpt?: string;
        readonly brief?: string;
        readonly chapterContext?: string;
        readonly relevantHooks?: ReadonlyArray<StoredHook>;
        readonly recyclableHooks?: ReadonlyArray<StoredHook>;
        readonly language?: "zh" | "en";
        readonly lengthSpec: LengthSpec;
    }): Promise<ChapterMemo>;
    private buildFallbackMemoMarkdown;
    private isGoldenOpeningChapter;
    private buildArcContext;
    private deriveGoal;
    private collectMustKeep;
    private collectMustAvoid;
    private collectStyleEmphasis;
    private extractFirstDirective;
    private extractListItems;
    private extractFocusGoal;
    private extractLocalOverrideGoal;
    private extractFocusStyleItems;
    private renderHookBudget;
    private extractSection;
    private normalizeHeading;
    private cleanListItem;
    private isTemplatePlaceholder;
    private containsChinese;
    private findOutlineNode;
    private cleanOutlineContent;
    private extractSectionAroundRange;
    private extractNumberedBeat;
    private findNextOutlineContent;
    private matchExactOutlineLine;
    private matchAnyExactOutlineLine;
    private matchRangeOutlineLine;
    private matchAnyRangeOutlineLine;
    private isOutlineAnchorLine;
    private isChapterWithinRange;
    private renderIntentMarkdown;
    private unique;
    private isChineseLanguage;
    protected readFileOrDefault(path: string): Promise<string>;
}
//# sourceMappingURL=planner.d.ts.map