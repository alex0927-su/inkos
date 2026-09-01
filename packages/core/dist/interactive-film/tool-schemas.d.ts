import { type Static } from "@sinclair/typebox";
export declare const StoryNodeContentToolSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"start">, import("@sinclair/typebox").TLiteral<"normal">, import("@sinclair/typebox").TLiteral<"branch">, import("@sinclair/typebox").TLiteral<"merge">, import("@sinclair/typebox").TLiteral<"ending">, import("@sinclair/typebox").TLiteral<"explore">]>;
    sceneDesc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    dialogue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        speaker: import("@sinclair/typebox").TString;
        text: import("@sinclair/typebox").TString;
        emotion: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
    choices: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        text: import("@sinclair/typebox").TString;
        targetNodeId: import("@sinclair/typebox").TString;
        condition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            var: import("@sinclair/typebox").TString;
            op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<">=">, import("@sinclair/typebox").TLiteral<"<=">, import("@sinclair/typebox").TLiteral<">">, import("@sinclair/typebox").TLiteral<"<">, import("@sinclair/typebox").TLiteral<"==">, import("@sinclair/typebox").TLiteral<"!=">]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
        }>>;
        effects: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            var: import("@sinclair/typebox").TString;
            op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"set">, import("@sinclair/typebox").TLiteral<"add">, import("@sinclair/typebox").TLiteral<"sub">]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
        }>>>;
        weight: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"light">, import("@sinclair/typebox").TLiteral<"heavy">, import("@sinclair/typebox").TLiteral<"critical">]>>;
    }>>>;
    imageSlot: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        prompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        assetRef: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    act: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    position: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        x: import("@sinclair/typebox").TNumber;
        y: import("@sinclair/typebox").TNumber;
    }>>;
}>;
export declare const StoryNodeToolSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"start">, import("@sinclair/typebox").TLiteral<"normal">, import("@sinclair/typebox").TLiteral<"branch">, import("@sinclair/typebox").TLiteral<"merge">, import("@sinclair/typebox").TLiteral<"ending">, import("@sinclair/typebox").TLiteral<"explore">]>;
    sceneDesc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    dialogue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        speaker: import("@sinclair/typebox").TString;
        text: import("@sinclair/typebox").TString;
        emotion: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
    choices: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        text: import("@sinclair/typebox").TString;
        targetNodeId: import("@sinclair/typebox").TString;
        condition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            var: import("@sinclair/typebox").TString;
            op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<">=">, import("@sinclair/typebox").TLiteral<"<=">, import("@sinclair/typebox").TLiteral<">">, import("@sinclair/typebox").TLiteral<"<">, import("@sinclair/typebox").TLiteral<"==">, import("@sinclair/typebox").TLiteral<"!=">]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
        }>>;
        effects: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            var: import("@sinclair/typebox").TString;
            op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"set">, import("@sinclair/typebox").TLiteral<"add">, import("@sinclair/typebox").TLiteral<"sub">]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
        }>>>;
        weight: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"light">, import("@sinclair/typebox").TLiteral<"heavy">, import("@sinclair/typebox").TLiteral<"critical">]>>;
    }>>>;
    imageSlot: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        prompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        assetRef: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    act: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    position: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        x: import("@sinclair/typebox").TNumber;
        y: import("@sinclair/typebox").TNumber;
    }>>;
    id: import("@sinclair/typebox").TString;
}>;
export declare const StoryGraphContentToolSchema: import("@sinclair/typebox").TObject<{
    worldAnchor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        storyCore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        theme: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        worldRules: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        durationMinutes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    characters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        role: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"protagonist">, import("@sinclair/typebox").TLiteral<"antagonist">, import("@sinclair/typebox").TLiteral<"support">, import("@sinclair/typebox").TLiteral<"other">]>>;
        motivation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        voiceProfile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            speakingRhythm: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            vocabulary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            sampleLines: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        }>>;
    }>>>;
    variables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"flag">, import("@sinclair/typebox").TLiteral<"counter">, import("@sinclair/typebox").TLiteral<"relationship">, import("@sinclair/typebox").TLiteral<"item">]>;
        default: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
        desc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
    nodes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"start">, import("@sinclair/typebox").TLiteral<"normal">, import("@sinclair/typebox").TLiteral<"branch">, import("@sinclair/typebox").TLiteral<"merge">, import("@sinclair/typebox").TLiteral<"ending">, import("@sinclair/typebox").TLiteral<"explore">]>;
        sceneDesc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        dialogue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            speaker: import("@sinclair/typebox").TString;
            text: import("@sinclair/typebox").TString;
            emotion: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>>;
        choices: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            text: import("@sinclair/typebox").TString;
            targetNodeId: import("@sinclair/typebox").TString;
            condition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                var: import("@sinclair/typebox").TString;
                op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<">=">, import("@sinclair/typebox").TLiteral<"<=">, import("@sinclair/typebox").TLiteral<">">, import("@sinclair/typebox").TLiteral<"<">, import("@sinclair/typebox").TLiteral<"==">, import("@sinclair/typebox").TLiteral<"!=">]>;
                value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
            }>>;
            effects: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                var: import("@sinclair/typebox").TString;
                op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"set">, import("@sinclair/typebox").TLiteral<"add">, import("@sinclair/typebox").TLiteral<"sub">]>;
                value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
            }>>>;
            weight: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"light">, import("@sinclair/typebox").TLiteral<"heavy">, import("@sinclair/typebox").TLiteral<"critical">]>>;
        }>>>;
        imageSlot: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            prompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            assetRef: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
        act: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        position: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            x: import("@sinclair/typebox").TNumber;
            y: import("@sinclair/typebox").TNumber;
        }>>;
        id: import("@sinclair/typebox").TString;
    }>>;
    endings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        nodeId: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"good">, import("@sinclair/typebox").TLiteral<"bad">, import("@sinclair/typebox").TLiteral<"neutral">, import("@sinclair/typebox").TLiteral<"secret">]>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
}>;
export declare const StoryStructureToolSchema: import("@sinclair/typebox").TObject<{
    nodes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"start">, import("@sinclair/typebox").TLiteral<"normal">, import("@sinclair/typebox").TLiteral<"branch">, import("@sinclair/typebox").TLiteral<"merge">, import("@sinclair/typebox").TLiteral<"ending">, import("@sinclair/typebox").TLiteral<"explore">]>;
        sceneDesc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        dialogue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            speaker: import("@sinclair/typebox").TString;
            text: import("@sinclair/typebox").TString;
            emotion: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>>;
        choices: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            text: import("@sinclair/typebox").TString;
            targetNodeId: import("@sinclair/typebox").TString;
            condition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                var: import("@sinclair/typebox").TString;
                op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<">=">, import("@sinclair/typebox").TLiteral<"<=">, import("@sinclair/typebox").TLiteral<">">, import("@sinclair/typebox").TLiteral<"<">, import("@sinclair/typebox").TLiteral<"==">, import("@sinclair/typebox").TLiteral<"!=">]>;
                value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
            }>>;
            effects: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                var: import("@sinclair/typebox").TString;
                op: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"set">, import("@sinclair/typebox").TLiteral<"add">, import("@sinclair/typebox").TLiteral<"sub">]>;
                value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
            }>>>;
            weight: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"light">, import("@sinclair/typebox").TLiteral<"heavy">, import("@sinclair/typebox").TLiteral<"critical">]>>;
        }>>>;
        imageSlot: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            prompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            assetRef: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
        act: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        position: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            x: import("@sinclair/typebox").TNumber;
            y: import("@sinclair/typebox").TNumber;
        }>>;
        id: import("@sinclair/typebox").TString;
    }>>;
}>;
export type StoryNodeContentSubmission = Static<typeof StoryNodeContentToolSchema>;
export type StoryStructureSubmission = Static<typeof StoryStructureToolSchema>;
//# sourceMappingURL=tool-schemas.d.ts.map