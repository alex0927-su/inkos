import type { TranslationExportFormat, TranslationExportResult } from "./types.js";
export declare function writeTranslationExport(projectRoot: string, projectId: string, options?: {
    readonly format?: TranslationExportFormat;
    readonly outputPath?: string;
}): Promise<TranslationExportResult>;
//# sourceMappingURL=export.d.ts.map