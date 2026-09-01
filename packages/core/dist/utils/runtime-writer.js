import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import yaml from "js-yaml";
export async function writeGovernedRuntimeArtifacts(params) {
    await mkdir(params.runtimeDir, { recursive: true });
    const chapterSlug = `chapter-${String(params.chapterNumber).padStart(4, "0")}`;
    const contextPath = join(params.runtimeDir, `${chapterSlug}.context.json`);
    const ruleStackPath = join(params.runtimeDir, `${chapterSlug}.rule-stack.yaml`);
    const tracePath = join(params.runtimeDir, `${chapterSlug}.trace.json`);
    await Promise.all([
        writeFile(contextPath, JSON.stringify(params.contextPackage, null, 2), "utf-8"),
        writeFile(ruleStackPath, yaml.dump(params.ruleStack, { lineWidth: 120 }), "utf-8"),
        writeFile(tracePath, JSON.stringify(params.trace, null, 2), "utf-8"),
    ]);
    return {
        contextPath,
        ruleStackPath,
        tracePath,
    };
}
//# sourceMappingURL=runtime-writer.js.map