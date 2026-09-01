import { readFile, readdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, delimiter, dirname, isAbsolute, join } from "node:path";
import yaml from "js-yaml";
import { AgentSkillSchema, } from "./types.js";
const MAX_SKILL_MANIFEST_BYTES = 2 * 1024 * 1024;
const MAX_SKILL_NAME_CHARS = 64;
const MAX_SKILL_DESCRIPTION_CHARS = 1024;
export async function loadExternalAgentSkills(input) {
    const skillDirs = await discoverSkillDirs(input.externalDirs);
    const skills = [];
    const diagnostics = [];
    for (const dir of skillDirs) {
        const skillPath = join(dir, "SKILL.md");
        try {
            skills.push(await loadSkillManifest(skillPath, input.source));
        }
        catch (error) {
            diagnostics.push({
                path: skillPath,
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }
    return { skills, diagnostics };
}
export async function loadConfiguredAgentSkills(input) {
    const candidates = configuredSkillDirs(input);
    const skills = [];
    const diagnostics = [];
    for (const candidate of candidates) {
        try {
            const result = await loadExternalAgentSkills({
                externalDirs: [candidate.path],
                source: candidate.source,
            });
            skills.push(...result.skills);
            diagnostics.push(...result.diagnostics);
        }
        catch (error) {
            if (!candidate.explicit && isMissingPathError(error))
                continue;
            diagnostics.push({
                path: candidate.path,
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }
    return { skills, diagnostics };
}
function configuredSkillDirs(input) {
    const env = input.env ?? process.env;
    const envDirs = (env.INKOS_SKILL_DIRS ?? "")
        .split(delimiter)
        .map((value) => value.trim())
        .filter(Boolean);
    const homeDir = input.homeDir ?? homedir();
    return [
        ...envDirs.map((path) => ({ path, explicit: true, source: "external" })),
        { path: join(homeDir, ".openclaw", "skills"), explicit: false, source: "user" },
        { path: join(homeDir, ".agents", "skills"), explicit: false, source: "user" },
        { path: join(input.projectRoot, ".agents", "skills"), explicit: false, source: "project" },
        { path: join(input.projectRoot, "skills"), explicit: false, source: "project" },
    ];
}
function isMissingPathError(error) {
    return typeof error === "object"
        && error !== null
        && "code" in error
        && error.code === "ENOENT";
}
async function discoverSkillDirs(externalDirs) {
    const dirs = [];
    for (const dir of externalDirs) {
        if (!isAbsolute(dir)) {
            throw new Error(`External skill directory must be absolute: ${dir}`);
        }
        const info = await stat(dir);
        if (!info.isDirectory()) {
            throw new Error(`External skill path is not a directory: ${dir}`);
        }
        if (await hasSkillManifest(dir)) {
            dirs.push(dir);
            continue;
        }
        dirs.push(...await discoverSkillDirsBelow(dir, 2));
    }
    return [...new Set(dirs)].sort();
}
async function discoverSkillDirsBelow(root, remainingDepth) {
    if (remainingDepth <= 0)
        return [];
    const dirs = [];
    const entries = await readdir(root, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isDirectory())
            continue;
        const child = join(root, entry.name);
        if (await hasSkillManifest(child)) {
            dirs.push(child);
            continue;
        }
        dirs.push(...await discoverSkillDirsBelow(child, remainingDepth - 1));
    }
    return dirs;
}
async function hasSkillManifest(dir) {
    try {
        const info = await stat(join(dir, "SKILL.md"));
        return info.isFile();
    }
    catch {
        return false;
    }
}
async function loadSkillManifest(skillPath, source = "external") {
    const info = await stat(skillPath);
    if (info.size > MAX_SKILL_MANIFEST_BYTES) {
        throw new Error(`SKILL.md exceeds ${MAX_SKILL_MANIFEST_BYTES} bytes.`);
    }
    const raw = await readFile(skillPath, "utf-8");
    return parseAgentSkillDocument(raw, { skillPath, source });
}
export function parseAgentSkillDocument(raw, options) {
    const parsed = parseFrontmatter(raw);
    if (!parsed.data || typeof parsed.data !== "object" || Array.isArray(parsed.data)) {
        throw new Error("SKILL.md frontmatter must be a YAML object.");
    }
    const data = parsed.data;
    const fallbackId = basename(dirname(options.skillPath));
    const name = requiredText(data.name, "name", MAX_SKILL_NAME_CHARS);
    const description = requiredText(data.description, "description", MAX_SKILL_DESCRIPTION_CHARS);
    const id = normalizeExternalSkillId(name, fallbackId);
    return AgentSkillSchema.parse({
        id,
        name,
        description,
        body: parsed.body.trim(),
        source: options.source ?? "external",
        baseDir: dirname(options.skillPath),
    });
}
function parseFrontmatter(raw) {
    const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
    if (!normalized.startsWith("---\n")) {
        throw new Error("SKILL.md must start with YAML frontmatter delimiters.");
    }
    const end = normalized.indexOf("\n---", 4);
    if (end < 0) {
        throw new Error("SKILL.md is missing closing YAML frontmatter delimiter.");
    }
    const frontmatter = normalized.slice(4, end).trim();
    const body = normalized.slice(end + "\n---".length).replace(/^\r?\n/, "");
    return {
        data: yaml.load(frontmatter),
        body,
    };
}
function optionalText(value) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
function requiredText(value, field, maxChars) {
    const text = optionalText(value);
    if (!text)
        throw new Error(`SKILL.md frontmatter requires ${field}.`);
    if (maxChars !== undefined && text.length > maxChars) {
        throw new Error(`SKILL.md frontmatter ${field} must be at most ${maxChars} characters.`);
    }
    return text;
}
function normalizeExternalSkillId(value, fallback) {
    const normalize = (candidate) => candidate
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const id = normalize(value) || normalize(fallback);
    if (!id)
        throw new Error("SKILL.md requires a name that can be used as a skill id.");
    const normalized = /^[a-z]/.test(id) ? id : `skill-${id}`;
    if (normalized.length > MAX_SKILL_NAME_CHARS) {
        throw new Error(`SKILL.md skill id must be at most ${MAX_SKILL_NAME_CHARS} characters.`);
    }
    return normalized;
}
//# sourceMappingURL=external-loader.js.map