import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { PlayEdgeSchema, PlayEntitySchema, PlayEventSchema, PlayStateSlotSchema, } from "../models/play.js";
const require = createRequire(import.meta.url);
const ENTITY_SELECT_COLUMNS = `
  entities.id,
  entities.type,
  entities.label,
  entities.summary,
  entities.status,
  entities.created_event AS createdEventId,
  entities.updated_event AS updatedEventId
`;
const EDGE_SELECT_COLUMNS = `
  id,
  from_id AS fromId,
  type,
  to_id AS toId,
  value_json AS valueJson,
  valid_from_event AS validFromEventId,
  valid_until_event AS validUntilEventId,
  source_event_id AS sourceEventId,
  visibility_json AS visibilityJson,
  strength,
  confidence
`;
const STATE_SLOT_SELECT_COLUMNS = `
  id,
  owner_entity_id AS ownerEntityId,
  kind,
  label,
  value_json AS valueJson,
  updated_event AS updatedEventId
`;
const EVENT_SELECT_COLUMNS = `
  id,
  turn,
  action_kind AS actionKind,
  raw_input AS rawInput,
  outcome_summary AS outcomeSummary,
  created_at AS createdAt
`;
export class PlayDB {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db;
    constructor(runDir) {
        mkdirSync(runDir, { recursive: true });
        const { DatabaseSync } = require("node:sqlite");
        this.db = new DatabaseSync(join(runDir, "play.db"));
        this.db.exec("PRAGMA journal_mode = WAL");
        this.migrate();
    }
    migrate() {
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS entities (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        label TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT '',
        created_event TEXT,
        updated_event TEXT
      );

      CREATE TABLE IF NOT EXISTS edges (
        id TEXT PRIMARY KEY,
        from_id TEXT NOT NULL,
        type TEXT NOT NULL,
        to_id TEXT NOT NULL,
        value_json TEXT NOT NULL DEFAULT '{}',
        valid_from_event TEXT NOT NULL,
        valid_until_event TEXT,
        source_event_id TEXT NOT NULL,
        visibility_json TEXT NOT NULL DEFAULT '{}',
        strength REAL,
        confidence REAL
      );

      CREATE TABLE IF NOT EXISTS state_slots (
        id TEXT PRIMARY KEY,
        owner_entity_id TEXT,
        kind TEXT NOT NULL,
        label TEXT NOT NULL,
        value_json TEXT NOT NULL,
        updated_event TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        turn INTEGER NOT NULL,
        action_kind TEXT NOT NULL,
        raw_input TEXT NOT NULL,
        outcome_summary TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_play_edges_from ON edges(from_id, valid_until_event);
      CREATE INDEX IF NOT EXISTS idx_play_edges_to ON edges(to_id, type, valid_until_event);
      CREATE INDEX IF NOT EXISTS idx_play_state_owner ON state_slots(owner_entity_id);
      CREATE INDEX IF NOT EXISTS idx_play_events_turn ON events(turn);
    `);
    }
    upsertEntity(entity) {
        const parsed = PlayEntitySchema.parse(entity);
        this.db.prepare(`INSERT OR REPLACE INTO entities (id, type, label, summary, status, created_event, updated_event)
       VALUES (?, ?, ?, ?, ?, ?, ?)`).run(parsed.id, parsed.type, parsed.label, parsed.summary, parsed.status, parsed.createdEventId ?? null, parsed.updatedEventId ?? null);
    }
    getEntity(id) {
        const row = this.db.prepare(`SELECT ${ENTITY_SELECT_COLUMNS} FROM entities WHERE id = ?`).get(id);
        return row ? rowToEntity(row) : null;
    }
    upsertEdge(edge) {
        const parsed = PlayEdgeSchema.parse(edge);
        this.db.prepare(`INSERT OR REPLACE INTO edges (
         id, from_id, type, to_id, value_json, valid_from_event, valid_until_event,
         source_event_id, visibility_json, strength, confidence
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(parsed.id, parsed.fromId, parsed.type, parsed.toId, JSON.stringify(parsed.value), parsed.validFromEventId, parsed.validUntilEventId, parsed.sourceEventId, JSON.stringify(parsed.visibility), parsed.strength ?? null, parsed.confidence ?? null);
    }
    expireEdge(edgeId, validUntilEventId) {
        this.db.prepare("UPDATE edges SET valid_until_event = ? WHERE id = ?").run(validUntilEventId, edgeId);
    }
    getCurrentEdgesForEntity(entityId) {
        const rows = this.db.prepare(`SELECT ${EDGE_SELECT_COLUMNS}
       FROM edges
       WHERE (from_id = ? OR to_id = ?) AND valid_until_event IS NULL
       ORDER BY type, id`).all(entityId, entityId);
        return rows.map(rowToEdge);
    }
    getEvidenceForClaim(claimId) {
        const rows = this.db.prepare(`SELECT ${ENTITY_SELECT_COLUMNS}
       FROM entities
       INNER JOIN edges ON entities.id = edges.from_id
       WHERE edges.to_id = ?
         AND edges.type = 'supports'
         AND edges.valid_until_event IS NULL
         AND entities.type IN ('evidence', 'clue')
       ORDER BY COALESCE(edges.strength, 0) DESC, entities.id ASC`).all(claimId);
        return rows.map(rowToEntity);
    }
    upsertStateSlot(slot) {
        const parsed = PlayStateSlotSchema.parse(slot);
        this.db.prepare(`INSERT OR REPLACE INTO state_slots (id, owner_entity_id, kind, label, value_json, updated_event)
       VALUES (?, ?, ?, ?, ?, ?)`).run(parsed.id, parsed.ownerEntityId ?? null, parsed.kind, parsed.label, JSON.stringify(parsed.value), parsed.updatedEventId);
    }
    getStateSlotsForEntity(entityId) {
        const rows = this.db.prepare(`SELECT ${STATE_SLOT_SELECT_COLUMNS}
       FROM state_slots
       WHERE owner_entity_id = ?
       ORDER BY kind, label, id`).all(entityId);
        return rows.map(rowToStateSlot);
    }
    recordEvent(event) {
        const parsed = PlayEventSchema.parse(event);
        this.db.prepare(`INSERT OR REPLACE INTO events (id, turn, action_kind, raw_input, outcome_summary, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`).run(parsed.id, parsed.turn, parsed.actionKind, parsed.rawInput, parsed.outcomeSummary, parsed.createdAt);
    }
    getEvent(id) {
        const row = this.db.prepare(`SELECT ${EVENT_SELECT_COLUMNS} FROM events WHERE id = ?`).get(id);
        return row ? PlayEventSchema.parse(row) : null;
    }
    snapshot() {
        const entities = this.db.prepare(`SELECT ${ENTITY_SELECT_COLUMNS} FROM entities ORDER BY id`).all();
        const edges = this.db.prepare(`SELECT ${EDGE_SELECT_COLUMNS} FROM edges ORDER BY id`).all();
        const stateSlots = this.db.prepare(`SELECT ${STATE_SLOT_SELECT_COLUMNS} FROM state_slots ORDER BY id`).all();
        const events = this.db.prepare(`SELECT ${EVENT_SELECT_COLUMNS} FROM events ORDER BY turn, id`).all();
        return {
            entities: entities.map(rowToEntity),
            edges: edges.map(rowToEdge),
            stateSlots: stateSlots.map(rowToStateSlot),
            events: events.map((row) => PlayEventSchema.parse(row)),
        };
    }
    replaceWithSnapshot(snapshot) {
        this.transaction(() => {
            this.db.prepare("DELETE FROM state_slots").run();
            this.db.prepare("DELETE FROM edges").run();
            this.db.prepare("DELETE FROM entities").run();
            this.db.prepare("DELETE FROM events").run();
            for (const event of snapshot.events)
                this.recordEvent(event);
            for (const entity of snapshot.entities)
                this.upsertEntity(entity);
            for (const edge of snapshot.edges)
                this.upsertEdge(edge);
            for (const slot of snapshot.stateSlots)
                this.upsertStateSlot(slot);
        });
    }
    transaction(fn) {
        this.db.exec("BEGIN IMMEDIATE");
        try {
            const result = fn();
            this.db.exec("COMMIT");
            return result;
        }
        catch (error) {
            this.db.exec("ROLLBACK");
            throw error;
        }
    }
    close() {
        this.db.close();
    }
}
function rowToEntity(row) {
    return PlayEntitySchema.parse({
        id: row.id,
        type: row.type,
        label: row.label,
        summary: row.summary,
        status: row.status,
        ...(row.createdEventId ? { createdEventId: row.createdEventId } : {}),
        ...(row.updatedEventId ? { updatedEventId: row.updatedEventId } : {}),
    });
}
function rowToEdge(row) {
    return PlayEdgeSchema.parse({
        id: row.id,
        fromId: row.fromId,
        type: row.type,
        toId: row.toId,
        value: parseJsonObject(row.valueJson),
        validFromEventId: row.validFromEventId,
        validUntilEventId: row.validUntilEventId,
        sourceEventId: row.sourceEventId,
        visibility: parseJsonObject(row.visibilityJson),
        ...(row.strength === null ? {} : { strength: row.strength }),
        ...(row.confidence === null ? {} : { confidence: row.confidence }),
    });
}
function rowToStateSlot(row) {
    return PlayStateSlotSchema.parse({
        id: row.id,
        ownerEntityId: row.ownerEntityId,
        kind: row.kind,
        label: row.label,
        value: JSON.parse(row.valueJson),
        updatedEventId: row.updatedEventId,
    });
}
function parseJsonObject(value) {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : {};
}
//# sourceMappingURL=play-db.js.map