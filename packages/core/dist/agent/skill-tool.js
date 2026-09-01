import { lstat, readFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { Type } from "@mariozechner/pi-ai";
import { safeChildPath } from "../utils/path-safety.js";
import { LocalSearchIndex, splitMarkdownForSearch, } from "../retrieval/local-search.js";
import { toPosixPath } from "../utils/posix-path.js";
const MAX_SKILL_RESOURCE_BYTES = 512 * 1024;
const EXPIRED_SKILL_GUIDANCE = "This skill was used for its original turn only. Its instructions are not active for later turns.";
const UseSkillParams = Type.Object({
    skillId: Type.String({
        description: "Exact skill id from the available skill catalog.",
    }),
    resourcePath: Type.Optional(Type.String({
        description: "Optional relative text resource inside the skill folder, after the main skill has been activated.",
    })),
    query: Type.Optional(Type.String({
        description: "Natural-language query for retrieving relevant sections from this skill's references. Prefer this when the exact resource path is unknown.",
    })),
});
export function createUseSkillTool(options) {
    const disabled = new Set((options.disabledSkillIds ?? []).map(normalizeSkillId));
    return {
        name: "use_skill",
        label: "Use Skill",
        description: "Load one available professional skill because the current user intent needs it. This only loads instructions and static references; it grants no tools or execution permissions.",
        parameters: UseSkillParams,
        async execute(_toolCallId, params) {
            const skillId = normalizeSkillId(params.skillId);
            if (disabled.has(skillId)) {
                throw new Error(`Skill is disabled: ${skillId}`);
            }
            const skill = options.registry.getSkill(skillId);
            if (!skill) {
                throw new Error(`Skill is not available: ${skillId}`);
            }
            let resource;
            let retrievedResources = [];
            if (params.resourcePath?.trim()) {
                if (!skill.baseDir) {
                    throw new Error(`Skill has no readable resource directory: ${skill.id}`);
                }
                const resourcePath = params.resourcePath.trim();
                const fullPath = safeChildPath(skill.baseDir, resourcePath);
                const info = await lstatWithoutSymlinks(skill.baseDir, fullPath);
                if (!info.isFile())
                    throw new Error(`Skill resource is not a file: ${resourcePath}`);
                if (info.size > MAX_SKILL_RESOURCE_BYTES) {
                    throw new Error(`Skill resource is too large to load: ${resourcePath}`);
                }
                const body = await readFile(fullPath, "utf-8");
                if (body.includes("\0")) {
                    throw new Error(`Skill resource is not UTF-8 text: ${resourcePath}`);
                }
                resource = { path: resourcePath, body };
            }
            else if (params.query?.trim()) {
                if (!skill.baseDir) {
                    throw new Error(`Skill has no readable resource directory: ${skill.id}`);
                }
                retrievedResources = await retrieveSkillResources(skill.id, skill.baseDir, params.query.trim());
            }
            options.onActivate?.({
                skill,
                resources: resource
                    ? [{
                            path: resource.path,
                            body: resource.body,
                            charStart: 0,
                            charEnd: resource.body.length,
                        }]
                    : retrievedResources.map(({ path, heading, body, charStart, charEnd }) => ({
                        path,
                        heading,
                        body,
                        charStart,
                        charEnd,
                    })),
            });
            return textResult([
                `Skill activated: ${skill.id}`,
                `Purpose: ${skill.description}`,
                "",
                skill.body.trim() || skill.description,
                ...(resource
                    ? [
                        "",
                        `Static resource (${resource.path}):`,
                        resource.body,
                    ]
                    : []),
                ...(retrievedResources.length > 0
                    ? [
                        "",
                        "Relevant static references:",
                        ...retrievedResources.flatMap((item) => [
                            `## ${item.path}:${item.charStart}-${item.charEnd}${item.heading ? ` · ${item.heading}` : ""}`,
                            item.body,
                        ]),
                    ]
                    : []),
                "",
                "This skill provides instructions only. Continue using the current session's existing tools and confirmation rules.",
            ].filter(Boolean).join("\n"), {
                kind: "skill_activated",
                skillId: skill.id,
                ...(resource ? { resourcePath: resource.path } : {}),
                ...(params.query?.trim()
                    ? {
                        query: params.query.trim(),
                        retrievedResources: retrievedResources.map(({ path, heading, charStart, charEnd, score }) => ({
                            path,
                            heading,
                            charStart,
                            charEnd,
                            score,
                        })),
                    }
                    : {}),
            });
        },
    };
}
export async function retrieveSkillResources(skillId, baseDir, query, limit = 4) {
    const files = await listSkillTextFiles(baseDir);
    const documents = [];
    for (const path of files) {
        const fullPath = safeChildPath(baseDir, path);
        const info = await lstatWithoutSymlinks(baseDir, fullPath);
        if (!info.isFile() || info.size > MAX_SKILL_RESOURCE_BYTES)
            continue;
        const body = await readFile(fullPath, "utf-8");
        if (body.includes("\0"))
            continue;
        splitMarkdownForSearch(body).forEach((segment, index) => {
            documents.push({
                id: `skill:${skillId}:${path}:${index}`,
                scope: `skill:${skillId}`,
                kind: "skill-reference",
                source: `${path}:${segment.charStart}-${segment.charEnd}`,
                title: [path, segment.heading].filter(Boolean).join(" · "),
                body: segment.body,
                metadata: {
                    path,
                    heading: segment.heading,
                    charStart: segment.charStart,
                    charEnd: segment.charEnd,
                },
            });
        });
    }
    const index = new LocalSearchIndex(":memory:");
    try {
        const scope = `skill:${skillId}`;
        index.replaceScope(scope, documents);
        return index.search(query, { scope, limit }).map((hit) => ({
            path: String(hit.metadata?.path ?? ""),
            heading: String(hit.metadata?.heading ?? ""),
            body: hit.body,
            charStart: Number(hit.metadata?.charStart ?? 0),
            charEnd: Number(hit.metadata?.charEnd ?? hit.body.length),
            score: hit.score,
        }));
    }
    finally {
        index.close();
    }
}
/**
 * Production workers receive the skill itself from the host. Resolve the
 * relevant static reference sections from the actual task text just before a
 * model call, instead of copying large craft prompts into every pipeline.
 */
export async function hydrateActivatedSkillGuidance(activations, query) {
    if (!activations || activations.length === 0 || !query.trim())
        return activations;
    return Promise.all(activations.map(async (activation) => {
        if (activation.resources.length > 0 || !activation.skill.baseDir)
            return activation;
        const resources = await retrieveSkillResources(activation.skill.id, activation.skill.baseDir, query);
        return {
            skill: activation.skill,
            resources: resources.map(({ path, heading, body, charStart, charEnd }) => ({
                path,
                heading,
                body,
                charStart,
                charEnd,
            })),
        };
    }));
}
async function listSkillTextFiles(root, current = root) {
    const files = [];
    for (const entry of await readdir(current, { withFileTypes: true })) {
        const fullPath = join(current, entry.name);
        const relativePath = toPosixPath(relative(root, fullPath));
        if (entry.isSymbolicLink())
            continue;
        if (entry.isDirectory()) {
            files.push(...await listSkillTextFiles(root, fullPath));
            continue;
        }
        if (!entry.isFile() || relativePath === "SKILL.md")
            continue;
        if (!/\.(?:md|txt)$/i.test(entry.name))
            continue;
        files.push(relativePath);
    }
    return files.sort();
}
function textResult(text, details) {
    return { content: [{ type: "text", text }], details };
}
function normalizeSkillId(value) {
    return value.trim().toLowerCase();
}
async function lstatWithoutSymlinks(root, fullPath) {
    const rel = relative(root, fullPath);
    let current = root;
    let info = await lstat(root);
    if (info.isSymbolicLink()) {
        throw new Error(`Skill resource symbolic link is not allowed: ${root}`);
    }
    for (const part of rel.split(sep).filter(Boolean)) {
        current = join(current, part);
        info = await lstat(current);
        if (info.isSymbolicLink()) {
            throw new Error(`Skill resource symbolic link is not allowed: ${rel}`);
        }
    }
    return info;
}
function expireSkillToolResult(message) {
    if (!message
        || typeof message !== "object"
        || message.role !== "toolResult"
        || message.toolName !== "use_skill") {
        return message;
    }
    return {
        ...message,
        content: [{ type: "text", text: EXPIRED_SKILL_GUIDANCE }],
        details: { kind: "skill_expired" },
    };
}
export function assistantInvokesSkill(message) {
    if (!message
        || typeof message !== "object"
        || message.role !== "assistant") {
        return false;
    }
    const content = message.content;
    return Array.isArray(content) && content.some((part) => (part
        && typeof part === "object"
        && part.type === "toolCall"
        && part.name === "use_skill"));
}
export function sanitizeSkillTurnMessage(message, stripThinking) {
    const expired = expireSkillToolResult(message);
    if (!stripThinking
        || !expired
        || typeof expired !== "object"
        || expired.role !== "assistant") {
        return expired;
    }
    const content = expired.content;
    if (!Array.isArray(content))
        return expired;
    const visibleContent = content.filter((part) => (!part
        || typeof part !== "object"
        || part.type !== "thinking"));
    if (visibleContent.length === content.length)
        return expired;
    return {
        ...expired,
        content: visibleContent,
    };
}
//# sourceMappingURL=skill-tool.js.map