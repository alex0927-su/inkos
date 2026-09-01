import type { StoryGraphDelta } from "./delta.js";
import type { WorldAnchor, Variable, Ending, StoryNode, Character } from "./graph-schema.js";
export declare function buildWorldAnchorDelta(patch: Partial<WorldAnchor>): StoryGraphDelta;
export declare function buildAddVariableDelta(v: Variable): StoryGraphDelta;
export declare function buildDefineEndingDelta(e: Ending): StoryGraphDelta;
export declare function buildRemoveNodeDelta(nodeId: string): StoryGraphDelta;
export declare function buildConnectChoiceDelta(node: StoryNode): StoryGraphDelta;
export declare function buildUpsertCharactersDelta(chars: Character[]): StoryGraphDelta;
//# sourceMappingURL=authoring-tools.d.ts.map