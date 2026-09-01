import { fileURLToPath } from "node:url";
import { loadConfiguredAgentSkills, loadExternalAgentSkills, } from "./external-loader.js";
export async function loadBuiltinAgentSkills(builtinRoot = builtinSkillsRoot()) {
    return loadExternalAgentSkills({
        externalDirs: [builtinRoot],
        source: "builtin",
    });
}
export async function loadAvailableAgentSkills(input) {
    const [builtin, configured] = await Promise.all([
        loadBuiltinAgentSkills(),
        loadConfiguredAgentSkills(input),
    ]);
    return {
        // Registry de-duplication is last-write-wins, so project/user skills can
        // intentionally replace an InkOS default with the same AgentSkills id.
        skills: [...builtin.skills, ...configured.skills],
        diagnostics: [...builtin.diagnostics, ...configured.diagnostics],
    };
}
function builtinSkillsRoot() {
    return fileURLToPath(new URL("../../skills", import.meta.url));
}
//# sourceMappingURL=builtin-loader.js.map