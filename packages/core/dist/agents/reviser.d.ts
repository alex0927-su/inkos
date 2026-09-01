import { BaseAgent } from "./base.js";
import type { LengthSpec } from "../models/length-governance.js";
import type { AuditIssue } from "./continuity.js";
import type { ChapterIntent, ChapterMemo, ContextPackage, RuleStack } from "../models/input-governance.js";
export type ReviseMode = "auto" | "polish" | "rewrite" | "rework" | "anti-detect" | "spot-fix";
export declare const DEFAULT_REVISE_MODE: ReviseMode;
export interface ReviseOutput {
    readonly revisedContent: string;
    readonly wordCount: number;
    readonly fixedIssues: ReadonlyArray<string>;
    readonly tokenUsage?: {
        readonly promptTokens: number;
        readonly completionTokens: number;
        readonly totalTokens: number;
    };
}
export declare class ReviserAgent extends BaseAgent {
    get name(): string;
    reviseChapter(bookDir: string, chapterContent: string, chapterNumber: number, issues: ReadonlyArray<AuditIssue>, mode?: ReviseMode, genre?: string, options?: {
        chapterIntent?: string;
        chapterMemo?: ChapterMemo;
        chapterIntentData?: ChapterIntent;
        contextPackage?: ContextPackage;
        ruleStack?: RuleStack;
        lengthSpec?: LengthSpec;
        baselineChapter?: number;
    }): Promise<ReviseOutput>;
    private parseOutput;
    private buildAutoSystemPrompt;
    private buildLegacySystemPrompt;
    private readFileSafe;
    private readSnapshotCharacterContext;
    private buildReducedControlBlock;
}
//# sourceMappingURL=reviser.d.ts.map