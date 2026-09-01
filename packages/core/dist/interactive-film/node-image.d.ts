import type { StoryNode } from "./graph-schema.js";
import type { StoryGraphDelta } from "./delta.js";
export interface NodeImageDeps {
    generateImage(prompt: string, size: string): Promise<{
        buffer: Buffer;
        extension: "png" | "jpg";
    }>;
}
/** posix-style relative path served by GET /api/v1/project/files/<this> */
export declare function nodeImageRelPath(projectId: string, nodeId: string, ext: string): string;
export declare function buildSetImageRefDelta(node: StoryNode, prompt: string, assetRef: string): StoryGraphDelta;
export declare function generateNodeImage(params: {
    projectRoot: string;
    projectId: string;
    node: StoryNode;
    size?: string;
    deps: NodeImageDeps;
}): Promise<{
    assetRef: string;
    delta: StoryGraphDelta;
}>;
/**
 * Resolves a NodeImageDeps backed by the repo's existing cover-generation
 * infrastructure. `resolveCoverGenerationRequest` reads project config + env
 * vars to build a ShortFictionCoverRequest, which is then captured in the
 * closure so it's only resolved once per call to defaultNodeImageDeps.
 */
export declare function defaultNodeImageDeps(projectRoot: string): Promise<NodeImageDeps>;
//# sourceMappingURL=node-image.d.ts.map