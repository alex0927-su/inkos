import { resolveEffectiveLLMConfig, } from "./effective-llm-config.js";
import { loadLLMEnvLayers, GLOBAL_CONFIG_DIR, GLOBAL_ENV_PATH } from "./llm-env.js";
import { isApiKeyOptionalForEndpoint } from "./llm-endpoint-auth.js";
export { GLOBAL_CONFIG_DIR, GLOBAL_ENV_PATH, isApiKeyOptionalForEndpoint };
export async function loadProjectConfig(root, options) {
    const envLayers = await loadLLMEnvLayers(root);
    const result = await resolveEffectiveLLMConfig({
        consumer: options?.consumer ?? "cli",
        projectRoot: root,
        envLayers,
        cli: options?.cli,
        requireApiKey: options?.requireApiKey,
    });
    return result.config;
}
//# sourceMappingURL=config-loader.js.map