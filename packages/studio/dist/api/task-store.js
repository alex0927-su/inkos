import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
const TASKS_DIR = ".inkos/tasks";
const writeQueues = new Map();
function taskFileName(sessionId) {
    return `${encodeURIComponent(sessionId)}.json`;
}
export function studioTaskSnapshotPath(projectRoot, sessionId) {
    return join(projectRoot, TASKS_DIR, taskFileName(sessionId));
}
function isRecord(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
}
function isExecutionStatus(value) {
    return value === "running" || value === "processing" || value === "completed" || value === "error";
}
function parseStudioTaskSnapshot(value) {
    if (!isRecord(value) || value.version !== 1)
        return null;
    if (typeof value.sessionId !== "string" || typeof value.requestedIntent !== "string")
        return null;
    if (value.sourceRequestId !== undefined && typeof value.sourceRequestId !== "string")
        return null;
    if (typeof value.updatedAt !== "number")
        return null;
    if (!isRecord(value.execution))
        return null;
    const execution = value.execution;
    if (typeof execution.id !== "string"
        || typeof execution.tool !== "string"
        || typeof execution.label !== "string"
        || !isExecutionStatus(execution.status)
        || typeof execution.startedAt !== "number")
        return null;
    if (execution.logs !== undefined && (!Array.isArray(execution.logs) || execution.logs.some((log) => typeof log !== "string"))) {
        return null;
    }
    return value;
}
export async function saveStudioTaskSnapshot(projectRoot, snapshot) {
    const path = studioTaskSnapshotPath(projectRoot, snapshot.sessionId);
    const serialized = `${JSON.stringify(snapshot, null, 2)}\n`;
    const previous = writeQueues.get(path) ?? Promise.resolve();
    const next = previous.catch(() => undefined).then(async () => {
        await mkdir(join(projectRoot, TASKS_DIR), { recursive: true });
        await writeFile(path, serialized, "utf-8");
    });
    writeQueues.set(path, next);
    try {
        await next;
    }
    finally {
        if (writeQueues.get(path) === next)
            writeQueues.delete(path);
    }
}
export async function loadStudioTaskSnapshot(projectRoot, sessionId) {
    const path = studioTaskSnapshotPath(projectRoot, sessionId);
    await writeQueues.get(path)?.catch(() => undefined);
    try {
        return parseStudioTaskSnapshot(JSON.parse(await readFile(path, "utf-8")));
    }
    catch {
        return null;
    }
}
export async function deleteStudioTaskSnapshot(projectRoot, sessionId) {
    const path = studioTaskSnapshotPath(projectRoot, sessionId);
    await writeQueues.get(path)?.catch(() => undefined);
    await unlink(path).catch(() => undefined);
}
//# sourceMappingURL=task-store.js.map