import { appendFile, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join, normalize, sep } from "node:path";
import { z } from "zod";
import { PlayEventSchema } from "../models/play.js";
const WORLDS_DIR = "worlds";
const PlayTranscriptTurnSchema = z.object({
    role: z.enum(["user", "assistant", "system", "tool"]),
    content: z.string(),
    timestamp: z.number().int().nonnegative(),
});
const PlayWorldSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    premise: z.string().default(""),
    worldContract: z.string().default(""),
    visualContract: z.string().default(""),
    mode: z.enum(["open", "guided"]).default("open"),
    language: z.enum(["zh", "en"]).default("zh"),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
});
export class PlayStore {
    projectRoot;
    constructor(projectRoot) {
        this.projectRoot = projectRoot;
    }
    worldDir(worldId) {
        return join(this.projectRoot, WORLDS_DIR, assertSafeSegment(worldId));
    }
    runDir(worldId, runId) {
        return join(this.worldDir(worldId), "runs", assertSafeSegment(runId));
    }
    async ensureWorld(worldId) {
        await mkdir(this.worldDir(worldId), { recursive: true });
    }
    async createWorld(input) {
        const now = new Date().toISOString();
        const world = PlayWorldSchema.parse({
            ...input,
            id: assertSafeSegment(input.id),
            createdAt: input.createdAt ?? now,
            updatedAt: input.updatedAt ?? now,
        });
        await this.ensureWorld(world.id);
        await writeFile(join(this.worldDir(world.id), "world.json"), `${JSON.stringify(world, null, 2)}\n`, "utf-8");
        return world;
    }
    async removeWorld(worldId) {
        await rm(this.worldDir(worldId), { recursive: true, force: true });
    }
    async updateWorld(worldId, patch) {
        const current = await this.loadWorld(worldId);
        if (!current) {
            throw new Error(`Play world not found: ${worldId}`);
        }
        const world = PlayWorldSchema.parse({
            ...current,
            ...patch,
            id: current.id,
            title: current.title,
            language: current.language,
            createdAt: current.createdAt,
            updatedAt: new Date().toISOString(),
        });
        await this.ensureWorld(world.id);
        await writeFile(join(this.worldDir(world.id), "world.json"), `${JSON.stringify(world, null, 2)}\n`, "utf-8");
        return world;
    }
    async loadWorld(worldId) {
        try {
            const raw = await readFile(join(this.worldDir(worldId), "world.json"), "utf-8");
            const parsed = PlayWorldSchema.safeParse(JSON.parse(raw));
            return parsed.success ? parsed.data : null;
        }
        catch {
            return null;
        }
    }
    async listWorlds() {
        const worldsRoot = join(this.projectRoot, WORLDS_DIR);
        let entries;
        try {
            entries = await readdir(worldsRoot);
        }
        catch {
            return [];
        }
        const worlds = [];
        for (const entry of entries.sort()) {
            if (!isSafeSegment(entry))
                continue;
            const entryStat = await stat(join(worldsRoot, entry)).catch(() => null);
            if (!entryStat?.isDirectory())
                continue;
            const world = await this.loadWorld(entry);
            worlds.push(world ?? PlayWorldSchema.parse({
                id: entry,
                title: entry,
                premise: "",
                mode: "open",
                createdAt: entryStat.birthtime.toISOString(),
                updatedAt: entryStat.mtime.toISOString(),
            }));
        }
        return worlds.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id));
    }
    async ensureRun(worldId, runId) {
        const dir = this.runDir(worldId, runId);
        await Promise.all([
            mkdir(dir, { recursive: true }),
            mkdir(join(dir, "state"), { recursive: true }),
            mkdir(join(dir, "projections"), { recursive: true }),
            mkdir(join(dir, "summaries"), { recursive: true }),
            mkdir(join(dir, "checkpoints"), { recursive: true }),
        ]);
    }
    async listRuns(worldId) {
        const runsRoot = join(this.worldDir(worldId), "runs");
        let entries;
        try {
            entries = await readdir(runsRoot);
        }
        catch {
            return [];
        }
        const runs = [];
        for (const entry of entries.sort()) {
            if (!isSafeSegment(entry))
                continue;
            const runDir = join(runsRoot, entry);
            const entryStat = await stat(runDir).catch(() => null);
            if (!entryStat?.isDirectory())
                continue;
            const [events, transcript] = await Promise.all([
                this.readEvents(worldId, entry),
                this.readTranscript(worldId, entry),
            ]);
            runs.push({
                id: entry,
                updatedAt: entryStat.mtime.toISOString(),
                eventCount: events.length,
                transcriptCount: transcript.length,
            });
        }
        return runs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id));
    }
    async appendEvent(worldId, runId, event) {
        await this.ensureRun(worldId, runId);
        await this.appendJsonLine(this.eventsPath(worldId, runId), PlayEventSchema.parse(event));
    }
    async appendRawEventLine(worldId, runId, line) {
        await this.ensureRun(worldId, runId);
        await appendFile(this.eventsPath(worldId, runId), `${line}\n`, "utf-8");
    }
    async readEvents(worldId, runId) {
        return this.readJsonLines(this.eventsPath(worldId, runId), PlayEventSchema);
    }
    async appendTranscriptTurn(worldId, runId, turn) {
        await this.ensureRun(worldId, runId);
        await this.appendJsonLine(this.transcriptPath(worldId, runId), PlayTranscriptTurnSchema.parse(turn));
    }
    async readTranscript(worldId, runId) {
        return this.readJsonLines(this.transcriptPath(worldId, runId), PlayTranscriptTurnSchema);
    }
    async saveCurrentState(worldId, runId, state) {
        await this.ensureRun(worldId, runId);
        await writeFile(join(this.runDir(worldId, runId), "state", "current.json"), `${JSON.stringify(state, null, 2)}\n`, "utf-8");
    }
    async loadCurrentState(worldId, runId) {
        const raw = await readFile(join(this.runDir(worldId, runId), "state", "current.json"), "utf-8");
        return JSON.parse(raw);
    }
    async writeProjection(worldId, runId, relativePath, content) {
        await this.ensureRun(worldId, runId);
        const target = this.safeRunChildPath(worldId, runId, relativePath);
        await mkdir(join(target, ".."), { recursive: true });
        await writeFile(target, content, "utf-8");
    }
    async readProjection(worldId, runId, relativePath) {
        return readFile(this.safeRunChildPath(worldId, runId, relativePath), "utf-8");
    }
    async captureRunSnapshot(worldId, runId, input) {
        await this.ensureRun(worldId, runId);
        return {
            id: input.id,
            turn: input.turn,
            createdAt: new Date().toISOString(),
            eventsRaw: await this.readOptionalRunFile(worldId, runId, "events.jsonl"),
            transcriptRaw: await this.readOptionalRunFile(worldId, runId, "transcript.jsonl"),
            currentStateRaw: await this.readOptionalRunFile(worldId, runId, join("state", "current.json")),
            sceneProjection: await this.readOptionalRunFile(worldId, runId, join("projections", "scene.md")),
            stateProjection: await this.readOptionalRunFile(worldId, runId, join("projections", "state.md")),
            graph: structuredClone(input.graph),
        };
    }
    async saveCheckpoint(worldId, runId, snapshot) {
        await this.ensureRun(worldId, runId);
        await writeFile(this.safeRunChildPath(worldId, runId, join("checkpoints", `${assertSafeSegment(snapshot.id)}.json`)), `${JSON.stringify(snapshot, null, 2)}\n`, "utf-8");
    }
    async loadCheckpoint(worldId, runId, checkpointId) {
        return this.loadSnapshotFile(worldId, runId, join("checkpoints", `${assertSafeSegment(checkpointId)}.json`));
    }
    async saveVariant(worldId, runId, turn, snapshot) {
        const variantId = `v-${randomUUID()}`;
        await this.ensureRun(worldId, runId);
        const relativePath = join("variants", `turn-${turn}`, `${variantId}.json`);
        await mkdir(join(this.runDir(worldId, runId), "variants", `turn-${turn}`), { recursive: true });
        await writeFile(this.safeRunChildPath(worldId, runId, relativePath), `${JSON.stringify({ ...snapshot, id: variantId }, null, 2)}\n`, "utf-8");
        return variantId;
    }
    async loadVariant(worldId, runId, turn, variantId) {
        return this.loadSnapshotFile(worldId, runId, join("variants", `turn-${turn}`, `${assertSafeSegment(variantId)}.json`));
    }
    async restoreRunSnapshot(worldId, runId, snapshot, db) {
        await this.ensureRun(worldId, runId);
        db.replaceWithSnapshot(snapshot.graph);
        await writeFile(this.eventsPath(worldId, runId), snapshot.eventsRaw, "utf-8");
        await writeFile(this.transcriptPath(worldId, runId), snapshot.transcriptRaw, "utf-8");
        await writeFile(this.safeRunChildPath(worldId, runId, join("state", "current.json")), snapshot.currentStateRaw, "utf-8");
        await this.writeProjection(worldId, runId, "projections/scene.md", snapshot.sceneProjection);
        await this.writeProjection(worldId, runId, "projections/state.md", snapshot.stateProjection);
    }
    eventsPath(worldId, runId) {
        return join(this.runDir(worldId, runId), "events.jsonl");
    }
    transcriptPath(worldId, runId) {
        return join(this.runDir(worldId, runId), "transcript.jsonl");
    }
    async appendJsonLine(path, value) {
        await appendFile(path, `${JSON.stringify(value)}\n`, "utf-8");
    }
    async readJsonLines(path, schema) {
        let raw;
        try {
            raw = await readFile(path, "utf-8");
        }
        catch {
            return [];
        }
        const rows = [];
        for (const line of raw.split(/\r?\n/)) {
            if (!line.trim())
                continue;
            try {
                const parsed = schema.safeParse(JSON.parse(line));
                if (parsed.success)
                    rows.push(parsed.data);
            }
            catch {
                // Ignore malformed rows so one interrupted write does not break a run.
            }
        }
        return rows;
    }
    async readOptionalRunFile(worldId, runId, relativePath) {
        try {
            return await readFile(this.safeRunChildPath(worldId, runId, relativePath), "utf-8");
        }
        catch {
            return "";
        }
    }
    async loadSnapshotFile(worldId, runId, relativePath) {
        try {
            const raw = await readFile(this.safeRunChildPath(worldId, runId, relativePath), "utf-8");
            return PlayRunSnapshotSchema.parse(JSON.parse(raw));
        }
        catch {
            return null;
        }
    }
    safeRunChildPath(worldId, runId, relativePath) {
        if (!relativePath || relativePath.startsWith("/") || relativePath.includes("\0")) {
            throw new Error(`Unsafe play path: ${relativePath}`);
        }
        const normalized = normalize(relativePath);
        if (normalized === ".." || normalized.startsWith(`..${sep}`)) {
            throw new Error(`Unsafe play path: ${relativePath}`);
        }
        return join(this.runDir(worldId, runId), normalized);
    }
}
const PlayRunSnapshotSchema = z.object({
    id: z.string().min(1),
    turn: z.number().int().min(0),
    createdAt: z.string().min(1),
    eventsRaw: z.string(),
    transcriptRaw: z.string(),
    currentStateRaw: z.string(),
    sceneProjection: z.string(),
    stateProjection: z.string(),
    graph: z.object({
        entities: z.array(z.unknown()),
        edges: z.array(z.unknown()),
        stateSlots: z.array(z.unknown()),
        events: z.array(z.unknown()),
    }),
});
function assertSafeSegment(value) {
    if (!isSafeSegment(value)) {
        throw new Error(`Unsafe play path segment: ${value}`);
    }
    return value;
}
function isSafeSegment(value) {
    return Boolean(value) &&
        !value.includes("/") &&
        !value.includes("\\") &&
        !value.includes("\0") &&
        value !== "." &&
        value !== "..";
}
//# sourceMappingURL=play-store.js.map