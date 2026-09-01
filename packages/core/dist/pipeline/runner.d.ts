import type { LLMClient, OnStreamProgress } from "../llm/provider.js";
import type { Logger } from "../utils/logger.js";
import type { BookConfig, FanficMode, RevisionGate } from "../models/book.js";
import type { ChapterMeta } from "../models/chapter.js";
import type { NotifyChannel, LLMConfig, AgentLLMOverride } from "../models/project.js";
import { type ReviseMode } from "../agents/reviser.js";
import type { RadarSource } from "../agents/radar-source.js";
import { type AgentContext } from "../agents/base.js";
import type { AuditResult, AuditIssue } from "../agents/continuity.js";
import type { RadarResult } from "../agents/radar.js";
import type { LengthTelemetry } from "../models/length-governance.js";
import type { ChapterTrace } from "../models/input-governance.js";
import type { ContextCompressionCallback } from "../models/context-compression.js";
import { type LengthLanguage } from "../utils/length-metrics.js";
import type { ActivatedSkillGuidance } from "../agent/skill-tool.js";
interface ImportFoundationSourceOptions {
    readonly maxFullTextChars?: number;
    readonly edgeChapterCount?: number;
    readonly middleAnchorCount?: number;
}
/**
 * Build the architect external-context for a side-story (番外) foundation: frame
 * it as a companion work that reuses the parent canon's cast/world but tells an
 * independent side plot, and attach the parent canon as reference material.
 */
export declare function buildSpinoffFoundationContext(parentCanon: string, direction: string | undefined, language: "zh" | "en"): string;
export declare function buildImportFoundationSource(chapters: ReadonlyArray<{
    readonly title: string;
    readonly content: string;
}>, language: LengthLanguage, options?: ImportFoundationSourceOptions): string;
export interface PipelineConfig {
    readonly client: LLMClient;
    readonly model: string;
    readonly projectRoot: string;
    readonly defaultLLMConfig?: LLMConfig;
    readonly foundationReviewRetries?: number;
    readonly writingReviewRetries?: number;
    /**
     * "auto" (default): writeNextChapter runs the audit→revise loop inline.
     * "manual": stop right after the draft (no auto audit/revise) so review/revise
     * become explicit, user-driven checkpoint actions — chapter write stays fast.
     */
    readonly chapterReviewMode?: "auto" | "manual";
    /**
     * Gate for applying manual revisions (default "strict"):
     * - "strict": apply only when blocking/critical/AI-tell counts do not worsen
     *   AND at least one of blocking or AI-tell improves.
     * - "lenient": apply whenever the counts do not worsen (no improvement required).
     * - "always": always apply; audit counts are recorded but never block.
     */
    readonly revisionGate?: RevisionGate;
    readonly notifyChannels?: ReadonlyArray<NotifyChannel>;
    readonly radarSources?: ReadonlyArray<RadarSource>;
    readonly externalContext?: string;
    readonly modelOverrides?: Record<string, string | AgentLLMOverride>;
    readonly logger?: Logger;
    readonly onStreamProgress?: OnStreamProgress;
    readonly onContextCompression?: ContextCompressionCallback;
}
export interface TokenUsageSummary {
    readonly promptTokens: number;
    readonly completionTokens: number;
    readonly totalTokens: number;
}
export interface ChapterContextTraceSummary {
    readonly tracePath: string;
    readonly selectedSources: ReadonlyArray<string>;
    readonly protectedSources: ReadonlyArray<string>;
    readonly compressibleSources: ReadonlyArray<string>;
    readonly tokenBudget: ChapterTrace["tokenBudget"];
    readonly retrieval?: ChapterTrace["retrieval"];
    readonly compression?: ChapterTrace["compression"];
}
export interface ChapterPipelineResult {
    readonly chapterNumber: number;
    readonly title: string;
    readonly wordCount: number;
    readonly auditResult: AuditResult;
    readonly revised: boolean;
    readonly status: "ready-for-review" | "audit-failed" | "state-degraded";
    readonly lengthWarnings?: ReadonlyArray<string>;
    readonly lengthTelemetry?: LengthTelemetry;
    readonly tokenUsage?: TokenUsageSummary;
    readonly contextTrace?: ChapterContextTraceSummary;
}
export interface WriteChaptersOptions {
    readonly wordCount?: number;
    readonly temperatureOverride?: number;
    readonly externalContext?: string;
    readonly onChapterComplete?: (result: ChapterPipelineResult, completedCount: number, requestedCount: number) => void;
}
export interface DraftResult {
    readonly chapterNumber: number;
    readonly title: string;
    readonly wordCount: number;
    readonly filePath: string;
    readonly lengthWarnings?: ReadonlyArray<string>;
    readonly lengthTelemetry?: LengthTelemetry;
    readonly tokenUsage?: TokenUsageSummary;
}
export interface PlanChapterResult {
    readonly bookId: string;
    readonly chapterNumber: number;
    readonly intentPath: string;
    readonly goal: string;
    readonly conflicts: ReadonlyArray<string>;
}
export interface ComposeChapterResult extends PlanChapterResult {
    readonly contextPath: string;
    readonly ruleStackPath: string;
    readonly tracePath: string;
}
export interface ReviseResult {
    readonly chapterNumber: number;
    readonly wordCount: number;
    readonly fixedIssues: ReadonlyArray<string>;
    readonly applied: boolean;
    readonly status: "unchanged" | "ready-for-review" | "audit-failed";
    readonly auditPassed?: boolean;
    readonly auditIssues?: ReadonlyArray<{
        readonly severity: AuditIssue["severity"];
        readonly category: string;
        readonly description: string;
        readonly suggestion?: string;
    }>;
    readonly skippedReason?: string;
    readonly revisionDiagnostics?: {
        readonly standard: string;
        readonly before: {
            readonly blockingCount: number;
            readonly criticalCount: number;
            readonly aiTellCount: number;
        };
        readonly after: {
            readonly blockingCount: number;
            readonly criticalCount: number;
            readonly aiTellCount: number;
        };
        readonly remainingIssues: ReadonlyArray<{
            readonly severity: AuditIssue["severity"];
            readonly category: string;
            readonly description: string;
            readonly suggestion?: string;
        }>;
    };
    readonly lengthWarnings?: ReadonlyArray<string>;
    readonly lengthTelemetry?: LengthTelemetry;
}
export interface TruthFiles {
    readonly currentState: string;
    readonly particleLedger: string;
    readonly pendingHooks: string;
    readonly storyBible: string;
    readonly volumeOutline: string;
    readonly bookRules: string;
}
export interface BookStatusInfo {
    readonly bookId: string;
    readonly title: string;
    readonly genre: string;
    readonly platform: string;
    readonly status: string;
    readonly chaptersWritten: number;
    readonly totalWords: number;
    readonly nextChapter: number;
    readonly chapters: ReadonlyArray<ChapterMeta>;
}
export interface ImportChaptersInput {
    readonly bookId: string;
    readonly chapters: ReadonlyArray<{
        readonly title: string;
        readonly content: string;
    }>;
    readonly resumeFrom?: number;
    /** "continuation" (default) = pick up where the text left off, no new spacetime.
     *  "series" = shared universe but independent new story, requires new spacetime. */
    readonly importMode?: "continuation" | "series";
}
export interface ImportChaptersResult {
    readonly bookId: string;
    readonly importedCount: number;
    readonly totalWords: number;
    readonly nextChapter: number;
}
export interface InitBookOptions {
    readonly externalContext?: string;
    readonly authorIntent?: string;
    readonly currentFocus?: string;
}
export declare class PipelineRunner {
    private readonly state;
    private readonly config;
    private readonly agentClients;
    private readonly operationContext;
    constructor(config: PipelineConfig);
    runWithAbortSignal<T>(signal: AbortSignal | undefined, task: () => Promise<T>): Promise<T>;
    runWithAgentContext<T>(context: {
        readonly signal?: AbortSignal;
        readonly activatedSkills?: ReadonlyArray<ActivatedSkillGuidance>;
    }, task: () => Promise<T>): Promise<T>;
    private currentAbortSignal;
    private currentActivatedSkills;
    private throwIfOperationAborted;
    private localize;
    private resolveBookLanguage;
    private resolveBookLanguageById;
    private languageFromLengthSpec;
    private logStage;
    private logInfo;
    private logWarn;
    private tryGenerateStyleGuide;
    private generateAndReviewFoundation;
    private buildFoundationReviewFeedback;
    private agentCtx;
    private resolveOverride;
    private agentCtxFor;
    createAgentContext(agent: string, bookId?: string): AgentContext;
    private pathExists;
    private loadGenreProfile;
    runRadar(): Promise<RadarResult>;
    initBook(book: BookConfig, options?: InitBookOptions): Promise<void>;
    /**
     * Revise an existing book foundation without touching runtime chapter state.
     *
     * Legacy books read the flat foundation files as source. Phase 5+ books read
     * the authoritative outline/ and roles/ files instead of the compatibility
     * shims, otherwise large role/story details can be lost during rewrite.
     */
    reviseFoundation(bookId: string, feedback: string): Promise<void>;
    private copyDirShallow;
    private copyDirRecursive;
    /** Import external source material and generate fanfic_canon.md */
    importFanficCanon(bookId: string, sourceText: string, sourceName: string, fanficMode: FanficMode): Promise<string>;
    /** One-step fanfic book creation: create book + import canon + generate foundation */
    initFanficBook(book: BookConfig, sourceText: string, sourceName: string, fanficMode: FanficMode): Promise<void>;
    /**
     * Create a side-story (番外) book: a standalone companion that inherits a
     * parent book's world/characters via parent_canon.md, but tells an INDEPENDENT
     * side plot that does not advance or contradict the parent's main-line state.
     * Reuses importCanon (which already builds the parent-canon reference for
     * side-story writing) + the standard original-foundation architect path.
     */
    initSpinoffBook(book: BookConfig, parentBookId: string, direction?: string): Promise<void>;
    /**
     * Create an imitation (仿写) book: an ORIGINAL story whose prose imitates the
     * voice of a reference work. The architect builds an original foundation from
     * the user's story idea; the reference text becomes the book's style_guide.md
     * so the writer mimics its style. The style guide is mandatory here (imitation
     * is the whole point), so a failure to generate it surfaces rather than being
     * silently skipped.
     */
    initImitationBook(book: BookConfig, referenceText: string, storyIdea: string, sourceName?: string): Promise<void>;
    /** Write a single draft chapter. Saves chapter file + truth files + index + snapshot. */
    writeDraft(bookId: string, context?: string, wordCount?: number): Promise<DraftResult>;
    planChapter(bookId: string, context?: string): Promise<PlanChapterResult>;
    composeChapter(bookId: string, context?: string): Promise<ComposeChapterResult>;
    /** Audit the latest (or specified) chapter. Read-only, no lock needed. */
    auditDraft(bookId: string, chapterNumber?: number): Promise<AuditResult & {
        readonly chapterNumber: number;
    }>;
    /** Revise the latest (or specified) chapter based on audit issues. */
    reviseDraft(bookId: string, chapterNumber?: number, mode?: ReviseMode, externalContext?: string): Promise<ReviseResult>;
    /** Read all truth files for a book. */
    readTruthFiles(bookId: string): Promise<TruthFiles>;
    /** Get book status overview. */
    getBookStatus(bookId: string): Promise<BookStatusInfo>;
    writeNextChapter(bookId: string, wordCount?: number, temperatureOverride?: number, externalContext?: string): Promise<ChapterPipelineResult>;
    writeChapters(bookId: string, chapterCount: number, options?: WriteChaptersOptions): Promise<ReadonlyArray<ChapterPipelineResult>>;
    repairChapterState(bookId: string, chapterNumber?: number): Promise<ChapterPipelineResult>;
    resyncChapterArtifacts(bookId: string, chapterNumber?: number): Promise<ChapterPipelineResult>;
    resyncChapterStateAndAudit(bookId: string, chapterNumber?: number, options?: {
        readonly allowNewHooks?: boolean;
    }): Promise<{
        readonly chapter: ChapterPipelineResult;
        readonly audit: AuditResult & {
            readonly chapterNumber: number;
        };
    }>;
    private _writeNextChapterLocked;
    private _executeNextChapterLocked;
    private _repairChapterStateLocked;
    private _resyncChapterArtifactsLocked;
    /**
     * Generate a qualitative style guide from reference text via LLM.
     * Also saves the statistical style_profile.json.
     */
    generateStyleGuide(bookId: string, referenceText: string, sourceName?: string): Promise<string>;
    private buildDeterministicStyleGuide;
    /**
     * Import canon from parent book for spinoff writing.
     * Reads parent's truth files, uses LLM to generate parent_canon.md in target book.
     */
    importCanon(targetBookId: string, parentBookId: string): Promise<string>;
    private readParentChapterSample;
    /**
     * Import existing chapters into a book. Reverse-engineers all truth files
     * via sequential replay so the Writer and Auditor can continue naturally.
     *
     * Step 1: Generate foundation (story_frame, volume_map, book_rules) from all chapters.
     * Step 2: Sequentially replay each chapter through ChapterAnalyzer to build truth files.
     */
    importChapters(input: ImportChaptersInput): Promise<ImportChaptersResult>;
    private static addUsage;
    private buildPersistenceOutput;
    private assertNoPendingStateRepair;
    private prepareWriteInput;
    private resetImportReplayTruthFiles;
    private buildImportReplayStateSeed;
    private buildImportReplayHooksSeed;
    private assertChapterContentNotEmpty;
    private syncCurrentStateFactHistory;
    private syncLegacyStructuredStateFromMarkdown;
    private syncNarrativeMemoryIndex;
    private rebuildCurrentStateFactHistory;
    private rebuildNarrativeMemoryIndex;
    private withMemoryIndexRetry;
    private isMemoryIndexBusyError;
    private factKey;
    private buildLengthWarnings;
    private buildLengthTelemetry;
    private persistAuditDriftGuidance;
    private stripAuditDriftCorrectionBlock;
    private logLengthWarnings;
    private restoreLostAuditIssues;
    private restoreActionableAuditIfLost;
    private evaluateMergedAudit;
    private markBookActiveIfNeeded;
    private createGovernedArtifacts;
    private resolveGovernedPlan;
    private emitWebhook;
    private readChapterContent;
}
export {};
//# sourceMappingURL=runner.d.ts.map