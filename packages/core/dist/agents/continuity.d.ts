import { BaseAgent } from "./base.js";
import type { ChapterMemo, ContextPackage, RuleStack } from "../models/input-governance.js";
export interface AuditResult {
    readonly passed: boolean;
    readonly issues: ReadonlyArray<AuditIssue>;
    readonly summary: string;
    /** True when the auditor response itself was not parseable; callers must not auto-revise content from this result. */
    readonly parseFailed?: boolean;
    /** 0-100 overall quality score. Present when the auditor supports scoring. */
    readonly overallScore?: number;
    readonly tokenUsage?: {
        readonly promptTokens: number;
        readonly completionTokens: number;
        readonly totalTokens: number;
    };
}
export interface AuditIssue {
    readonly severity: "critical" | "warning" | "info";
    readonly category: string;
    readonly description: string;
    readonly suggestion: string;
    readonly repairScope?: "local" | "structural" | "unknown";
}
export declare class ContinuityAuditor extends BaseAgent {
    get name(): string;
    auditChapter(bookDir: string, chapterContent: string, chapterNumber: number, genre?: string, options?: {
        temperature?: number;
        chapterIntent?: string;
        chapterMemo?: ChapterMemo;
        contextPackage?: ContextPackage;
        ruleStack?: RuleStack;
        truthFileOverrides?: {
            currentState?: string;
            ledger?: string;
            hooks?: string;
        };
    }): Promise<AuditResult>;
    private parseAuditResult;
    private buildReducedControlBlock;
    private extractBalancedJson;
    private tryParseAuditJson;
    private loadPreviousChapter;
    private readFileSafe;
}
//# sourceMappingURL=continuity.d.ts.map