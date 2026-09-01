import { BaseAgent } from "./base.js";
import type { BookConfig, FanficMode } from "../models/book.js";
export interface ArchitectRole {
    readonly tier: "major" | "minor";
    readonly name: string;
    readonly content: string;
}
export interface ArchitectOutput {
    readonly storyBible: string;
    readonly volumeOutline: string;
    readonly bookRules: string;
    readonly currentState: string;
    readonly pendingHooks: string;
    readonly storyFrame?: string;
    readonly volumeMap?: string;
    readonly rhythmPrinciples?: string;
    readonly roles?: ReadonlyArray<ArchitectRole>;
}
export declare class ArchitectIncompleteFoundationError extends Error {
    readonly missing: readonly string[];
    readonly partialContent: string;
    constructor(missing: readonly string[], partialContent: string, message?: string);
}
export declare class ArchitectAgent extends BaseAgent {
    get name(): string;
    generateFoundation(book: BookConfig, externalContext?: string, reviewFeedback?: string, options?: {
        reviseFrom?: {
            storyBible: string;
            volumeOutline: string;
            bookRules: string;
            characterMatrix: string;
            userFeedback: string;
        };
    }): Promise<ArchitectOutput>;
    private buildRevisePrompt;
    private buildChineseFoundationPrompt;
    private buildEnglishFoundationPrompt;
    private parseSectionsWithRepair;
    private repairMissingSections;
    private parseSections;
    private parseArchitectSectionMap;
    private sliceArchitectSections;
    /**
     * Parse ---ROLE---...---CONTENT---... blocks from the roles section.
     * Drops malformed entries silently — this is prose the LLM produced,
     * not machine input.
     */
    private parseRoles;
    private buildStoryBibleShim;
    private buildCharacterMatrixShim;
    writeFoundationFiles(bookDir: string, output: ArchitectOutput, _numericalSystem?: boolean, language?: "zh" | "en", mode?: "init" | "revise"): Promise<void>;
    /**
     * Reverse-engineer foundation from existing chapters.
     */
    generateFoundationFromImport(book: BookConfig, chaptersText: string, externalContext?: string, reviewFeedback?: string, options?: {
        readonly importMode?: "continuation" | "series";
    }): Promise<ArchitectOutput>;
    generateFanficFoundation(book: BookConfig, fanficCanon: string, fanficMode: FanficMode, reviewFeedback?: string): Promise<ArchitectOutput>;
    private buildReviewFeedbackBlock;
    private normalizeSectionName;
    private canonicalSectionNameFromHeading;
    private stripTrailingAssistantCoda;
    private normalizePendingHooksSection;
    /**
     * Parse `第N卷 (A-B章)` / `Volume N (chapters A-B)` headers from the
     * architect's volume_map prose. Best-effort: missing / unparseable blocks
     * return an empty list and cross-volume promotion simply never fires.
     */
    private parseVolumeBoundariesForPromotion;
    private normalizeDormantSeedStatus;
    private parseHookChapterNumber;
    private parseDependsOnCell;
    private parseBooleanCell;
    private parseOptionalInt;
    private hasNarrativeProgress;
    private mergeHookNotes;
}
//# sourceMappingURL=architect.d.ts.map