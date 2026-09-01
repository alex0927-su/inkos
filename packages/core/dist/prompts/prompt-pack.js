import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BUILTIN_PROMPTS, BUILTIN_PROMPT_PACKS } from "./builtin-prompts.js";
export class PromptPackPromptNotFoundError extends Error {
    promptId;
    code = "PROMPT_PACK_PROMPT_NOT_FOUND";
    constructor(promptId) {
        super(`Prompt pack prompt not found: ${promptId}`);
        this.promptId = promptId;
        this.name = "PromptPackPromptNotFoundError";
    }
}
const BUILTIN_PROMPT_BY_ID = new Map(BUILTIN_PROMPTS.map((prompt) => [prompt.id, prompt]));
export function listBuiltinPromptPacks() {
    return BUILTIN_PROMPT_PACKS;
}
export function listBuiltinPrompts() {
    return BUILTIN_PROMPTS;
}
export function getBuiltinPrompt(promptId) {
    const normalized = normalizePromptId(promptId);
    const prompt = BUILTIN_PROMPT_BY_ID.get(normalized);
    if (!prompt)
        return undefined;
    return {
        promptId: prompt.id,
        content: prompt.content,
        source: "builtin",
        title: prompt.title,
        packId: prompt.packId,
    };
}
export async function loadPromptPackPrompt(input) {
    const promptId = normalizePromptId(input.promptId);
    if (input.projectRoot) {
        const projectPath = promptOverridePath(input.projectRoot, promptId);
        const content = await readTextIfExists(projectPath);
        if (content !== undefined) {
            return { promptId, content, source: "project", path: projectPath };
        }
    }
    if (input.userRoot) {
        const userPath = promptOverridePath(input.userRoot, promptId);
        const content = await readTextIfExists(userPath);
        if (content !== undefined) {
            return { promptId, content, source: "user", path: userPath };
        }
    }
    const builtin = getBuiltinPrompt(promptId);
    if (builtin)
        return builtin;
    throw new PromptPackPromptNotFoundError(promptId);
}
export async function appendPromptPackGuidance(basePrompt, input) {
    const prompt = await loadPromptPackPrompt(input);
    const content = prompt.content.trim();
    if (!content)
        return basePrompt;
    return [
        basePrompt,
        "",
        `## Prompt Pack Guidance (${prompt.promptId}, source: ${prompt.source})`,
        content,
    ].join("\n");
}
export function promptOverridePath(root, promptId) {
    const normalized = normalizePromptId(promptId);
    const parts = normalized.split(".");
    return join(root, "prompt", ...parts.slice(0, -1), `${parts.at(-1)}.md`);
}
function normalizePromptId(promptId) {
    return promptId.trim().toLowerCase();
}
async function readTextIfExists(path) {
    try {
        return await readFile(path, "utf-8");
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=prompt-pack.js.map