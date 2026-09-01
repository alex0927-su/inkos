import { z } from "zod";
export declare const ChapterMemoSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    goal: z.ZodString;
    isGoldenOpening: z.ZodDefault<z.ZodBoolean>;
    body: z.ZodString;
    threadRefs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    chapter: number;
    body: string;
    goal: string;
    isGoldenOpening: boolean;
    threadRefs: string[];
}, {
    chapter: number;
    body: string;
    goal: string;
    isGoldenOpening?: boolean | undefined;
    threadRefs?: string[] | undefined;
}>;
export type ChapterMemo = z.infer<typeof ChapterMemoSchema>;
export declare const ChapterIntentSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    goal: z.ZodString;
    outlineNode: z.ZodOptional<z.ZodString>;
    arcContext: z.ZodOptional<z.ZodString>;
    mustKeep: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    mustAvoid: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    styleEmphasis: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    chapter: number;
    goal: string;
    mustKeep: string[];
    mustAvoid: string[];
    styleEmphasis: string[];
    outlineNode?: string | undefined;
    arcContext?: string | undefined;
}, {
    chapter: number;
    goal: string;
    outlineNode?: string | undefined;
    arcContext?: string | undefined;
    mustKeep?: string[] | undefined;
    mustAvoid?: string[] | undefined;
    styleEmphasis?: string[] | undefined;
}>;
export type ChapterIntent = z.infer<typeof ChapterIntentSchema>;
export declare const ContextSourceSchema: z.ZodObject<{
    source: z.ZodString;
    reason: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: string;
    source: string;
    excerpt?: string | undefined;
}, {
    reason: string;
    source: string;
    excerpt?: string | undefined;
}>;
export type ContextSource = z.infer<typeof ContextSourceSchema>;
export declare const ContextPackageSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    selectedContext: z.ZodDefault<z.ZodArray<z.ZodObject<{
        source: z.ZodString;
        reason: z.ZodString;
        excerpt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        source: string;
        excerpt?: string | undefined;
    }, {
        reason: string;
        source: string;
        excerpt?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    chapter: number;
    selectedContext: {
        reason: string;
        source: string;
        excerpt?: string | undefined;
    }[];
}, {
    chapter: number;
    selectedContext?: {
        reason: string;
        source: string;
        excerpt?: string | undefined;
    }[] | undefined;
}>;
export type ContextPackage = z.infer<typeof ContextPackageSchema>;
export declare const RuleLayerScopeSchema: z.ZodEnum<["global", "book", "arc", "local"]>;
export type RuleLayerScope = z.infer<typeof RuleLayerScopeSchema>;
export declare const RuleLayerSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    precedence: z.ZodNumber;
    scope: z.ZodEnum<["global", "book", "arc", "local"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    precedence: number;
    scope: "local" | "global" | "book" | "arc";
}, {
    id: string;
    name: string;
    precedence: number;
    scope: "local" | "global" | "book" | "arc";
}>;
export type RuleLayer = z.infer<typeof RuleLayerSchema>;
export declare const OverrideEdgeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    allowed: z.ZodBoolean;
    scope: z.ZodString;
}, "strip", z.ZodTypeAny, {
    from: string;
    to: string;
    scope: string;
    allowed: boolean;
}, {
    from: string;
    to: string;
    scope: string;
    allowed: boolean;
}>;
export type OverrideEdge = z.infer<typeof OverrideEdgeSchema>;
export declare const ActiveOverrideSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    target: z.ZodString;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    target: string;
    reason: string;
    from: string;
    to: string;
}, {
    target: string;
    reason: string;
    from: string;
    to: string;
}>;
export type ActiveOverride = z.infer<typeof ActiveOverrideSchema>;
export declare const RuleStackSectionsSchema: z.ZodObject<{
    hard: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    soft: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    diagnostic: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    hard: string[];
    soft: string[];
    diagnostic: string[];
}, {
    hard?: string[] | undefined;
    soft?: string[] | undefined;
    diagnostic?: string[] | undefined;
}>;
export type RuleStackSections = z.infer<typeof RuleStackSectionsSchema>;
export declare const RuleStackSchema: z.ZodObject<{
    layers: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        precedence: z.ZodNumber;
        scope: z.ZodEnum<["global", "book", "arc", "local"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        precedence: number;
        scope: "local" | "global" | "book" | "arc";
    }, {
        id: string;
        name: string;
        precedence: number;
        scope: "local" | "global" | "book" | "arc";
    }>, "many">;
    sections: z.ZodDefault<z.ZodObject<{
        hard: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        soft: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        diagnostic: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        hard: string[];
        soft: string[];
        diagnostic: string[];
    }, {
        hard?: string[] | undefined;
        soft?: string[] | undefined;
        diagnostic?: string[] | undefined;
    }>>;
    overrideEdges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        allowed: z.ZodBoolean;
        scope: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        from: string;
        to: string;
        scope: string;
        allowed: boolean;
    }, {
        from: string;
        to: string;
        scope: string;
        allowed: boolean;
    }>, "many">>;
    activeOverrides: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        target: z.ZodString;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        target: string;
        reason: string;
        from: string;
        to: string;
    }, {
        target: string;
        reason: string;
        from: string;
        to: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    layers: {
        id: string;
        name: string;
        precedence: number;
        scope: "local" | "global" | "book" | "arc";
    }[];
    sections: {
        hard: string[];
        soft: string[];
        diagnostic: string[];
    };
    overrideEdges: {
        from: string;
        to: string;
        scope: string;
        allowed: boolean;
    }[];
    activeOverrides: {
        target: string;
        reason: string;
        from: string;
        to: string;
    }[];
}, {
    layers: {
        id: string;
        name: string;
        precedence: number;
        scope: "local" | "global" | "book" | "arc";
    }[];
    sections?: {
        hard?: string[] | undefined;
        soft?: string[] | undefined;
        diagnostic?: string[] | undefined;
    } | undefined;
    overrideEdges?: {
        from: string;
        to: string;
        scope: string;
        allowed: boolean;
    }[] | undefined;
    activeOverrides?: {
        target: string;
        reason: string;
        from: string;
        to: string;
    }[] | undefined;
}>;
export type RuleStack = z.infer<typeof RuleStackSchema>;
export declare const ChapterTraceSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    plannerInputs: z.ZodArray<z.ZodString, "many">;
    composerInputs: z.ZodArray<z.ZodString, "many">;
    selectedSources: z.ZodArray<z.ZodString, "many">;
    promptPacks: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    contextTiers: z.ZodDefault<z.ZodObject<{
        protectedSources: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        compressibleSources: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        protectedSources: string[];
        compressibleSources: string[];
    }, {
        protectedSources?: string[] | undefined;
        compressibleSources?: string[] | undefined;
    }>>;
    tokenBudget: z.ZodDefault<z.ZodObject<{
        protectedTokens: z.ZodDefault<z.ZodNumber>;
        compressibleTokens: z.ZodDefault<z.ZodNumber>;
        totalSelectedTokens: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        protectedTokens: number;
        compressibleTokens: number;
        totalSelectedTokens: number;
    }, {
        protectedTokens?: number | undefined;
        compressibleTokens?: number | undefined;
        totalSelectedTokens?: number | undefined;
    }>>;
    compression: z.ZodOptional<z.ZodObject<{
        compiledSource: z.ZodString;
        protectedSources: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        compressedSources: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        protectedTokens: z.ZodDefault<z.ZodNumber>;
        compressibleTokens: z.ZodDefault<z.ZodNumber>;
        budgetTokens: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        budgetTokens: number;
        protectedSources: string[];
        protectedTokens: number;
        compressibleTokens: number;
        compiledSource: string;
        compressedSources: string[];
    }, {
        compiledSource: string;
        budgetTokens?: number | undefined;
        protectedSources?: string[] | undefined;
        protectedTokens?: number | undefined;
        compressibleTokens?: number | undefined;
        compressedSources?: string[] | undefined;
    }>>;
    retrieval: z.ZodOptional<z.ZodObject<{
        engine: z.ZodLiteral<"sqlite-fts5-bm25">;
        query: z.ZodString;
        candidates: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            kind: z.ZodString;
            source: z.ZodString;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            kind: string;
            source: string;
            score: number;
        }, {
            id: string;
            kind: string;
            source: string;
            score: number;
        }>, "many">;
        semanticSelectedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        engine: "sqlite-fts5-bm25";
        candidates: {
            id: string;
            kind: string;
            source: string;
            score: number;
        }[];
        semanticSelectedIds?: string[] | undefined;
    }, {
        query: string;
        engine: "sqlite-fts5-bm25";
        candidates: {
            id: string;
            kind: string;
            source: string;
            score: number;
        }[];
        semanticSelectedIds?: string[] | undefined;
    }>>;
    notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    chapter: number;
    notes: string[];
    plannerInputs: string[];
    composerInputs: string[];
    selectedSources: string[];
    promptPacks: string[];
    contextTiers: {
        protectedSources: string[];
        compressibleSources: string[];
    };
    tokenBudget: {
        protectedTokens: number;
        compressibleTokens: number;
        totalSelectedTokens: number;
    };
    compression?: {
        budgetTokens: number;
        protectedSources: string[];
        protectedTokens: number;
        compressibleTokens: number;
        compiledSource: string;
        compressedSources: string[];
    } | undefined;
    retrieval?: {
        query: string;
        engine: "sqlite-fts5-bm25";
        candidates: {
            id: string;
            kind: string;
            source: string;
            score: number;
        }[];
        semanticSelectedIds?: string[] | undefined;
    } | undefined;
}, {
    chapter: number;
    plannerInputs: string[];
    composerInputs: string[];
    selectedSources: string[];
    notes?: string[] | undefined;
    promptPacks?: string[] | undefined;
    contextTiers?: {
        protectedSources?: string[] | undefined;
        compressibleSources?: string[] | undefined;
    } | undefined;
    tokenBudget?: {
        protectedTokens?: number | undefined;
        compressibleTokens?: number | undefined;
        totalSelectedTokens?: number | undefined;
    } | undefined;
    compression?: {
        compiledSource: string;
        budgetTokens?: number | undefined;
        protectedSources?: string[] | undefined;
        protectedTokens?: number | undefined;
        compressibleTokens?: number | undefined;
        compressedSources?: string[] | undefined;
    } | undefined;
    retrieval?: {
        query: string;
        engine: "sqlite-fts5-bm25";
        candidates: {
            id: string;
            kind: string;
            source: string;
            score: number;
        }[];
        semanticSelectedIds?: string[] | undefined;
    } | undefined;
}>;
export type ChapterTrace = z.infer<typeof ChapterTraceSchema>;
//# sourceMappingURL=input-governance.d.ts.map