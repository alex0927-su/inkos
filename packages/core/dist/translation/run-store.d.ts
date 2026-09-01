import type { TranslationChapterFile, TranslationGlossaryTerm, TranslationProjectManifest } from "./types.js";
export declare function translationProjectDir(projectRoot: string, projectId: string): string;
export declare function translationManifestPath(projectRoot: string, projectId: string): string;
export declare function loadTranslationManifest(projectRoot: string, projectId: string): Promise<TranslationProjectManifest>;
export declare function saveTranslationManifest(projectRoot: string, manifest: TranslationProjectManifest): Promise<void>;
export declare function loadTranslationChapter(projectRoot: string, chapterPath: string): Promise<TranslationChapterFile>;
export declare function saveTranslationChapter(projectRoot: string, chapterPath: string, chapter: TranslationChapterFile): Promise<void>;
export declare function loadTranslationGlossary(projectRoot: string, projectId: string): Promise<ReadonlyArray<TranslationGlossaryTerm>>;
export declare function saveTranslationGlossary(projectRoot: string, projectId: string, terms: ReadonlyArray<TranslationGlossaryTerm>): Promise<void>;
export declare function saveTranslationProgress(projectRoot: string, projectId: string, chapterPath: string, chapter: TranslationChapterFile, terms: ReadonlyArray<TranslationGlossaryTerm>): Promise<void>;
export declare function mergeGlossaryTerms(terms: ReadonlyArray<TranslationGlossaryTerm>): ReadonlyArray<TranslationGlossaryTerm>;
//# sourceMappingURL=run-store.d.ts.map