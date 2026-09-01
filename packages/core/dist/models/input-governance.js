import { z } from "zod";
export const ChapterMemoSchema = z.object({
    chapter: z.number().int().min(1),
    goal: z.string().min(1).max(50),
    isGoldenOpening: z.boolean().default(false),
    body: z.string().min(1),
    threadRefs: z.array(z.string()).default([]),
});
export const ChapterIntentSchema = z.object({
    chapter: z.number().int().min(1),
    goal: z.string().min(1),
    outlineNode: z.string().optional(),
    arcContext: z.string().optional(),
    mustKeep: z.array(z.string()).default([]),
    mustAvoid: z.array(z.string()).default([]),
    styleEmphasis: z.array(z.string()).default([]),
});
export const ContextSourceSchema = z.object({
    source: z.string().min(1),
    reason: z.string().min(1),
    excerpt: z.string().optional(),
});
export const ContextPackageSchema = z.object({
    chapter: z.number().int().min(1),
    selectedContext: z.array(ContextSourceSchema).default([]),
});
export const RuleLayerScopeSchema = z.enum(["global", "book", "arc", "local"]);
export const RuleLayerSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    precedence: z.number().int(),
    scope: RuleLayerScopeSchema,
});
export const OverrideEdgeSchema = z.object({
    from: z.string().min(1),
    to: z.string().min(1),
    allowed: z.boolean(),
    scope: z.string().min(1),
});
export const ActiveOverrideSchema = z.object({
    from: z.string().min(1),
    to: z.string().min(1),
    target: z.string().min(1),
    reason: z.string().min(1),
});
export const RuleStackSectionsSchema = z.object({
    hard: z.array(z.string()).default([]),
    soft: z.array(z.string()).default([]),
    diagnostic: z.array(z.string()).default([]),
});
export const RuleStackSchema = z.object({
    layers: z.array(RuleLayerSchema).min(1),
    sections: RuleStackSectionsSchema.default({
        hard: [],
        soft: [],
        diagnostic: [],
    }),
    overrideEdges: z.array(OverrideEdgeSchema).default([]),
    activeOverrides: z.array(ActiveOverrideSchema).default([]),
});
export const ChapterTraceSchema = z.object({
    chapter: z.number().int().min(1),
    plannerInputs: z.array(z.string()),
    composerInputs: z.array(z.string()),
    selectedSources: z.array(z.string()),
    promptPacks: z.array(z.string()).default([]),
    contextTiers: z.object({
        protectedSources: z.array(z.string()).default([]),
        compressibleSources: z.array(z.string()).default([]),
    }).default({
        protectedSources: [],
        compressibleSources: [],
    }),
    tokenBudget: z.object({
        protectedTokens: z.number().int().nonnegative().default(0),
        compressibleTokens: z.number().int().nonnegative().default(0),
        totalSelectedTokens: z.number().int().nonnegative().default(0),
    }).default({
        protectedTokens: 0,
        compressibleTokens: 0,
        totalSelectedTokens: 0,
    }),
    compression: z.object({
        compiledSource: z.string().min(1),
        protectedSources: z.array(z.string()).default([]),
        compressedSources: z.array(z.string()).default([]),
        protectedTokens: z.number().int().nonnegative().default(0),
        compressibleTokens: z.number().int().nonnegative().default(0),
        budgetTokens: z.number().int().nonnegative().default(0),
    }).optional(),
    retrieval: z.object({
        engine: z.literal("sqlite-fts5-bm25"),
        query: z.string(),
        candidates: z.array(z.object({
            id: z.string(),
            kind: z.string(),
            source: z.string(),
            score: z.number(),
        })),
        semanticSelectedIds: z.array(z.string()).optional(),
    }).optional(),
    notes: z.array(z.string()).default([]),
});
//# sourceMappingURL=input-governance.js.map