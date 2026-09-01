import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { StoryGraphSchema } from "./graph-schema.js";
import { applyStoryGraphDelta } from "./delta.js";
import { loadStoryGraph, saveStoryGraph, storyGraphPath } from "./graph-store.js";
const SNAPSHOT_KEEP = 20;
// Per-project async mutex: concurrent applyGraphDelta calls to the same project
// run strictly one-at-a-time so no rev or update is silently lost.
const projectLocks = new Map();
async function withProjectLock(key, fn) {
    const prev = projectLocks.get(key) ?? Promise.resolve();
    let release;
    const gate = new Promise((r) => { release = r; });
    projectLocks.set(key, prev.then(() => gate));
    await prev.catch(() => { }); // wait for predecessor; ignore its error for ordering
    try {
        return await fn();
    }
    finally {
        release();
    }
}
const DEFAULT_STATE = { phase: "world", rev: 0 };
function projectDir(projectRoot, projectId) {
    return dirname(storyGraphPath(projectRoot, projectId));
}
export function authoringStatePath(projectRoot, projectId) {
    return join(projectDir(projectRoot, projectId), "authoring-state.json");
}
export async function loadAuthoringState(projectRoot, projectId) {
    try {
        const raw = await readFile(authoringStatePath(projectRoot, projectId), "utf-8");
        const parsed = JSON.parse(raw);
        const validPhases = new Set(["world", "scale", "structure", "workshop"]);
        const phase = typeof parsed.phase === "string" && validPhases.has(parsed.phase)
            ? parsed.phase
            : DEFAULT_STATE.phase;
        return {
            phase,
            rev: typeof parsed.rev === "number" ? parsed.rev : DEFAULT_STATE.rev,
            ...(parsed.phaseRevs !== undefined && { phaseRevs: parsed.phaseRevs }),
        };
    }
    catch (error) {
        if (error.code === "ENOENT")
            return DEFAULT_STATE;
        throw error;
    }
}
function emptyGraph(projectId) {
    return StoryGraphSchema.parse({
        schemaVersion: 1, projectId, title: "", variables: [], nodes: [], endings: [], characters: [],
    });
}
function snapshotDir(projectRoot, projectId) {
    return join(projectDir(projectRoot, projectId), "snapshots");
}
async function writeSnapshot(projectRoot, projectId, rev, graph) {
    const dir = snapshotDir(projectRoot, projectId);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, `${rev}.json`), JSON.stringify(graph, null, 2), "utf-8");
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    const revs = files.map((f) => Number(f.replace(".json", ""))).filter((n) => !Number.isNaN(n)).sort((a, b) => a - b);
    for (const old of revs.slice(0, Math.max(0, revs.length - SNAPSHOT_KEEP))) {
        await rm(join(dir, `${old}.json`), { force: true });
    }
}
/**
 * Applies a delta to the project's story graph and advances the authoring rev.
 *
 * The returned graph shares element references with the input; callers must
 * treat it as immutable — do not mutate nodes/arrays in place.
 *
 * Concurrent calls for the same project are serialized via a per-project async
 * mutex, preventing lost-update races (two callers both reading rev=N and both
 * writing rev=N+1).
 */
export async function applyGraphDelta(params) {
    const lockKey = `${params.projectRoot}::${params.projectId}`;
    return withProjectLock(lockKey, async () => {
        const current = (await loadStoryGraph(params.projectRoot, params.projectId)) ?? emptyGraph(params.projectId);
        const state = await loadAuthoringState(params.projectRoot, params.projectId);
        // Snapshot the pre-apply graph under the current rev so revert(rev) restores it.
        // Note: no snapshot is written for the latest rev — the live graph file IS the latest rev.
        await writeSnapshot(params.projectRoot, params.projectId, state.rev, current);
        const graph = applyStoryGraphDelta({ graph: current, delta: params.delta });
        await saveStoryGraph(params.projectRoot, params.projectId, graph);
        const nextRev = state.rev + 1;
        const nextState = { phase: params.phase ?? state.phase, rev: nextRev, phaseRevs: state.phaseRevs };
        await mkdir(projectDir(params.projectRoot, params.projectId), { recursive: true });
        await writeFile(authoringStatePath(params.projectRoot, params.projectId), JSON.stringify(nextState, null, 2), "utf-8");
        return { graph, rev: nextRev };
    });
}
export async function revertToSnapshot(params) {
    const file = join(snapshotDir(params.projectRoot, params.projectId), `${params.rev}.json`);
    const raw = await readFile(file, "utf-8");
    const graph = StoryGraphSchema.parse(JSON.parse(raw));
    await saveStoryGraph(params.projectRoot, params.projectId, graph);
    return graph;
}
export async function recordPhaseVisit(projectRoot, projectId, phase) {
    const lockKey = `${projectRoot}::${projectId}`;
    return withProjectLock(lockKey, async () => {
        const state = await loadAuthoringState(projectRoot, projectId);
        const next = {
            ...state,
            phaseRevs: { ...(state.phaseRevs ?? {}), [phase]: state.rev },
        };
        await mkdir(projectDir(projectRoot, projectId), { recursive: true });
        await writeFile(authoringStatePath(projectRoot, projectId), JSON.stringify(next, null, 2), "utf-8");
    });
}
//# sourceMappingURL=authoring-store.js.map