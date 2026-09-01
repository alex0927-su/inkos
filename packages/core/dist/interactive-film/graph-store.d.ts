import { type StoryGraph } from "./graph-schema.js";
export declare function storyGraphPath(projectRoot: string, projectId: string): string;
export declare function loadStoryGraph(projectRoot: string, projectId: string): Promise<StoryGraph | null>;
export declare function saveStoryGraph(projectRoot: string, projectId: string, graph: StoryGraph): Promise<void>;
//# sourceMappingURL=graph-store.d.ts.map