import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { StoryGraphSchema } from "./graph-schema.js";
export function storyGraphPath(projectRoot, projectId) {
    return join(projectRoot, "interactive-films", projectId, "story-graph.json");
}
export async function loadStoryGraph(projectRoot, projectId) {
    try {
        const raw = await readFile(storyGraphPath(projectRoot, projectId), "utf-8");
        return StoryGraphSchema.parse(JSON.parse(raw));
    }
    catch (error) {
        if (error.code === "ENOENT")
            return null;
        throw error;
    }
}
export async function saveStoryGraph(projectRoot, projectId, graph) {
    const validated = StoryGraphSchema.parse(graph);
    const path = storyGraphPath(projectRoot, projectId);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(validated, null, 2), "utf-8");
}
//# sourceMappingURL=graph-store.js.map