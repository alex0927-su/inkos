export interface SpotFixPatch {
    readonly targetText: string;
    readonly replacementText: string;
}
export interface SpotFixPatchApplyResult {
    readonly applied: boolean;
    readonly revisedContent: string;
    readonly rejectedReason?: string;
    readonly appliedPatchCount: number;
    readonly skippedPatchCount: number;
    readonly touchedChars: number;
}
export declare function parseSpotFixPatches(raw: string): SpotFixPatch[];
/**
 * Apply patches to original content. Uses best-effort per-patch strategy:
 * - Try exact match first
 * - Fall back to fuzzy match (whitespace-normalized) if exact fails
 * - Skip individual patches that can't be matched instead of rejecting all
 */
export declare function applySpotFixPatches(original: string, patches: ReadonlyArray<SpotFixPatch>): SpotFixPatchApplyResult;
//# sourceMappingURL=spot-fix-patches.d.ts.map