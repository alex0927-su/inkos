import { BaseAgent } from "./base.js";
import type { ChapterMemo } from "../models/input-governance.js";
export interface PolishChapterInput {
    readonly chapterContent: string;
    readonly chapterNumber: number;
    readonly chapterMemo?: ChapterMemo;
    readonly language?: "zh" | "en";
    readonly temperature?: number;
}
export interface PolishChapterOutput {
    readonly polishedContent: string;
    readonly changed: boolean;
    readonly tokenUsage?: {
        readonly promptTokens: number;
        readonly completionTokens: number;
        readonly totalTokens: number;
    };
}
/**
 * File-layer polisher — runs AFTER the reviewer+reviser cycle accepts the
 * chapter's structure. Polisher ONLY touches prose surface: sentence craft,
 * paragraph shape, wording, punctuation, five-sense immersion, dialogue
 * naturalness. It is forbidden from changing plot, character, or mainline.
 *
 * If a structural/plot issue is found, the polisher marks it in a comment
 * line (`[polisher-note] ...`) for the next reviewer iteration and leaves
 * the prose untouched — it does NOT attempt to rewrite across that boundary.
 */
export declare class PolisherAgent extends BaseAgent {
    get name(): string;
    polishChapter(input: PolishChapterInput): Promise<PolishChapterOutput>;
}
//# sourceMappingURL=polisher.d.ts.map