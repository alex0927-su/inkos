import type { ProjectConfig } from "../models/project.js";
import { type LLMConfigCliOverrides, type LLMConsumer } from "./effective-llm-config.js";
import { GLOBAL_CONFIG_DIR, GLOBAL_ENV_PATH } from "./llm-env.js";
import { isApiKeyOptionalForEndpoint } from "./llm-endpoint-auth.js";
export { GLOBAL_CONFIG_DIR, GLOBAL_ENV_PATH, isApiKeyOptionalForEndpoint };
export declare function loadProjectConfig(root: string, options?: {
    readonly requireApiKey?: boolean;
    readonly cli?: LLMConfigCliOverrides;
    readonly consumer?: LLMConsumer;
}): Promise<ProjectConfig>;
//# sourceMappingURL=config-loader.d.ts.map