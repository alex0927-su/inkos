import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { commitAtomicFileSet } from "../utils/atomic-file-set.js";
export function translationProjectDir(projectRoot, projectId) {
    return join(projectRoot, "translations", projectId);
}
export function translationManifestPath(projectRoot, projectId) {
    return join(translationProjectDir(projectRoot, projectId), "manifest.json");
}
export async function loadTranslationManifest(projectRoot, projectId) {
    return JSON.parse(await readFile(translationManifestPath(projectRoot, projectId), "utf-8"));
}
export async function saveTranslationManifest(projectRoot, manifest) {
    await writeFile(translationManifestPath(projectRoot, manifest.id), JSON.stringify(manifest, null, 2), "utf-8");
}
export async function loadTranslationChapter(projectRoot, chapterPath) {
    return JSON.parse(await readFile(join(projectRoot, chapterPath), "utf-8"));
}
export async function saveTranslationChapter(projectRoot, chapterPath, chapter) {
    await writeFile(join(projectRoot, chapterPath), JSON.stringify(chapter, null, 2), "utf-8");
}
export async function loadTranslationGlossary(projectRoot, projectId) {
    try {
        const raw = JSON.parse(await readFile(join(translationProjectDir(projectRoot, projectId), "glossary.json"), "utf-8"));
        return Array.isArray(raw.terms) ? raw.terms.filter(isGlossaryTerm) : [];
    }
    catch {
        return [];
    }
}
export async function saveTranslationGlossary(projectRoot, projectId, terms) {
    await writeFile(join(translationProjectDir(projectRoot, projectId), "glossary.json"), JSON.stringify({ terms: mergeGlossaryTerms(terms) }, null, 2), "utf-8");
}
export async function saveTranslationProgress(projectRoot, projectId, chapterPath, chapter, terms) {
    await commitAtomicFileSet({
        rootDir: projectRoot,
        writes: [
            {
                relativePath: chapterPath,
                content: `${JSON.stringify(chapter, null, 2)}\n`,
            },
            {
                relativePath: join("translations", projectId, "glossary.json"),
                content: `${JSON.stringify({ terms: mergeGlossaryTerms(terms) }, null, 2)}\n`,
            },
        ],
    });
}
export function mergeGlossaryTerms(terms) {
    const map = new Map();
    for (const term of terms) {
        const key = term.source.trim().toLowerCase();
        if (!key)
            continue;
        map.set(key, {
            source: term.source.trim(),
            target: term.target.trim(),
            ...(term.note?.trim() ? { note: term.note.trim() } : {}),
        });
    }
    return [...map.values()];
}
function isGlossaryTerm(value) {
    if (!value || typeof value !== "object")
        return false;
    const record = value;
    return typeof record.source === "string" && typeof record.target === "string";
}
//# sourceMappingURL=run-store.js.map