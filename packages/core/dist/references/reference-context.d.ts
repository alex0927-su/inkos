import type { ContextPackage } from "../models/input-governance.js";
export interface BookReferenceSelectionTask {
    readonly chapterNumber: number;
    readonly goal: string;
    readonly outlineNode: string;
    readonly mustKeep: ReadonlyArray<string>;
    readonly language: "zh" | "en";
}
export interface ReferenceSectionCandidate {
    readonly source: string;
    readonly materialId: string;
    readonly title: string;
    readonly heading: string;
    readonly uses: ReadonlyArray<string>;
    readonly note?: string;
}
export interface ReferenceSectionSelectionRequest extends BookReferenceSelectionTask {
    readonly candidates: ReadonlyArray<ReferenceSectionCandidate>;
}
export type ReferenceSectionSelector = (request: ReferenceSectionSelectionRequest) => Promise<ReadonlyArray<string>>;
export interface BookReferenceContextSelection {
    readonly entries: ContextPackage["selectedContext"];
    readonly notes: ReadonlyArray<string>;
}
export declare function selectBookReferenceContext(projectRoot: string, bookId: string, task: BookReferenceSelectionTask, selector: ReferenceSectionSelector): Promise<BookReferenceContextSelection>;
//# sourceMappingURL=reference-context.d.ts.map