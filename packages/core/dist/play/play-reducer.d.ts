import { type PlayEdgeInput, type PlayEntity, type PlayEntityInput, type PlayEvent, type PlayEventInput, type PlayMutationInput, type PlayStateSlot, type PlayStateSlotInput } from "../models/play.js";
import type { PlayGraphSnapshot } from "./play-file-db.js";
export interface PlayReducerDB {
    readonly snapshot?: () => PlayGraphSnapshot;
    readonly replaceWithSnapshot?: (snapshot: PlayGraphSnapshot) => void;
    readonly transaction?: <T>(fn: () => T) => T;
    readonly getEntity: (id: string) => PlayEntity | null;
    readonly upsertEntity: (entity: PlayEntityInput) => void;
    readonly upsertEdge: (edge: PlayEdgeInput) => void;
    readonly expireEdge: (edgeId: string, validUntilEventId: string) => void;
    readonly upsertStateSlot: (slot: PlayStateSlotInput) => void;
    readonly getStateSlotsForEntity: (entityId: string) => PlayStateSlot[];
    readonly recordEvent: (event: PlayEventInput) => void;
}
export interface ApplyPlayMutationInput {
    readonly db: PlayReducerDB;
    readonly mutation: PlayMutationInput;
    readonly rawInput: string;
    readonly createdAt?: string;
}
export interface ApplyPlayMutationResult {
    readonly event: PlayEvent;
    readonly blocked: boolean;
}
export declare function applyPlayMutation(input: ApplyPlayMutationInput): ApplyPlayMutationResult;
export interface SeedPlayGraphInput {
    readonly db: PlayReducerDB;
    readonly mutation: PlayMutationInput;
}
export declare function seedPlayGraph(input: SeedPlayGraphInput): void;
//# sourceMappingURL=play-reducer.d.ts.map