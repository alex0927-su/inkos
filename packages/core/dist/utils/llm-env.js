import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { parse } from "dotenv";
export const GLOBAL_CONFIG_DIR = join(homedir(), ".inkos");
export const GLOBAL_ENV_PATH = join(GLOBAL_CONFIG_DIR, ".env");
export async function loadLLMEnvLayers(root, processEnv = process.env) {
    const global = await parseEnvFile(GLOBAL_ENV_PATH);
    const project = await parseEnvFile(join(root, ".env"));
    // Compatibility: modelOverrides.apiKeyEnv and detector config still read process.env directly.
    hydrateProcessEnvFromEnvFiles(processEnv, global, project);
    return {
        global,
        project,
        process: { ...processEnv },
    };
}
export function mergeEnvMaps(...layers) {
    const merged = {};
    for (const layer of layers) {
        for (const [key, value] of Object.entries(layer)) {
            if (value !== undefined)
                merged[key] = value;
        }
    }
    return merged;
}
export function studioIgnoredEnv(layers) {
    return mergeEnvMaps(layers.global, layers.project, layers.process);
}
export function cliOverlayEnv(layers) {
    return mergeEnvMaps(layers.global, layers.project, layers.process);
}
export function legacyEnv(layers) {
    return mergeEnvMaps(layers.global, layers.project, layers.process);
}
async function parseEnvFile(path) {
    try {
        return parse(await readFile(path, "utf-8"));
    }
    catch {
        return {};
    }
}
function hydrateProcessEnvFromEnvFiles(processEnv, global, project) {
    const fileEnv = mergeEnvMaps(global, project);
    for (const [key, value] of Object.entries(fileEnv)) {
        if (value !== undefined && processEnv[key] === undefined) {
            processEnv[key] = value;
        }
    }
}
//# sourceMappingURL=llm-env.js.map