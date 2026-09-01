import { type PlayEdge, type PlayEdgeInput, type PlayEntity, type PlayEntityInput, type PlayEvent, type PlayEventInput, type PlayStateSlot, type PlayStateSlotInput } from "../models/play.js";
import type { PlayGraphSnapshot } from "./play-file-db.js";
export declare class PlayDB {
    private readonly db;
    constructor(runDir: string);
    private migrate;
    upsertEntity(entity: PlayEntityInput): void;
    getEntity(id: string): PlayEntity | null;
    upsertEdge(edge: PlayEdgeInput): void;
    expireEdge(edgeId: string, validUntilEventId: string): void;
    getCurrentEdgesForEntity(entityId: string): PlayEdge[];
    getEvidenceForClaim(claimId: string): PlayEntity[];
    upsertStateSlot(slot: PlayStateSlotInput): void;
    getStateSlotsForEntity(entityId: string): PlayStateSlot[];
    recordEvent(event: PlayEventInput): void;
    getEvent(id: string): PlayEvent | null;
    snapshot(): PlayGraphSnapshot;
    replaceWithSnapshot(snapshot: PlayGraphSnapshot): void;
    transaction<T>(fn: () => T): T;
    close(): void;
}
//# sourceMappingURL=play-db.d.ts.map