import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PlayEdgeSchema, PlayEntitySchema, PlayEventSchema, PlayStateSlotSchema, } from "../models/play.js";
export class PlayFileDB {
    filePath;
    data;
    transactionBackup = null;
    constructor(runDir) {
        mkdirSync(runDir, { recursive: true });
        this.filePath = join(runDir, "play-graph.json");
        this.data = this.load();
    }
    upsertEntity(entity) {
        const parsed = PlayEntitySchema.parse(entity);
        this.data.entities[parsed.id] = parsed;
        this.persistIfNeeded();
    }
    getEntity(id) {
        return this.data.entities[id] ?? null;
    }
    upsertEdge(edge) {
        const parsed = PlayEdgeSchema.parse(edge);
        this.data.edges[parsed.id] = parsed;
        this.persistIfNeeded();
    }
    expireEdge(edgeId, validUntilEventId) {
        const edge = this.data.edges[edgeId];
        if (edge) {
            this.data.edges[edgeId] = { ...edge, validUntilEventId };
            this.persistIfNeeded();
        }
    }
    getCurrentEdgesForEntity(entityId) {
        return Object.values(this.data.edges)
            .filter((edge) => edge.validUntilEventId === null && (edge.fromId === entityId || edge.toId === entityId))
            .sort((a, b) => `${a.type}:${a.id}`.localeCompare(`${b.type}:${b.id}`));
    }
    getEvidenceForClaim(claimId) {
        return Object.values(this.data.edges)
            .filter((edge) => edge.validUntilEventId === null && edge.type === "supports" && edge.toId === claimId)
            .map((edge) => this.data.entities[edge.fromId])
            .filter((entity) => !!entity && (entity.type === "evidence" || entity.type === "clue"))
            .sort((a, b) => a.id.localeCompare(b.id));
    }
    upsertStateSlot(slot) {
        const parsed = PlayStateSlotSchema.parse(slot);
        this.data.stateSlots[parsed.id] = parsed;
        this.persistIfNeeded();
    }
    getStateSlotsForEntity(entityId) {
        return Object.values(this.data.stateSlots)
            .filter((slot) => slot.ownerEntityId === entityId)
            .sort((a, b) => `${a.kind}:${a.label}:${a.id}`.localeCompare(`${b.kind}:${b.label}:${b.id}`));
    }
    recordEvent(event) {
        const parsed = PlayEventSchema.parse(event);
        this.data.events[parsed.id] = parsed;
        this.persistIfNeeded();
    }
    getEvent(id) {
        return this.data.events[id] ?? null;
    }
    snapshot() {
        return {
            entities: Object.values(this.data.entities).sort((a, b) => a.id.localeCompare(b.id)),
            edges: Object.values(this.data.edges).sort((a, b) => a.id.localeCompare(b.id)),
            stateSlots: Object.values(this.data.stateSlots).sort((a, b) => a.id.localeCompare(b.id)),
            events: Object.values(this.data.events).sort((a, b) => a.turn - b.turn || a.id.localeCompare(b.id)),
        };
    }
    replaceWithSnapshot(snapshot) {
        const replace = () => {
            this.data = {
                entities: Object.fromEntries(snapshot.entities.map((entity) => [entity.id, PlayEntitySchema.parse(entity)])),
                edges: Object.fromEntries(snapshot.edges.map((edge) => [edge.id, PlayEdgeSchema.parse(edge)])),
                stateSlots: Object.fromEntries(snapshot.stateSlots.map((slot) => [slot.id, PlayStateSlotSchema.parse(slot)])),
                events: Object.fromEntries(snapshot.events.map((event) => [event.id, PlayEventSchema.parse(event)])),
            };
        };
        if (this.transactionBackup) {
            replace();
            return;
        }
        replace();
        this.persist();
    }
    transaction(fn) {
        if (this.transactionBackup) {
            return fn();
        }
        this.transactionBackup = cloneData(this.data);
        try {
            const result = fn();
            this.transactionBackup = null;
            this.persist();
            return result;
        }
        catch (error) {
            const backup = this.transactionBackup;
            if (backup)
                this.data = backup;
            this.transactionBackup = null;
            this.persist();
            throw error;
        }
    }
    close() {
        this.persist();
    }
    load() {
        if (!existsSync(this.filePath))
            return emptyData();
        try {
            const parsed = JSON.parse(readFileSync(this.filePath, "utf-8"));
            return {
                entities: parseRecord(parsed.entities, PlayEntitySchema),
                edges: parseRecord(parsed.edges, PlayEdgeSchema),
                stateSlots: parseRecord(parsed.stateSlots, PlayStateSlotSchema),
                events: parseRecord(parsed.events, PlayEventSchema),
            };
        }
        catch {
            return emptyData();
        }
    }
    persistIfNeeded() {
        if (!this.transactionBackup)
            this.persist();
    }
    persist() {
        writeFileSync(this.filePath, `${JSON.stringify(this.data, null, 2)}\n`, "utf-8");
    }
}
function emptyData() {
    return {
        entities: {},
        edges: {},
        stateSlots: {},
        events: {},
    };
}
function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}
function parseRecord(value, schema) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return {};
    const result = {};
    for (const [key, item] of Object.entries(value)) {
        const parsed = schema.safeParse(item);
        if (parsed.success)
            result[key] = parsed.data;
    }
    return result;
}
//# sourceMappingURL=play-file-db.js.map