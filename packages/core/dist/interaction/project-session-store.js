import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { InteractionSessionSchema, GlobalSessionSchema } from "./session.js";
const SESSION_DIR = ".inkos";
const SESSION_FILE = "session.json";
export function resolveProjectSessionPath(projectRoot) {
    return join(projectRoot, SESSION_DIR, SESSION_FILE);
}
export function createProjectSession(projectRoot) {
    return InteractionSessionSchema.parse({
        sessionId: `${Date.now()}`,
        projectRoot,
        automationMode: "semi",
        messages: [],
    });
}
export async function loadProjectSession(projectRoot) {
    try {
        const raw = await readFile(resolveProjectSessionPath(projectRoot), "utf-8");
        return InteractionSessionSchema.parse(JSON.parse(raw));
    }
    catch {
        return createProjectSession(projectRoot);
    }
}
export async function persistProjectSession(projectRoot, session) {
    const dir = join(projectRoot, SESSION_DIR);
    await mkdir(dir, { recursive: true });
    await writeFile(resolveProjectSessionPath(projectRoot), JSON.stringify(session, null, 2), "utf-8");
}
export async function loadGlobalSession(projectRoot) {
    try {
        const raw = await readFile(join(projectRoot, SESSION_DIR, SESSION_FILE), "utf-8");
        const data = JSON.parse(raw);
        return GlobalSessionSchema.parse({
            activeBookId: data.activeBookId,
            automationMode: data.automationMode ?? "semi",
        });
    }
    catch {
        return { automationMode: "semi" };
    }
}
export async function persistGlobalSession(projectRoot, global) {
    const dir = join(projectRoot, SESSION_DIR);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, SESSION_FILE), JSON.stringify(global, null, 2));
}
export async function resolveSessionActiveBook(projectRoot, session) {
    const booksDir = join(projectRoot, "books");
    const entries = await readdir(booksDir, { withFileTypes: true }).catch(() => []);
    const bookIds = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
    if (session.activeBookId && bookIds.includes(session.activeBookId)) {
        return session.activeBookId;
    }
    if (bookIds.length === 1) {
        return bookIds[0];
    }
    return undefined;
}
//# sourceMappingURL=project-session-store.js.map