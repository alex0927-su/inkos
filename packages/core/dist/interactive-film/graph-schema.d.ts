import { z } from "zod";
export declare const VarValueSchema: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
export type VarValue = z.infer<typeof VarValueSchema>;
export declare const ConditionSchema: z.ZodObject<{
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
}>;
export type Condition = z.infer<typeof ConditionSchema>;
export declare const EffectSchema: z.ZodObject<{
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
}>;
export type Effect = z.infer<typeof EffectSchema>;
export declare const ChoiceSchema: z.ZodObject<{
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
}>;
export type Choice = z.infer<typeof ChoiceSchema>;
export declare const DialogueLineSchema: z.ZodObject<{
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
}>;
export type DialogueLine = z.infer<typeof DialogueLineSchema>;
export declare const ImageSlotSchema: z.ZodObject<{
    prompt: z.ZodDefault<z.ZodString>;
    assetRef: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    assetRef?: string | undefined;
}, {
    prompt?: string | undefined;
    assetRef?: string | undefined;
}>;
export type ImageSlot = z.infer<typeof ImageSlotSchema>;
export declare const NodeTypeSchema: z.ZodEnum<["start", "normal", "branch", "merge", "ending", "explore"]>;
export type NodeType = z.infer<typeof NodeTypeSchema>;
export declare const VoiceProfileSchema: z.ZodObject<{
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
}>;
export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;
export declare const CharacterSchema: z.ZodObject<{
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
}>;
export type Character = z.infer<typeof CharacterSchema>;
export declare const WorldAnchorSchema: z.ZodObject<{
    storyCore: z.ZodDefault<z.ZodString>;
    theme: z.ZodDefault<z.ZodString>;
    genre: z.ZodDefault<z.ZodString>;
    worldRules: z.ZodDefault<z.ZodString>;
    durationMinutes: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    genre: string;
    storyCore: string;
    theme: string;
    worldRules: string;
    durationMinutes: number;
}, {
    genre?: string | undefined;
    storyCore?: string | undefined;
    theme?: string | undefined;
    worldRules?: string | undefined;
    durationMinutes?: number | undefined;
}>;
export type WorldAnchor = z.infer<typeof WorldAnchorSchema>;
export declare const StoryNodeSchema: z.ZodObject<{
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
}>;
export type StoryNode = z.infer<typeof StoryNodeSchema>;
export declare const VariableSchema: z.ZodObject<{
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
}>;
export type Variable = z.infer<typeof VariableSchema>;
export declare const EndingSchema: z.ZodObject<{
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
}>;
export type Ending = z.infer<typeof EndingSchema>;
export declare const StoryGraphSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    projectId: z.ZodString;
    title: z.ZodString;
    worldAnchor: z.ZodOptional<z.ZodObject<{
        storyCore: z.ZodDefault<z.ZodString>;
        theme: z.ZodDefault<z.ZodString>;
        genre: z.ZodDefault<z.ZodString>;
        worldRules: z.ZodDefault<z.ZodString>;
        durationMinutes: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        genre: string;
        storyCore: string;
        theme: string;
        worldRules: string;
        durationMinutes: number;
    }, {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    }>>;
    characters: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    variables: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    nodes: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    endings: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    title: string;
    schemaVersion: 1;
    characters: {
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
    projectId: string;
    variables: {
        type: "item" | "flag" | "relationship" | "counter";
        name: string;
        default: string | number | boolean;
        desc: string;
    }[];
    nodes: {
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
    endings: {
        type: "secret" | "good" | "bad" | "neutral";
        id: string;
        title: string;
        description: string;
        nodeId: string;
    }[];
    worldAnchor?: {
        genre: string;
        storyCore: string;
        theme: string;
        worldRules: string;
        durationMinutes: number;
    } | undefined;
}, {
    title: string;
    schemaVersion: 1;
    projectId: string;
    characters?: {
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
    worldAnchor?: {
        genre?: string | undefined;
        storyCore?: string | undefined;
        theme?: string | undefined;
        worldRules?: string | undefined;
        durationMinutes?: number | undefined;
    } | undefined;
    variables?: {
        type: "item" | "flag" | "relationship" | "counter";
        name: string;
        default: string | number | boolean;
        desc?: string | undefined;
    }[] | undefined;
    nodes?: {
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
    endings?: {
        type: "secret" | "good" | "bad" | "neutral";
        id: string;
        title: string;
        nodeId: string;
        description?: string | undefined;
    }[] | undefined;
}>;
export type StoryGraph = z.infer<typeof StoryGraphSchema>;
//# sourceMappingURL=graph-schema.d.ts.map