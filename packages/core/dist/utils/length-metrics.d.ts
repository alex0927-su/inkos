import type { LengthCountingMode, LengthSpec } from "../models/length-governance.js";
export type LengthLanguage = "zh" | "en";
export declare const DEFAULT_CHAPTER_LENGTH_ZH = 3000;
export declare const DEFAULT_CHAPTER_LENGTH_EN = 2000;
export declare function defaultChapterLength(language?: LengthLanguage): number;
export declare function countChapterLength(content: string, countingMode: LengthCountingMode): number;
export declare function resolveLengthCountingMode(language?: LengthLanguage): LengthCountingMode;
export declare function formatLengthCount(count: number, countingMode: LengthCountingMode): string;
export declare function buildLengthSpec(target: number, language?: LengthLanguage): LengthSpec;
export declare function isOutsideSoftRange(count: number, spec: Pick<LengthSpec, "softMin" | "softMax">): boolean;
export declare function isOutsideHardRange(count: number, spec: Pick<LengthSpec, "hardMin" | "hardMax">): boolean;
//# sourceMappingURL=length-metrics.d.ts.map