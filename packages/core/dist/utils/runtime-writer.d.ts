import type { ChapterTrace, ContextPackage, RuleStack } from "../models/input-governance.js";
export interface RuntimeArtifactWriteResult {
    readonly contextPath: string;
    readonly ruleStackPath: string;
    readonly tracePath: string;
}
export declare function writeGovernedRuntimeArtifacts(params: {
    readonly runtimeDir: string;
    readonly chapterNumber: number;
    readonly contextPackage: ContextPackage;
    readonly ruleStack: RuleStack;
    readonly trace: ChapterTrace;
}): Promise<RuntimeArtifactWriteResult>;
//# sourceMappingURL=runtime-writer.d.ts.map