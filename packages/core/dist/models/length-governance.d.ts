import { z } from "zod";
export declare const LengthCountingModeSchema: z.ZodEnum<["zh_chars", "en_words"]>;
export type LengthCountingMode = z.infer<typeof LengthCountingModeSchema>;
export declare const LengthSpecSchema: z.ZodObject<{
    target: z.ZodNumber;
    softMin: z.ZodNumber;
    softMax: z.ZodNumber;
    hardMin: z.ZodNumber;
    hardMax: z.ZodNumber;
    countingMode: z.ZodEnum<["zh_chars", "en_words"]>;
}, "strip", z.ZodTypeAny, {
    target: number;
    softMin: number;
    softMax: number;
    hardMin: number;
    hardMax: number;
    countingMode: "zh_chars" | "en_words";
}, {
    target: number;
    softMin: number;
    softMax: number;
    hardMin: number;
    hardMax: number;
    countingMode: "zh_chars" | "en_words";
}>;
export type LengthSpec = z.infer<typeof LengthSpecSchema>;
export declare const LengthTelemetrySchema: z.ZodObject<{
    target: z.ZodNumber;
    softMin: z.ZodNumber;
    softMax: z.ZodNumber;
    hardMin: z.ZodNumber;
    hardMax: z.ZodNumber;
    countingMode: z.ZodEnum<["zh_chars", "en_words"]>;
    writerCount: z.ZodNumber;
    postReviseCount: z.ZodNumber;
    finalCount: z.ZodNumber;
    repairApplied: z.ZodBoolean;
    lengthWarning: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    target: number;
    softMin: number;
    softMax: number;
    hardMin: number;
    hardMax: number;
    countingMode: "zh_chars" | "en_words";
    writerCount: number;
    postReviseCount: number;
    finalCount: number;
    repairApplied: boolean;
    lengthWarning: boolean;
}, {
    target: number;
    softMin: number;
    softMax: number;
    hardMin: number;
    hardMax: number;
    countingMode: "zh_chars" | "en_words";
    writerCount: number;
    postReviseCount: number;
    finalCount: number;
    repairApplied: boolean;
    lengthWarning: boolean;
}>;
export type LengthTelemetry = z.infer<typeof LengthTelemetrySchema>;
export declare const LengthWarningSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    target: z.ZodNumber;
    actual: z.ZodNumber;
    countingMode: z.ZodEnum<["zh_chars", "en_words"]>;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    target: number;
    countingMode: "zh_chars" | "en_words";
    chapter: number;
    actual: number;
    reason: string;
}, {
    target: number;
    countingMode: "zh_chars" | "en_words";
    chapter: number;
    actual: number;
    reason: string;
}>;
export type LengthWarning = z.infer<typeof LengthWarningSchema>;
//# sourceMappingURL=length-governance.d.ts.map