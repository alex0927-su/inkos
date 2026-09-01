import { z } from "zod";
export declare const FORECAST_MIN_BRANCHES = 2;
export declare const FORECAST_MAX_BRANCHES = 5;
export declare const FORECAST_DEFAULT_BRANCHES = 3;
export declare const FORECAST_MIN_HORIZON = 1;
export declare const FORECAST_MAX_HORIZON = 10;
export declare const FORECAST_DEFAULT_HORIZON = 5;
export declare const ForecastRiskSchema: z.ZodObject<{
    kind: z.ZodEnum<["continuity", "causality", "character"]>;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    kind: "character" | "continuity" | "causality";
    description: string;
}, {
    kind: "character" | "continuity" | "causality";
    description: string;
}>;
export type ForecastRisk = z.infer<typeof ForecastRiskSchema>;
export declare const ForecastBeatSchema: z.ZodObject<{
    chapter: z.ZodNumber;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chapter: number;
    summary: string;
}, {
    chapter: number;
    summary: string;
}>;
export type ForecastBeat = z.infer<typeof ForecastBeatSchema>;
export declare const ForecastCharacterDecisionSchema: z.ZodObject<{
    character: z.ZodString;
    decision: z.ZodString;
}, "strip", z.ZodTypeAny, {
    character: string;
    decision: string;
}, {
    character: string;
    decision: string;
}>;
export type ForecastCharacterDecision = z.infer<typeof ForecastCharacterDecisionSchema>;
export declare const ForecastProjectedChangesSchema: z.ZodObject<{
    characters: z.ZodArray<z.ZodString, "many">;
    relationships: z.ZodArray<z.ZodString, "many">;
    world: z.ZodArray<z.ZodString, "many">;
    hooks: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    hooks: string[];
    characters: string[];
    world: string[];
    relationships: string[];
}, {
    hooks: string[];
    characters: string[];
    world: string[];
    relationships: string[];
}>;
export type ForecastProjectedChanges = z.infer<typeof ForecastProjectedChangesSchema>;
export declare const ForecastIntentAlignmentSchema: z.ZodObject<{
    score: z.ZodNumber;
    rationale: z.ZodString;
}, "strip", z.ZodTypeAny, {
    rationale: string;
    score: number;
}, {
    rationale: string;
    score: number;
}>;
export type ForecastIntentAlignment = z.infer<typeof ForecastIntentAlignmentSchema>;
export declare const ForecastBranchSchema: z.ZodObject<{
    branchId: z.ZodString;
    title: z.ZodString;
    premise: z.ZodString;
    beats: z.ZodArray<z.ZodObject<{
        chapter: z.ZodNumber;
        summary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        chapter: number;
        summary: string;
    }, {
        chapter: number;
        summary: string;
    }>, "many">;
    characterDecisions: z.ZodArray<z.ZodObject<{
        character: z.ZodString;
        decision: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        character: string;
        decision: string;
    }, {
        character: string;
        decision: string;
    }>, "many">;
    projectedChanges: z.ZodObject<{
        characters: z.ZodArray<z.ZodString, "many">;
        relationships: z.ZodArray<z.ZodString, "many">;
        world: z.ZodArray<z.ZodString, "many">;
        hooks: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    }, {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    }>;
    risks: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<["continuity", "causality", "character"]>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        kind: "character" | "continuity" | "causality";
        description: string;
    }, {
        kind: "character" | "continuity" | "causality";
        description: string;
    }>, "many">;
    uncertainties: z.ZodArray<z.ZodString, "many">;
    intentAlignment: z.ZodObject<{
        score: z.ZodNumber;
        rationale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        rationale: string;
        score: number;
    }, {
        rationale: string;
        score: number;
    }>;
}, "strip", z.ZodTypeAny, {
    title: string;
    premise: string;
    branchId: string;
    beats: {
        chapter: number;
        summary: string;
    }[];
    characterDecisions: {
        character: string;
        decision: string;
    }[];
    projectedChanges: {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    };
    risks: {
        kind: "character" | "continuity" | "causality";
        description: string;
    }[];
    uncertainties: string[];
    intentAlignment: {
        rationale: string;
        score: number;
    };
}, {
    title: string;
    premise: string;
    branchId: string;
    beats: {
        chapter: number;
        summary: string;
    }[];
    characterDecisions: {
        character: string;
        decision: string;
    }[];
    projectedChanges: {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    };
    risks: {
        kind: "character" | "continuity" | "causality";
        description: string;
    }[];
    uncertainties: string[];
    intentAlignment: {
        rationale: string;
        score: number;
    };
}>;
export type ForecastBranch = z.infer<typeof ForecastBranchSchema>;
export declare const ForecastStatusSchema: z.ZodEnum<["active", "stale"]>;
export type ForecastStatus = z.infer<typeof ForecastStatusSchema>;
export declare const NarrativeForecastSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodLiteral<1>;
    forecastId: z.ZodString;
    bookId: z.ZodString;
    createdAt: z.ZodString;
    language: z.ZodEnum<["zh", "en"]>;
    divergence: z.ZodString;
    horizon: z.ZodNumber;
    baseChapter: z.ZodNumber;
    contextFingerprint: z.ZodString;
    status: z.ZodEnum<["active", "stale"]>;
    branches: z.ZodArray<z.ZodObject<{
        branchId: z.ZodString;
        title: z.ZodString;
        premise: z.ZodString;
        beats: z.ZodArray<z.ZodObject<{
            chapter: z.ZodNumber;
            summary: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            chapter: number;
            summary: string;
        }, {
            chapter: number;
            summary: string;
        }>, "many">;
        characterDecisions: z.ZodArray<z.ZodObject<{
            character: z.ZodString;
            decision: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            character: string;
            decision: string;
        }, {
            character: string;
            decision: string;
        }>, "many">;
        projectedChanges: z.ZodObject<{
            characters: z.ZodArray<z.ZodString, "many">;
            relationships: z.ZodArray<z.ZodString, "many">;
            world: z.ZodArray<z.ZodString, "many">;
            hooks: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        }, {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        }>;
        risks: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["continuity", "causality", "character"]>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            kind: "character" | "continuity" | "causality";
            description: string;
        }, {
            kind: "character" | "continuity" | "causality";
            description: string;
        }>, "many">;
        uncertainties: z.ZodArray<z.ZodString, "many">;
        intentAlignment: z.ZodObject<{
            score: z.ZodNumber;
            rationale: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            rationale: string;
            score: number;
        }, {
            rationale: string;
            score: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }, {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "active" | "stale";
    language: "zh" | "en";
    createdAt: string;
    version: 1;
    bookId: string;
    forecastId: string;
    divergence: string;
    horizon: number;
    baseChapter: number;
    contextFingerprint: string;
    branches: {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}, {
    status: "active" | "stale";
    language: "zh" | "en";
    createdAt: string;
    version: 1;
    bookId: string;
    forecastId: string;
    divergence: string;
    horizon: number;
    baseChapter: number;
    contextFingerprint: string;
    branches: {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}>, {
    status: "active" | "stale";
    language: "zh" | "en";
    createdAt: string;
    version: 1;
    bookId: string;
    forecastId: string;
    divergence: string;
    horizon: number;
    baseChapter: number;
    contextFingerprint: string;
    branches: {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}, {
    status: "active" | "stale";
    language: "zh" | "en";
    createdAt: string;
    version: 1;
    bookId: string;
    forecastId: string;
    divergence: string;
    horizon: number;
    baseChapter: number;
    contextFingerprint: string;
    branches: {
        title: string;
        premise: string;
        branchId: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}>;
export type NarrativeForecast = z.infer<typeof NarrativeForecastSchema>;
export declare const ForecastModelBranchSchema: z.ZodObject<Omit<{
    branchId: z.ZodString;
    title: z.ZodString;
    premise: z.ZodString;
    beats: z.ZodArray<z.ZodObject<{
        chapter: z.ZodNumber;
        summary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        chapter: number;
        summary: string;
    }, {
        chapter: number;
        summary: string;
    }>, "many">;
    characterDecisions: z.ZodArray<z.ZodObject<{
        character: z.ZodString;
        decision: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        character: string;
        decision: string;
    }, {
        character: string;
        decision: string;
    }>, "many">;
    projectedChanges: z.ZodObject<{
        characters: z.ZodArray<z.ZodString, "many">;
        relationships: z.ZodArray<z.ZodString, "many">;
        world: z.ZodArray<z.ZodString, "many">;
        hooks: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    }, {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    }>;
    risks: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<["continuity", "causality", "character"]>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        kind: "character" | "continuity" | "causality";
        description: string;
    }, {
        kind: "character" | "continuity" | "causality";
        description: string;
    }>, "many">;
    uncertainties: z.ZodArray<z.ZodString, "many">;
    intentAlignment: z.ZodObject<{
        score: z.ZodNumber;
        rationale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        rationale: string;
        score: number;
    }, {
        rationale: string;
        score: number;
    }>;
}, "branchId">, "strip", z.ZodTypeAny, {
    title: string;
    premise: string;
    beats: {
        chapter: number;
        summary: string;
    }[];
    characterDecisions: {
        character: string;
        decision: string;
    }[];
    projectedChanges: {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    };
    risks: {
        kind: "character" | "continuity" | "causality";
        description: string;
    }[];
    uncertainties: string[];
    intentAlignment: {
        rationale: string;
        score: number;
    };
}, {
    title: string;
    premise: string;
    beats: {
        chapter: number;
        summary: string;
    }[];
    characterDecisions: {
        character: string;
        decision: string;
    }[];
    projectedChanges: {
        hooks: string[];
        characters: string[];
        world: string[];
        relationships: string[];
    };
    risks: {
        kind: "character" | "continuity" | "causality";
        description: string;
    }[];
    uncertainties: string[];
    intentAlignment: {
        rationale: string;
        score: number;
    };
}>;
export type ForecastModelBranch = z.infer<typeof ForecastModelBranchSchema>;
export declare const ForecastModelOutputSchema: z.ZodObject<{
    branches: z.ZodArray<z.ZodObject<Omit<{
        branchId: z.ZodString;
        title: z.ZodString;
        premise: z.ZodString;
        beats: z.ZodArray<z.ZodObject<{
            chapter: z.ZodNumber;
            summary: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            chapter: number;
            summary: string;
        }, {
            chapter: number;
            summary: string;
        }>, "many">;
        characterDecisions: z.ZodArray<z.ZodObject<{
            character: z.ZodString;
            decision: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            character: string;
            decision: string;
        }, {
            character: string;
            decision: string;
        }>, "many">;
        projectedChanges: z.ZodObject<{
            characters: z.ZodArray<z.ZodString, "many">;
            relationships: z.ZodArray<z.ZodString, "many">;
            world: z.ZodArray<z.ZodString, "many">;
            hooks: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        }, {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        }>;
        risks: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["continuity", "causality", "character"]>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            kind: "character" | "continuity" | "causality";
            description: string;
        }, {
            kind: "character" | "continuity" | "causality";
            description: string;
        }>, "many">;
        uncertainties: z.ZodArray<z.ZodString, "many">;
        intentAlignment: z.ZodObject<{
            score: z.ZodNumber;
            rationale: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            rationale: string;
            score: number;
        }, {
            rationale: string;
            score: number;
        }>;
    }, "branchId">, "strip", z.ZodTypeAny, {
        title: string;
        premise: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }, {
        title: string;
        premise: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    branches: {
        title: string;
        premise: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}, {
    branches: {
        title: string;
        premise: string;
        beats: {
            chapter: number;
            summary: string;
        }[];
        characterDecisions: {
            character: string;
            decision: string;
        }[];
        projectedChanges: {
            hooks: string[];
            characters: string[];
            world: string[];
            relationships: string[];
        };
        risks: {
            kind: "character" | "continuity" | "causality";
            description: string;
        }[];
        uncertainties: string[];
        intentAlignment: {
            rationale: string;
            score: number;
        };
    }[];
}>;
export type ForecastModelOutput = z.infer<typeof ForecastModelOutputSchema>;
/**
 * Parse and validate the raw model response for a forecast run. Tolerates a
 * code fence, surrounding prose and trailing commas; anything else is a hard
 * error so an invalid response never reaches disk.
 */
export declare function parseForecastModelOutput(raw: string): ForecastModelOutput;
//# sourceMappingURL=schema.d.ts.map