import { type TranslationTextChapter } from "./text.js";
import type { CreateTranslationProjectInput, TranslationSourceKind } from "./types.js";
export interface ExtractedTranslationSource {
    readonly title: string;
    readonly kind: TranslationSourceKind;
    readonly sourcePath: string;
    readonly charCount: number;
    readonly totalPages?: number;
    readonly chapters: ReadonlyArray<TranslationTextChapter>;
}
export declare function extractTranslationSource(projectRoot: string, input: CreateTranslationProjectInput): Promise<ExtractedTranslationSource>;
//# sourceMappingURL=source.d.ts.map