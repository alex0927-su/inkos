import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { assertSafeBookId } from "../utils/book-id.js";
import { safeChildPath } from "../utils/path-safety.js";
const MANIFEST_FILE = "reference_bindings.json";
const MAX_USES = 12;
const MAX_USE_LENGTH = 120;
const MAX_NOTE_LENGTH = 2_000;
export async function bindBookReference(projectRoot, bookId, input, deps = {}) {
    const safeBookId = assertSafeBookId(bookId);
    await assertBookExists(projectRoot, safeBookId);
    const materialId = assertMaterialId(input.materialId);
    await loadMaterialAsset(projectRoot, materialId);
    const uses = normalizeUses(input.uses);
    const note = normalizeNote(input.note);
    const current = await loadBookReferenceManifest(projectRoot, safeBookId);
    const now = (deps.now?.() ?? new Date()).toISOString();
    const existing = current.bindings.find((binding) => binding.materialId === materialId);
    const binding = {
        materialId,
        uses,
        ...(note ? { note } : {}),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
    };
    const next = {
        version: 1,
        bookId: safeBookId,
        bindings: [
            ...current.bindings.filter((entry) => entry.materialId !== materialId),
            binding,
        ],
    };
    await writeManifestAtomic(projectRoot, next);
    return next;
}
export async function unbindBookReference(projectRoot, bookId, materialIdInput) {
    const safeBookId = assertSafeBookId(bookId);
    await assertBookExists(projectRoot, safeBookId);
    const materialId = assertMaterialId(materialIdInput);
    const current = await loadBookReferenceManifest(projectRoot, safeBookId);
    const bindings = current.bindings.filter((binding) => binding.materialId !== materialId);
    const removed = bindings.length !== current.bindings.length;
    const manifest = { ...current, bindings };
    if (removed)
        await writeManifestAtomic(projectRoot, manifest);
    return { removed, manifest };
}
export async function listBookReferences(projectRoot, bookId) {
    const safeBookId = assertSafeBookId(bookId);
    await assertBookExists(projectRoot, safeBookId);
    const manifest = await loadBookReferenceManifest(projectRoot, safeBookId);
    const references = await Promise.all(manifest.bindings.map(async (binding) => {
        try {
            const asset = await loadMaterialAsset(projectRoot, binding.materialId);
            return { ...binding, available: true, title: asset.title, asset };
        }
        catch (error) {
            return {
                ...binding,
                available: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }));
    return { manifest, references };
}
export async function loadBookReferenceManifest(projectRoot, bookId) {
    const safeBookId = assertSafeBookId(bookId);
    const path = referenceManifestPath(projectRoot, safeBookId);
    let raw;
    try {
        raw = await readFile(path, "utf-8");
    }
    catch (error) {
        if (isMissingFile(error)) {
            return { version: 1, bookId: safeBookId, bindings: [] };
        }
        throw error;
    }
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || parsed.bookId !== safeBookId || !Array.isArray(parsed.bindings)) {
        throw new Error(`Invalid book reference manifest: ${path}`);
    }
    return {
        version: 1,
        bookId: safeBookId,
        bindings: parsed.bindings.map(parseBinding),
    };
}
export async function loadMaterialAsset(projectRoot, materialIdInput) {
    const materialId = assertMaterialId(materialIdInput);
    const materialsDir = join(projectRoot, ".inkos", "materials");
    const manifestPath = safeChildPath(materialsDir, `${materialId}.json`);
    const parsed = JSON.parse(await readFile(manifestPath, "utf-8"));
    if (parsed.id !== materialId
        || typeof parsed.title !== "string"
        || typeof parsed.markdownPath !== "string"
        || typeof parsed.manifestPath !== "string") {
        throw new Error(`Invalid material manifest: ${manifestPath}`);
    }
    const expectedMarkdownPath = safeChildPath(materialsDir, `${materialId}.md`);
    const resolvedMarkdownPath = safeChildPath(projectRoot, parsed.markdownPath);
    if (resolvedMarkdownPath !== expectedMarkdownPath) {
        throw new Error(`Material markdown path does not match its asset id: ${manifestPath}`);
    }
    return parsed;
}
function parseBinding(value) {
    if (!value || typeof value !== "object")
        throw new Error("Invalid book reference binding.");
    const binding = value;
    const materialId = assertMaterialId(binding.materialId ?? "");
    const uses = normalizeUses(binding.uses ?? []);
    if (typeof binding.createdAt !== "string" || typeof binding.updatedAt !== "string") {
        throw new Error(`Invalid timestamps for book reference binding ${materialId}.`);
    }
    const note = normalizeNote(binding.note);
    return {
        materialId,
        uses,
        ...(note ? { note } : {}),
        createdAt: binding.createdAt,
        updatedAt: binding.updatedAt,
    };
}
function normalizeUses(values) {
    if (!Array.isArray(values))
        throw new Error("Reference uses must be an array.");
    const uses = [];
    const seen = new Set();
    for (const value of values) {
        if (typeof value !== "string")
            throw new Error("Reference uses must contain only text.");
        const use = value.trim();
        if (!use || seen.has(use))
            continue;
        if (use.length > MAX_USE_LENGTH) {
            throw new Error(`Reference use is too long (${use.length}/${MAX_USE_LENGTH}).`);
        }
        seen.add(use);
        uses.push(use);
    }
    if (uses.length === 0)
        throw new Error("At least one reference use is required.");
    if (uses.length > MAX_USES)
        throw new Error(`Too many reference uses (${uses.length}/${MAX_USES}).`);
    return uses;
}
function normalizeNote(value) {
    if (value === undefined)
        return undefined;
    if (typeof value !== "string")
        throw new Error("Reference note must be text.");
    const note = value.trim();
    if (!note)
        return undefined;
    if (note.length > MAX_NOTE_LENGTH) {
        throw new Error(`Reference note is too long (${note.length}/${MAX_NOTE_LENGTH}).`);
    }
    return note;
}
function assertMaterialId(value) {
    const materialId = value.trim();
    if (!materialId
        || materialId.length > 240
        || materialId === "."
        || materialId === ".."
        || materialId.includes("..")
        || /[/\\\0]/u.test(materialId)) {
        throw new Error(`Invalid materialId: ${JSON.stringify(value)}`);
    }
    return materialId;
}
function referenceManifestPath(projectRoot, bookId) {
    return join(projectRoot, "books", bookId, "story", MANIFEST_FILE);
}
async function assertBookExists(projectRoot, bookId) {
    const bookDir = join(projectRoot, "books", bookId);
    try {
        if (!(await stat(bookDir)).isDirectory())
            throw new Error(`Book not found: ${bookId}`);
    }
    catch (error) {
        if (isMissingFile(error))
            throw new Error(`Book not found: ${bookId}`);
        throw error;
    }
}
async function writeManifestAtomic(projectRoot, manifest) {
    const path = referenceManifestPath(projectRoot, manifest.bookId);
    await mkdir(join(projectRoot, "books", manifest.bookId, "story"), { recursive: true });
    const tempPath = `${path}.tmp-${randomUUID()}`;
    try {
        await writeFile(tempPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");
        await rename(tempPath, path);
    }
    catch (error) {
        await rm(tempPath, { force: true }).catch(() => undefined);
        throw error;
    }
}
function isMissingFile(error) {
    return !!error && typeof error === "object" && error.code === "ENOENT";
}
//# sourceMappingURL=book-references.js.map