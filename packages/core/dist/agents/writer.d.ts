import { BaseAgent } from "./base.js";
import type { BookConfig } from "../models/book.js";
import { type PostWriteViolation } from "./post-write-validator.js";
import type { ChapterIntent, ChapterMemo, ContextPackage, RuleStack } from "../models/input-governance.js";
import type { LengthSpec } from "../models/length-governance.js";
import type { RuntimeStateDelta } from "../models/runtime-state.js";
import type { RuntimeStateSnapshot } from "../state/state-reducer.js";
export interface WriteChapterInput {
    readonly book: BookConfig;
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly externalContext?: string;
    readonly chapterIntent: string;
    readonly chapterMemo: ChapterMemo;
    readonly chapterIntentData?: ChapterIntent;
    readonly contextPackage: ContextPackage;
    readonly ruleStack: RuleStack;
    readonly lengthSpec?: LengthSpec;
    readonly wordCountOverride?: number;
    readonly temperatureOverride?: number;
}
export interface SettleChapterStateInput {
    readonly book: BookConfig;
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly title: string;
    readonly content: string;
    readonly allowReapply?: boolean;
    readonly allowNewHooks?: boolean;
    readonly baselineChapter?: number;
    readonly chapterIntent?: string;
    readonly contextPackage?: ContextPackage;
    readonly ruleStack?: RuleStack;
    readonly validationFeedback?: string;
}
export interface TokenUsage {
    readonly promptTokens: number;
    readonly completionTokens: number;
    readonly totalTokens: number;
}
export interface WriteChapterOutput {
    readonly chapterNumber: number;
    readonly title: string;
    readonly content: string;
    readonly wordCount: number;
    readonly preWriteCheck: string;
    readonly postSettlement: string;
    readonly runtimeStateDelta?: RuntimeStateDelta;
    readonly runtimeStateSnapshot?: RuntimeStateSnapshot;
    readonly updatedState: string;
    readonly updatedLedger: string;
    readonly updatedHooks: string;
    readonly chapterSummary: string;
    readonly updatedChapterSummaries?: string;
    readonly updatedSubplots: string;
    readonly updatedEmotionalArcs: string;
    readonly updatedCharacterMatrix: string;
    readonly postWriteErrors: ReadonlyArray<PostWriteViolation>;
    readonly postWriteWarnings: ReadonlyArray<PostWriteViolation>;
    readonly hookHealthIssues?: ReadonlyArray<{
        readonly severity: "critical" | "warning" | "info";
        readonly category: string;
        readonly description: string;
        readonly suggestion: string;
    }>;
    readonly tokenUsage?: TokenUsage;
}
export declare class WriterAgent extends BaseAgent {
    get name(): string;
    private localize;
    private logInfo;
    private logWarn;
    writeChapter(input: WriteChapterInput): Promise<WriteChapterOutput>;
    settleChapterState(input: SettleChapterStateInput): Promise<WriteChapterOutput>;
    private settle;
    saveChapter(bookDir: string, output: WriteChapterOutput, numericalSystem?: boolean, language?: "zh" | "en"): Promise<void>;
    private buildGovernedUserPrompt;
    private buildChapterContextBlock;
    private joinGovernedEvidenceBlocks;
    private buildSettlerGovernedControlBlock;
    /**
     * Soft-check that the LLM's PRE_WRITE_CHECK output references the three
     * non-negotiable memo sections: 当前任务, 不要做, 章尾必须发生的改变.
     *
     * This is NOT a hard gate — the memo was already parse-validated in the
     * planner, and the writer prompt already tells the LLM to align to memo.
     * We only warn when the LLM skipped a section, so the chapter still ships.
     */
    private verifyPreWriteCheckAlignsWithMemo;
    private buildLengthRequirementBlock;
    private loadRecentChapters;
    private readFileOrDefault;
    private readSnapshotCharacterContext;
    private renderDeltaSummaryRow;
    private normalizeRuntimeStateDeltaChapter;
    private buildRuntimeStateArtifactsIfPresent;
    private resolveRuntimeStateArtifactsForOutput;
    private renderAppendedChapterSummary;
    private buildStyleFingerprint;
    private sanitizeFilename;
}
//# sourceMappingURL=writer.d.ts.map