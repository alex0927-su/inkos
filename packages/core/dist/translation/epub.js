import { dirname, posix } from "node:path";
import JSZip from "jszip";
import { normalizeTranslationText, stripHtml } from "./text.js";
export async function extractEpub(buffer) {
    const zip = await JSZip.loadAsync(buffer);
    const containerXml = await zip.file("META-INF/container.xml")?.async("string");
    const opfPath = extractOpfPath(containerXml ?? "");
    if (!opfPath)
        throw new Error("EPUB container.xml does not point to an OPF package.");
    const opf = await zip.file(opfPath)?.async("string");
    if (!opf)
        throw new Error(`EPUB OPF package not found: ${opfPath}`);
    const title = decodeXml(extractFirst(opf, /<dc:title[^>]*>([\s\S]*?)<\/dc:title>/i) ?? "").trim() || undefined;
    const manifest = extractManifest(opf);
    const spine = extractSpine(opf);
    const baseDir = dirname(opfPath).replace(/\\/g, "/");
    const chapters = [];
    for (const idref of spine) {
        const href = manifest.get(idref);
        if (!href)
            continue;
        const chapterPath = normalizeZipPath(baseDir === "." ? href : posix.join(baseDir, href));
        const html = await zip.file(chapterPath)?.async("string");
        if (!html)
            continue;
        const titleFromHtml = decodeXml(extractFirst(html, /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i) ?? "").replace(/<[^>]+>/g, "").trim();
        const content = normalizeTranslationText(stripHtml(html));
        if (!content)
            continue;
        chapters.push({
            title: titleFromHtml || `Chapter ${chapters.length + 1}`,
            content,
        });
    }
    if (chapters.length === 0)
        throw new Error("EPUB contains no readable spine chapters.");
    return { title, chapters };
}
function extractOpfPath(containerXml) {
    return extractFirst(containerXml, /<rootfile[^>]+full-path=["']([^"']+)["']/i);
}
function extractManifest(opf) {
    const map = new Map();
    const itemRe = /<item\b([^>]+)>/gi;
    let match;
    while ((match = itemRe.exec(opf)) !== null) {
        const attrs = match[1] ?? "";
        const id = attr(attrs, "id");
        const href = attr(attrs, "href");
        if (id && href)
            map.set(id, decodeXml(href));
    }
    return map;
}
function extractSpine(opf) {
    const spineMatch = /<spine\b[\s\S]*?<\/spine>/i.exec(opf);
    if (!spineMatch)
        return [];
    const itemRefRe = /<itemref\b([^>]+)>/gi;
    const ids = [];
    let match;
    while ((match = itemRefRe.exec(spineMatch[0])) !== null) {
        const idref = attr(match[1] ?? "", "idref");
        if (idref)
            ids.push(decodeXml(idref));
    }
    return ids;
}
function attr(attrs, name) {
    return extractFirst(attrs, new RegExp(`${name}=["']([^"']+)["']`, "i"));
}
function extractFirst(value, pattern) {
    return pattern.exec(value)?.[1];
}
function normalizeZipPath(path) {
    return path.split("/").filter((part) => part && part !== ".").join("/");
}
function decodeXml(value) {
    return value
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, "\"")
        .replace(/&#39;/gi, "'");
}
//# sourceMappingURL=epub.js.map