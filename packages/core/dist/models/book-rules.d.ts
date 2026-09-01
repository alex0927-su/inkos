import { z } from "zod";
export declare const BookRulesSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    protagonist: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        personalityLock: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        behavioralConstraints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        personalityLock: string[];
        behavioralConstraints: string[];
    }, {
        name: string;
        personalityLock?: string[] | undefined;
        behavioralConstraints?: string[] | undefined;
    }>>;
    genreLock: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        forbidden: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        forbidden: string[];
    }, {
        primary: string;
        forbidden?: string[] | undefined;
    }>>;
    narrativePerson: z.ZodCatch<z.ZodOptional<z.ZodEnum<["first", "third"]>>>;
    numericalSystemOverrides: z.ZodOptional<z.ZodObject<{
        hardCap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        resourceTypes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        resourceTypes: string[];
        hardCap?: string | number | undefined;
    }, {
        hardCap?: string | number | undefined;
        resourceTypes?: string[] | undefined;
    }>>;
    eraConstraints: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        period: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        period?: string | undefined;
        region?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        period?: string | undefined;
        region?: string | undefined;
    }>>;
    prohibitions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    chapterTypesOverride: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    fatigueWordsOverride: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    additionalAuditDimensions: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">>;
    enableFullCastTracking: z.ZodDefault<z.ZodBoolean>;
    fanficMode: z.ZodOptional<z.ZodEnum<["canon", "au", "ooc", "cp"]>>;
    allowedDeviations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    version: string;
    prohibitions: string[];
    chapterTypesOverride: string[];
    fatigueWordsOverride: string[];
    additionalAuditDimensions: (string | number)[];
    enableFullCastTracking: boolean;
    allowedDeviations: string[];
    fanficMode?: "canon" | "au" | "ooc" | "cp" | undefined;
    protagonist?: {
        name: string;
        personalityLock: string[];
        behavioralConstraints: string[];
    } | undefined;
    genreLock?: {
        primary: string;
        forbidden: string[];
    } | undefined;
    narrativePerson?: "first" | "third" | undefined;
    numericalSystemOverrides?: {
        resourceTypes: string[];
        hardCap?: string | number | undefined;
    } | undefined;
    eraConstraints?: {
        enabled: boolean;
        period?: string | undefined;
        region?: string | undefined;
    } | undefined;
}, {
    fanficMode?: "canon" | "au" | "ooc" | "cp" | undefined;
    version?: string | undefined;
    protagonist?: {
        name: string;
        personalityLock?: string[] | undefined;
        behavioralConstraints?: string[] | undefined;
    } | undefined;
    genreLock?: {
        primary: string;
        forbidden?: string[] | undefined;
    } | undefined;
    narrativePerson?: unknown;
    numericalSystemOverrides?: {
        hardCap?: string | number | undefined;
        resourceTypes?: string[] | undefined;
    } | undefined;
    eraConstraints?: {
        enabled?: boolean | undefined;
        period?: string | undefined;
        region?: string | undefined;
    } | undefined;
    prohibitions?: string[] | undefined;
    chapterTypesOverride?: string[] | undefined;
    fatigueWordsOverride?: string[] | undefined;
    additionalAuditDimensions?: (string | number)[] | undefined;
    enableFullCastTracking?: boolean | undefined;
    allowedDeviations?: string[] | undefined;
}>;
export type BookRules = z.infer<typeof BookRulesSchema>;
export interface ParsedBookRules {
    readonly rules: BookRules;
    readonly body: string;
}
/**
 * Legacy Phase 5 books may still contain a compat pointer instead of real
 * rules. Detect that shim so callers can fall back to old story_frame
 * frontmatter instead of treating the pointer as legitimate empty rules.
 *
 * Markers (must match buildBookRulesShim() in architect.ts):
 *   - 本书规则（兼容指针——已废弃） / Book Rules (compat pointer — deprecated)
 *   - 本文件仅为外部读取保留 / This file is kept for external readers only
 */
export declare function isBookRulesShim(raw: string): boolean;
export declare function parseBookRules(raw: string): ParsedBookRules | null;
/**
 * Stricter variant of parseBookRules: returns null if the input has no valid
 * YAML frontmatter OR if the frontmatter fails to parse / validate. Unlike
 * parseBookRules, this never falls back to default rules — callers can use
 * the null return to trigger their own fallback (e.g. legacy book_rules.md).
 *
 * Phase 5 hotfix 3: readBookRules() uses this to detect a broken YAML block
 * on story_frame.md and fall back to legacy book_rules.md instead of
 * silently clearing protagonist / prohibitions / genreLock.
 */
export declare function tryParseBookRulesFrontmatter(raw: string, onError?: (error: unknown) => void): ParsedBookRules | null;
//# sourceMappingURL=book-rules.d.ts.map