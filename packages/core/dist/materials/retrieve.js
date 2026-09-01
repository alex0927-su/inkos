import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { safeChildPath } from "../utils/path-safety.js";
import { toPosixPath } from "../utils/posix-path.js";
import { LocalSearchIndex, splitMarkdownForSearch, } from "../retrieval/local-search.js";
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 12;
const MATERIAL_SCOPE = "archived-materials";
export async function retrieveMaterials(projectRoot, input) {
    const assets = await listMaterialAssets(projectRoot);
    const documents = [];
    for (const asset of assets) {
        const markdownPath = safeChildPath(projectRoot, asset.markdownPath);
        let markdown = "";
        try {
            markdown = await readFile(markdownPath, "utf-8");
        }
        catch {
            continue;
        }
        const normalizedPath = toPosixPath(asset.markdownPath);
        splitMarkdownForSearch(markdown).forEach((segment, index) => {
            documents.push({
                id: `material:${asset.id}:${index}`,
                scope: MATERIAL_SCOPE,
                kind: `material:${asset.purpose}`,
                source: `${normalizedPath}:${segment.charStart}-${segment.charEnd}`,
                title: [asset.title, segment.heading].filter(Boolean).join(" · "),
                body: segment.body,
                metadata: {
                    assetId: asset.id,
                    assetTitle: asset.title,
                    assetKind: asset.kind,
                    purpose: asset.purpose,
                    source: asset.source,
                    markdownPath: normalizedPath,
                    charStart: segment.charStart,
                    charEnd: segment.charEnd,
                },
            });
        });
    }
    const searchIndex = new LocalSearchIndex(join(projectRoot, ".inkos", "retrieval.db"));
    try {
        searchIndex.replaceScope(MATERIAL_SCOPE, documents);
        const limit = normalizeLimit(input.limit);
        const ranked = searchIndex.search(input.query, {
            scope: MATERIAL_SCOPE,
            kinds: input.purpose ? [`material:${input.purpose}`] : undefined,
            limit: Math.min(MAX_LIMIT * 4, limit * 4),
        }).map((hit) => materialFromHit(hit.metadata, hit.score, hit.body));
        const seen = new Set();
        return ranked.filter((result) => {
            if (seen.has(result.id))
                return false;
            seen.add(result.id);
            return true;
        }).slice(0, limit);
    }
    finally {
        searchIndex.close();
    }
}
async function listMaterialAssets(projectRoot) {
    const materialsDir = join(projectRoot, ".inkos", "materials");
    let entries = [];
    try {
        entries = await readdir(materialsDir);
    }
    catch {
        return [];
    }
    const assets = [];
    for (const entry of entries) {
        if (!entry.endsWith(".json"))
            continue;
        try {
            const raw = await readFile(join(materialsDir, entry), "utf-8");
            const asset = JSON.parse(raw);
            if (asset.id && asset.markdownPath && asset.title)
                assets.push(asset);
        }
        catch {
            // Ignore corrupt stale manifests; retrieval should not break the chat turn.
        }
    }
    return assets;
}
function normalizeLimit(limit) {
    if (!Number.isFinite(limit ?? DEFAULT_LIMIT))
        return DEFAULT_LIMIT;
    return Math.max(1, Math.min(MAX_LIMIT, Math.floor(limit ?? DEFAULT_LIMIT)));
}
function materialFromHit(metadata, score, excerpt) {
    const value = metadata ?? {};
    return {
        id: String(value.assetId ?? ""),
        title: String(value.assetTitle ?? ""),
        kind: String(value.assetKind ?? "text"),
        purpose: String(value.purpose ?? "general"),
        source: String(value.source ?? ""),
        markdownPath: String(value.markdownPath ?? ""),
        score,
        excerpt,
        charStart: Number(value.charStart ?? 0),
        charEnd: Number(value.charEnd ?? excerpt.length),
    };
}
//# sourceMappingURL=retrieve.js.map