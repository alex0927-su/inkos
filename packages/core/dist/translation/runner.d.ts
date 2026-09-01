import type { RunTranslationProjectResult, TranslationModelPort } from "./types.js";
export declare function runTranslationProject(projectRoot: string, projectId: string, options: {
    readonly model: TranslationModelPort;
    readonly batchSize?: number;
}): Promise<RunTranslationProjectResult>;
//# sourceMappingURL=runner.d.ts.map