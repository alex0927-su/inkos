import { BaseAgent } from "./base.js";
import type { BookConfig } from "../models/book.js";
import { type ChapterTrace, type ContextPackage, type RuleStack } from "../models/input-governance.js";
import type { PlanChapterOutput } from "./planner.js";
import { type MemorySemanticSelectionRequest, type MemorySemanticSelector } from "../utils/memory-retrieval.js";
import { type LLMClient } from "../llm/provider.js";
import type { ContextCompressionCallback } from "../models/context-compression.js";
import type { BookReferenceContextSelection, BookReferenceSelectionTask, ReferenceSectionSelectionRequest } from "../references/reference-context.js";
export interface ComposeChapterInput {
    readonly book: BookConfig;
    readonly bookDir: string;
    readonly chapterNumber: number;
    readonly plan: PlanChapterOutput;
    readonly contextBudget?: ContextBudget;
    readonly compressibleContextCompiler?: CompressibleContextCompiler;
    readonly outlineSectionSelector?: OutlineSectionSelector;
    readonly referenceContextProvider?: BookReferenceContextProvider;
    readonly memorySemanticSelector?: MemorySemanticSelector;
    readonly onContextCompression?: ContextCompressionCallback;
}
export type BookReferenceContextProvider = (request: BookReferenceSelectionTask) => Promise<BookReferenceContextSelection>;
export interface ContextBudget {
    readonly contextWindowTokens: number;
    readonly reservedOutputTokens: number;
}
export interface CompressibleContextCompileRequest {
    readonly chapterNumber: number;
    readonly goal: string;
    readonly language: "zh" | "en";
    readonly maxInputTokens: number;
    readonly protectedEntries: ContextPackage["selectedContext"];
    readonly compressibleEntries: ContextPackage["selectedContext"];
}
export type CompressibleContextCompiler = (request: CompressibleContextCompileRequest) => Promise<string>;
export interface OutlineSectionSelectionRequest {
    readonly fileName: string;
    readonly kind: "story-frame" | "volume-map";
    readonly chapterNumber: number;
    readonly goal: string;
    readonly outlineNode: string;
    readonly language: "zh" | "en";
    readonly candidates: ReadonlyArray<{
        readonly source: string;
        readonly heading: string;
        readonly excerpt: string;
    }>;
}
export type OutlineSectionSelector = (request: OutlineSectionSelectionRequest) => Promise<ReadonlyArray<string>>;
export interface ComposeChapterOutput {
    readonly contextPackage: ContextPackage;
    readonly ruleStack: RuleStack;
    readonly trace: ChapterTrace;
    readonly contextPath: string;
    readonly ruleStackPath: string;
    readonly tracePath: string;
}
export declare function composeGovernedChapter(input: ComposeChapterInput): Promise<ComposeChapterOutput>;
export declare class ComposerAgent extends BaseAgent {
    get name(): string;
    composeChapter(input: ComposeChapterInput): Promise<ComposeChapterOutput>;
    selectMemoryCandidates(request: MemorySemanticSelectionRequest): Promise<ReadonlyArray<string>>;
    selectOutlineSections(request: OutlineSectionSelectionRequest): Promise<ReadonlyArray<string>>;
    selectReferenceSections(request: ReferenceSectionSelectionRequest): Promise<ReadonlyArray<string>>;
    compileCompressibleContext(request: CompressibleContextCompileRequest): Promise<string>;
}
export declare function contextBudgetFromClient(client: LLMClient): ContextBudget | undefined;
//# sourceMappingURL=composer.d.ts.map