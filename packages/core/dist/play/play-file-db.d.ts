import { type PlayEdge, type PlayEdgeInput, type PlayEntity, type PlayEntityInput, type PlayEvent, type PlayEventInput, type PlayStateSlot, type PlayStateSlotInput } from "../models/play.js";
import type { PlayReducerDB } from "./play-reducer.js";
export interface PlayGraphSnapshot {
    readonly entities: PlayEntity[];
    readonly edges: PlayEdge[];
    readonly stateSlots: PlayStateSlot[];
    readonly events: PlayEvent[];
}
export declare class PlayFileDB implements PlayReducerDB {
    private readonly filePath;
    private data;
    private transactionBackup;
    constructor(runDir: string);
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
    private load;
    private persistIfNeeded;
    private persist;
}
//# sourceMappingURL=play-file-db.d.ts.map