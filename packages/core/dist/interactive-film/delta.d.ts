import { z } from "zod";
import { type StoryGraph } from "./graph-schema.js";
export declare const StoryGraphDeltaSchema: z.ZodObject<{
    worldAnchor: z.ZodOptional<z.ZodObject<{
        storyCore: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        theme: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        genre: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        worldRules: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        durationMinutes: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    }, {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    }>>;
    characters: z.ZodOptional<z.ZodObject<{
        upsert: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            role: z.ZodDefault<z.ZodEnum<["protagonist", "antagonist", "support", "other"]>>;
            motivation: z.ZodDefault<z.ZodString>;
            voiceProfile: z.ZodOptional<z.ZodObject<{
                speakingRhythm: z.ZodDefault<z.ZodString>;
                vocabulary: z.ZodDefault<z.ZodString>;
                sampleLines: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                speakingRhythm: string;
                vocabulary: string;
                sampleLines: string[];
            }, {
                speakingRhythm?: string | undefined;
                vocabulary?: string | undefined;
                sampleLines?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            role: "other" | "protagonist" | "antagonist" | "support";
            motivation: string;
            voiceProfile?: {
                speakingRhythm: string;
                vocabulary: string;
                sampleLines: string[];
            } | undefined;
        }, {
            id: string;
            name: string;
            role?: "other" | "protagonist" | "antagonist" | "support" | undefined;
            motivation?: string | undefined;
            voiceProfile?: {
                speakingRhythm?: string | undefined;
                vocabulary?: string | undefined;
                sampleLines?: string[] | undefined;
            } | undefined;
        }>, "many">>;
        remove: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            id: string;
            name: string;
            role: "other" | "protagonist" | "antagonist" | "support";
            motivation: string;
            voiceProfile?: {
                speakingRhythm: string;
                vocabulary: string;
                sampleLines: string[];
            } | undefined;
        }[];
        remove: string[];
    }, {
        upsert?: {
            id: string;
            name: string;
            role?: "other" | "protagonist" | "antagonist" | "support" | undefined;
            motivation?: string | undefined;
            voiceProfile?: {
                speakingRhythm?: string | undefined;
                vocabulary?: string | undefined;
                sampleLines?: string[] | undefined;
            } | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    }>>;
    nodes: z.ZodOptional<z.ZodObject<{
        upsert: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodDefault<z.ZodString>;
            type: z.ZodEnum<["start", "normal", "branch", "merge", "ending", "explore"]>;
            sceneDesc: z.ZodDefault<z.ZodString>;
            dialogue: z.ZodDefault<z.ZodArray<z.ZodObject<{
                speaker: z.ZodString;
                text: z.ZodString;
                emotion: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                speaker: string;
                emotion: string;
            }, {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }>, "many">>;
            choices: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                text: z.ZodString;
                targetNodeId: z.ZodString;
                condition: z.ZodOptional<z.ZodObject<{
                    var: z.ZodString;
                    op: z.ZodEnum<[">=", "<=", ">", "<", "==", "!="]>;
                    value: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                }, {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                }>>;
                effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    var: z.ZodString;
                    op: z.ZodEnum<["set", "add", "sub"]>;
                    value: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }, {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }>, "many">>;
                weight: z.ZodOptional<z.ZodEnum<["light", "heavy", "critical"]>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }, {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }>, "many">>;
            imageSlot: z.ZodOptional<z.ZodObject<{
                prompt: z.ZodDefault<z.ZodString>;
                assetRef: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                prompt: string;
                assetRef?: string | undefined;
            }, {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            }>>;
            act: z.ZodDefault<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }, {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }>, "many">>;
        remove: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }[];
        remove: string[];
    }, {
        upsert?: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    }>>;
    variables: z.ZodOptional<z.ZodObject<{
        upsert: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["flag", "counter", "relationship", "item"]>;
            default: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
            desc: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc: string;
        }, {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc?: string | undefined;
        }>, "many">>;
        remove: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc: string;
        }[];
        remove: string[];
    }, {
        upsert?: {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc?: string | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    }>>;
    endings: z.ZodOptional<z.ZodObject<{
        upsert: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            nodeId: z.ZodString;
            title: z.ZodString;
            type: z.ZodEnum<["good", "bad", "neutral", "secret"]>;
            description: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            description: string;
            nodeId: string;
        }, {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            nodeId: string;
            description?: string | undefined;
        }>, "many">>;
        remove: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            description: string;
            nodeId: string;
        }[];
        remove: string[];
    }, {
        upsert?: {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            nodeId: string;
            description?: string | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    }>>;
    notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    notes: string[];
    characters?: {
        upsert: {
            id: string;
            name: string;
            role: "other" | "protagonist" | "antagonist" | "support";
            motivation: string;
            voiceProfile?: {
                speakingRhythm: string;
                vocabulary: string;
                sampleLines: string[];
            } | undefined;
        }[];
        remove: string[];
    } | undefined;
    worldAnchor?: {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    } | undefined;
    variables?: {
        upsert: {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc: string;
        }[];
        remove: string[];
    } | undefined;
    nodes?: {
        upsert: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }[];
        remove: string[];
    } | undefined;
    endings?: {
        upsert: {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            description: string;
            nodeId: string;
        }[];
        remove: string[];
    } | undefined;
}, {
    notes?: string[] | undefined;
    characters?: {
        upsert?: {
            id: string;
            name: string;
            role?: "other" | "protagonist" | "antagonist" | "support" | undefined;
            motivation?: string | undefined;
            voiceProfile?: {
                speakingRhythm?: string | undefined;
                vocabulary?: string | undefined;
                sampleLines?: string[] | undefined;
            } | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    } | undefined;
    worldAnchor?: {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    } | undefined;
    variables?: {
        upsert?: {
            type: "item" | "flag" | "relationship" | "counter";
            name: string;
            default: string | number | boolean;
            desc?: string | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    } | undefined;
    nodes?: {
        upsert?: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    } | undefined;
    endings?: {
        upsert?: {
            type: "secret" | "good" | "bad" | "neutral";
            id: string;
            title: string;
            nodeId: string;
            description?: string | undefined;
        }[] | undefined;
        remove?: string[] | undefined;
    } | undefined;
}>;
export type StoryGraphDelta = z.infer<typeof StoryGraphDeltaSchema>;
/**
 * Returns a new StoryGraph with the delta applied. The returned graph shares
 * element references with the input; callers must treat it as immutable —
 * do not mutate nodes/arrays in place.
 */
export declare function applyStoryGraphDelta(params: {
    graph: StoryGraph;
    delta: StoryGraphDelta;
}): StoryGraph;
//# sourceMappingURL=delta.d.ts.map