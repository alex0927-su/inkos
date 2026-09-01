import { z } from "zod";
export declare const PlayActionKindSchema: z.ZodEnum<["look", "say", "move", "do", "wait"]>;
export type PlayActionKind = z.infer<typeof PlayActionKindSchema>;
export declare const PlayActionIntentSchema: z.ZodObject<{
    actionKind: z.ZodCatch<z.ZodEnum<["look", "say", "move", "do", "wait"]>>;
    targetEntityLabel: z.ZodCatch<z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string | undefined, string | null | undefined>>;
    targetLocationLabel: z.ZodCatch<z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string | undefined, string | null | undefined>>;
    intent: z.ZodEffects<z.ZodString, string, unknown>;
    manner: z.ZodEffects<z.ZodString, string, unknown>;
    risk: z.ZodEffects<z.ZodString, string, unknown>;
    ambiguity: z.ZodEffects<z.ZodString, string, unknown>;
    secondaryActions: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, string[], unknown[]>, string[], unknown>;
}, "strip", z.ZodTypeAny, {
    actionKind: "look" | "say" | "move" | "do" | "wait";
    intent: string;
    manner: string;
    risk: string;
    ambiguity: string;
    secondaryActions: string[];
    targetEntityLabel?: string | undefined;
    targetLocationLabel?: string | undefined;
}, {
    actionKind?: unknown;
    targetEntityLabel?: unknown;
    targetLocationLabel?: unknown;
    intent?: unknown;
    manner?: unknown;
    risk?: unknown;
    ambiguity?: unknown;
    secondaryActions?: unknown;
}>;
export type PlayActionIntentInput = z.input<typeof PlayActionIntentSchema>;
export type PlayActionIntent = z.infer<typeof PlayActionIntentSchema>;
export declare const PlayEntityTypeSchema: z.ZodEnum<["actor", "location", "item", "evidence", "clue", "claim", "proof_chain", "organization", "rule", "scene", "event"]>;
export type PlayEntityType = z.infer<typeof PlayEntityTypeSchema>;
export declare const PlayEntitySchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["actor", "location", "item", "evidence", "clue", "claim", "proof_chain", "organization", "rule", "scene", "event"]>;
    label: z.ZodString;
    summary: z.ZodDefault<z.ZodString>;
    status: z.ZodDefault<z.ZodString>;
    createdEventId: z.ZodOptional<z.ZodString>;
    updatedEventId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
    status: string;
    id: string;
    label: string;
    summary: string;
    createdEventId?: string | undefined;
    updatedEventId?: string | undefined;
}, {
    type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
    id: string;
    label: string;
    status?: string | undefined;
    summary?: string | undefined;
    createdEventId?: string | undefined;
    updatedEventId?: string | undefined;
}>;
export type PlayEntityInput = z.input<typeof PlayEntitySchema>;
export type PlayEntity = z.infer<typeof PlayEntitySchema>;
export declare const PlayVisibilitySchema: z.ZodRecord<z.ZodString, z.ZodString>;
export type PlayVisibility = z.infer<typeof PlayVisibilitySchema>;
export declare const PlayEdgeSchema: z.ZodObject<{
    id: z.ZodString;
    fromId: z.ZodString;
    type: z.ZodString;
    toId: z.ZodString;
    value: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    validFromEventId: z.ZodString;
    validUntilEventId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    sourceEventId: z.ZodString;
    visibility: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    strength: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    value: Record<string, unknown>;
    type: string;
    id: string;
    fromId: string;
    toId: string;
    validFromEventId: string;
    validUntilEventId: string | null;
    sourceEventId: string;
    visibility: Record<string, string>;
    strength?: number | undefined;
    confidence?: number | undefined;
}, {
    type: string;
    id: string;
    fromId: string;
    toId: string;
    validFromEventId: string;
    sourceEventId: string;
    value?: Record<string, unknown> | undefined;
    validUntilEventId?: string | null | undefined;
    visibility?: Record<string, string> | undefined;
    strength?: number | undefined;
    confidence?: number | undefined;
}>;
export type PlayEdgeInput = z.input<typeof PlayEdgeSchema>;
export type PlayEdge = z.infer<typeof PlayEdgeSchema>;
export declare const PlayStateSlotKindSchema: z.ZodEnum<["resource", "relation", "pressure", "clue", "evidence", "flag", "timer"]>;
export type PlayStateSlotKind = z.infer<typeof PlayStateSlotKindSchema>;
export declare const PlayStateSlotSchema: z.ZodObject<{
    id: z.ZodString;
    ownerEntityId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    kind: z.ZodEnum<["resource", "relation", "pressure", "clue", "evidence", "flag", "timer"]>;
    label: z.ZodString;
    value: z.ZodUnknown;
    updatedEventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
    label: string;
    updatedEventId: string;
    value?: unknown;
    ownerEntityId?: string | null | undefined;
}, {
    id: string;
    kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
    label: string;
    updatedEventId: string;
    value?: unknown;
    ownerEntityId?: string | null | undefined;
}>;
export type PlayStateSlotInput = z.input<typeof PlayStateSlotSchema>;
export type PlayStateSlot = z.infer<typeof PlayStateSlotSchema>;
export declare const PlayTimeAdvanceSchema: z.ZodObject<{
    elapsed: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
    anchor: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
    rationale: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
    synchronized: z.ZodDefault<z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, string[], unknown[]>, string[], unknown>>;
}, "strip", z.ZodTypeAny, {
    elapsed: string;
    anchor: string;
    rationale: string;
    synchronized: string[];
}, {
    elapsed?: unknown;
    anchor?: unknown;
    rationale?: unknown;
    synchronized?: unknown;
}>;
export type PlayTimeAdvanceInput = z.input<typeof PlayTimeAdvanceSchema>;
export type PlayTimeAdvance = z.infer<typeof PlayTimeAdvanceSchema>;
export declare const PlayEvidenceStatusSchema: z.ZodEnum<["unknown", "hinted", "seen", "collected", "verified", "weaponized", "exposed", "exhausted"]>;
export type PlayEvidenceStatus = z.infer<typeof PlayEvidenceStatusSchema>;
export declare const PlayEvidenceTransitionSchema: z.ZodObject<{
    entityId: z.ZodString;
    from: z.ZodOptional<z.ZodEnum<["unknown", "hinted", "seen", "collected", "verified", "weaponized", "exposed", "exhausted"]>>;
    to: z.ZodEnum<["unknown", "hinted", "seen", "collected", "verified", "weaponized", "exposed", "exhausted"]>;
    reason: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: string;
    entityId: string;
    to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
    from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
}, {
    entityId: string;
    to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
    reason?: string | undefined;
    from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
}>;
export type PlayEvidenceTransitionInput = z.input<typeof PlayEvidenceTransitionSchema>;
export type PlayEvidenceTransition = z.infer<typeof PlayEvidenceTransitionSchema>;
export declare const PlayEventSchema: z.ZodObject<{
    id: z.ZodString;
    turn: z.ZodNumber;
    actionKind: z.ZodEnum<["look", "say", "move", "do", "wait"]>;
    rawInput: z.ZodString;
    outcomeSummary: z.ZodDefault<z.ZodString>;
    timeAdvance: z.ZodCatch<z.ZodEffects<z.ZodOptional<z.ZodObject<{
        elapsed: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        anchor: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        rationale: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        synchronized: z.ZodDefault<z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, string[], unknown[]>, string[], unknown>>;
    }, "strip", z.ZodTypeAny, {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    }, {
        elapsed?: unknown;
        anchor?: unknown;
        rationale?: unknown;
        synchronized?: unknown;
    }>>, {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    } | undefined, unknown>>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    actionKind: "look" | "say" | "move" | "do" | "wait";
    turn: number;
    rawInput: string;
    outcomeSummary: string;
    timeAdvance?: {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    } | undefined;
}, {
    id: string;
    createdAt: string;
    actionKind: "look" | "say" | "move" | "do" | "wait";
    turn: number;
    rawInput: string;
    outcomeSummary?: string | undefined;
    timeAdvance?: unknown;
}>;
export type PlayEventInput = z.input<typeof PlayEventSchema>;
export type PlayEvent = z.infer<typeof PlayEventSchema>;
export declare const PlayMutationSchema: z.ZodEffects<z.ZodObject<{
    eventId: z.ZodCatch<z.ZodString>;
    turn: z.ZodCatch<z.ZodNumber>;
    actionKind: z.ZodCatch<z.ZodEnum<["look", "say", "move", "do", "wait"]>>;
    summary: z.ZodCatch<z.ZodEffects<z.ZodString, string, unknown>>;
    timeAdvance: z.ZodCatch<z.ZodEffects<z.ZodOptional<z.ZodObject<{
        elapsed: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        anchor: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        rationale: z.ZodDefault<z.ZodEffects<z.ZodString, string, unknown>>;
        synchronized: z.ZodDefault<z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, string[], unknown[]>, string[], unknown>>;
    }, "strip", z.ZodTypeAny, {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    }, {
        elapsed?: unknown;
        anchor?: unknown;
        rationale?: unknown;
        synchronized?: unknown;
    }>>, {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    } | undefined, unknown>>;
    entities: z.ZodCatch<z.ZodObject<{
        upsert: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, {
            type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
            status: string;
            id: string;
            label: string;
            summary: string;
            createdEventId?: string | undefined;
            updatedEventId?: string | undefined;
        }[], unknown[]>, {
            type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
            status: string;
            id: string;
            label: string;
            summary: string;
            createdEventId?: string | undefined;
            updatedEventId?: string | undefined;
        }[], unknown>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
            status: string;
            id: string;
            label: string;
            summary: string;
            createdEventId?: string | undefined;
            updatedEventId?: string | undefined;
        }[];
    }, {
        upsert?: unknown;
    }>>;
    edges: z.ZodCatch<z.ZodObject<{
        upsert: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, {
            value: Record<string, unknown>;
            type: string;
            id: string;
            fromId: string;
            toId: string;
            validFromEventId: string;
            validUntilEventId: string | null;
            sourceEventId: string;
            visibility: Record<string, string>;
            strength?: number | undefined;
            confidence?: number | undefined;
        }[], unknown[]>, {
            value: Record<string, unknown>;
            type: string;
            id: string;
            fromId: string;
            toId: string;
            validFromEventId: string;
            validUntilEventId: string | null;
            sourceEventId: string;
            visibility: Record<string, string>;
            strength?: number | undefined;
            confidence?: number | undefined;
        }[], unknown>;
        expire: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, {
            reason: string;
            validUntilEventId: string;
            edgeId: string;
        }[], unknown[]>, {
            reason: string;
            validUntilEventId: string;
            edgeId: string;
        }[], unknown>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            value: Record<string, unknown>;
            type: string;
            id: string;
            fromId: string;
            toId: string;
            validFromEventId: string;
            validUntilEventId: string | null;
            sourceEventId: string;
            visibility: Record<string, string>;
            strength?: number | undefined;
            confidence?: number | undefined;
        }[];
        expire: {
            reason: string;
            validUntilEventId: string;
            edgeId: string;
        }[];
    }, {
        upsert?: unknown;
        expire?: unknown;
    }>>;
    stateSlots: z.ZodCatch<z.ZodObject<{
        upsert: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, {
            id: string;
            kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
            label: string;
            updatedEventId: string;
            value?: unknown;
            ownerEntityId?: string | null | undefined;
        }[], unknown[]>, {
            id: string;
            kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
            label: string;
            updatedEventId: string;
            value?: unknown;
            ownerEntityId?: string | null | undefined;
        }[], unknown>;
    }, "strip", z.ZodTypeAny, {
        upsert: {
            id: string;
            kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
            label: string;
            updatedEventId: string;
            value?: unknown;
            ownerEntityId?: string | null | undefined;
        }[];
    }, {
        upsert?: unknown;
    }>>;
    evidence: z.ZodCatch<z.ZodObject<{
        transitions: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, {
            reason: string;
            entityId: string;
            to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
            from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
        }[], unknown[]>, {
            reason: string;
            entityId: string;
            to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
            from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
        }[], unknown>;
    }, "strip", z.ZodTypeAny, {
        transitions: {
            reason: string;
            entityId: string;
            to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
            from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
        }[];
    }, {
        transitions?: unknown;
    }>>;
    blocked: z.ZodCatch<z.ZodBoolean>;
    blockedReason: z.ZodCatch<z.ZodEffects<z.ZodString, string, unknown>>;
    notes: z.ZodCatch<z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, string[], unknown[]>, string[], unknown>>;
}, "strip", z.ZodTypeAny, {
    evidence: {
        transitions: {
            reason: string;
            entityId: string;
            to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
            from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
        }[];
    };
    notes: string[];
    actionKind: "look" | "say" | "move" | "do" | "wait";
    summary: string;
    turn: number;
    entities: {
        upsert: {
            type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
            status: string;
            id: string;
            label: string;
            summary: string;
            createdEventId?: string | undefined;
            updatedEventId?: string | undefined;
        }[];
    };
    edges: {
        upsert: {
            value: Record<string, unknown>;
            type: string;
            id: string;
            fromId: string;
            toId: string;
            validFromEventId: string;
            validUntilEventId: string | null;
            sourceEventId: string;
            visibility: Record<string, string>;
            strength?: number | undefined;
            confidence?: number | undefined;
        }[];
        expire: {
            reason: string;
            validUntilEventId: string;
            edgeId: string;
        }[];
    };
    stateSlots: {
        upsert: {
            id: string;
            kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
            label: string;
            updatedEventId: string;
            value?: unknown;
            ownerEntityId?: string | null | undefined;
        }[];
    };
    eventId: string;
    blocked: boolean;
    blockedReason: string;
    timeAdvance?: {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    } | undefined;
}, {
    evidence?: unknown;
    notes?: unknown;
    actionKind?: unknown;
    summary?: unknown;
    turn?: unknown;
    timeAdvance?: unknown;
    entities?: unknown;
    edges?: unknown;
    stateSlots?: unknown;
    eventId?: unknown;
    blocked?: unknown;
    blockedReason?: unknown;
}>, {
    evidence: {
        transitions: {
            reason: string;
            entityId: string;
            to: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted";
            from?: "unknown" | "hinted" | "seen" | "collected" | "verified" | "weaponized" | "exposed" | "exhausted" | undefined;
        }[];
    };
    notes: string[];
    actionKind: "look" | "say" | "move" | "do" | "wait";
    summary: string;
    turn: number;
    entities: {
        upsert: {
            type: "evidence" | "actor" | "location" | "item" | "clue" | "claim" | "proof_chain" | "organization" | "rule" | "scene" | "event";
            status: string;
            id: string;
            label: string;
            summary: string;
            createdEventId?: string | undefined;
            updatedEventId?: string | undefined;
        }[];
    };
    edges: {
        upsert: {
            value: Record<string, unknown>;
            type: string;
            id: string;
            fromId: string;
            toId: string;
            validFromEventId: string;
            validUntilEventId: string | null;
            sourceEventId: string;
            visibility: Record<string, string>;
            strength?: number | undefined;
            confidence?: number | undefined;
        }[];
        expire: {
            reason: string;
            validUntilEventId: string;
            edgeId: string;
        }[];
    };
    stateSlots: {
        upsert: {
            id: string;
            kind: "evidence" | "clue" | "resource" | "relation" | "pressure" | "flag" | "timer";
            label: string;
            updatedEventId: string;
            value?: unknown;
            ownerEntityId?: string | null | undefined;
        }[];
    };
    eventId: string;
    blocked: boolean;
    blockedReason: string;
    timeAdvance?: {
        elapsed: string;
        anchor: string;
        rationale: string;
        synchronized: string[];
    } | undefined;
}, unknown>;
export type PlayMutationInput = z.input<typeof PlayMutationSchema>;
export type PlayMutation = z.infer<typeof PlayMutationSchema>;
//# sourceMappingURL=play.d.ts.map