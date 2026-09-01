export interface ForecastContextSections {
    readonly authorIntent: string;
    readonly currentFocus: string;
    readonly currentState: string;
    readonly pendingHooks: string;
    readonly storyFrame: string;
    readonly volumeMap: string;
    readonly recentChapterSummaries: string;
    readonly characterContext: string;
    readonly subplotBoard: string;
}
export interface ForecastContext {
    readonly bookId: string;
    readonly bookTitle: string;
    readonly language: "zh" | "en";
    readonly baseChapter: number;
    readonly contextFingerprint: string;
    readonly sections: ForecastContextSections;
}
export declare function buildForecastContext(params: {
    readonly bookDir: string;
    readonly bookId: string;
}): Promise<ForecastContext>;
/**
 * Content hash over the canonical forecast inputs (chapter count + every file
 * this builder feeds into the prompt). Deliberately mtime-free and
 * order-independent so copies, checkouts and CI runs produce identical
 * fingerprints for identical canon.
 */
export declare function computeContextFingerprint(input: {
    readonly baseChapter: number;
    readonly files: ReadonlyArray<readonly [string, string]>;
}): string;
export declare function renderForecastContextMarkdown(context: ForecastContext): string;
//# sourceMappingURL=context-builder.d.ts.map