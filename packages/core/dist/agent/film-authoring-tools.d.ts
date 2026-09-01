import type { AgentTool } from "@mariozechner/pi-agent-core";
import type { LLMClient } from "../llm/provider.js";
import { type StoryNode } from "../interactive-film/graph-schema.js";
import { type NodeImageDeps } from "../interactive-film/node-image.js";
import type { ActivatedSkillGuidance } from "./skill-tool.js";
declare const WorldAnchorParams: import("@sinclair/typebox").TObject<{
    storyCore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    theme: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    worldRules: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    durationMinutes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare function createSetWorldAnchorTool(projectRoot: string, projectId: string): AgentTool<typeof WorldAnchorParams>;
declare const AddVariableParams: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"flag">, import("@sinclair/typebox").TLiteral<"counter">, import("@sinclair/typebox").TLiteral<"relationship">, import("@sinclair/typebox").TLiteral<"item">]>;
    default: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TString, import("@sinclair/typebox").TBoolean]>;
    desc: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createAddVariableTool(projectRoot: string, projectId: string): AgentTool<typeof AddVariableParams>;
declare const DefineEndingParams: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    nodeId: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"good">, import("@sinclair/typebox").TLiteral<"bad">, import("@sinclair/typebox").TLiteral<"neutral">, import("@sinclair/typebox").TLiteral<"secret">]>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createDefineEndingTool(projectRoot: string, projectId: string): AgentTool<typeof DefineEndingParams>;
declare const UpsertCharactersParams: import("@sinclair/typebox").TObject<{
    characters: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        role: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"protagonist">, import("@sinclair/typebox").TLiteral<"antagonist">, import("@sinclair/typebox").TLiteral<"support">, import("@sinclair/typebox").TLiteral<"other">]>>;
        motivation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        voiceProfile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            speakingRhythm: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            vocabulary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            sampleLines: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        }>>;
    }>>;
}>;
export declare function createUpsertCharactersTool(projectRoot: string, projectId: string): AgentTool<typeof UpsertCharactersParams>;
export interface FilmLLMDeps {
    readonly submitNode: (system: string, user: string, nodeId: string, signal?: AbortSignal) => Promise<StoryNode>;
    readonly submitStructure: (system: string, user: string, signal?: AbortSignal) => Promise<ReadonlyArray<StoryNode>>;
    readonly skillIds?: () => ReadonlyArray<string>;
}
declare const FillNodeParams: import("@sinclair/typebox").TObject<{
    nodeId: import("@sinclair/typebox").TString;
    instruction: import("@sinclair/typebox").TString;
}>;
export type FilmAuthoringLanguage = "zh" | "en";
export declare function createFillNodeTool(projectRoot: string, projectId: string, deps: FilmLLMDeps, language?: FilmAuthoringLanguage): AgentTool<typeof FillNodeParams>;
export declare function createReviseNodeTool(projectRoot: string, projectId: string, deps: FilmLLMDeps, language?: FilmAuthoringLanguage): AgentTool<typeof FillNodeParams>;
export declare function filmLLMDepsFromClient(client: LLMClient, model: string, options?: {
    readonly activatedSkills?: () => ReadonlyArray<ActivatedSkillGuidance>;
}): FilmLLMDeps;
declare const DraftStructureParams: import("@sinclair/typebox").TObject<{
    instruction: import("@sinclair/typebox").TString;
}>;
export declare function createDraftStructureTool(projectRoot: string, projectId: string, deps: FilmLLMDeps, language?: FilmAuthoringLanguage): AgentTool<typeof DraftStructureParams>;
declare const ConnectChoiceParams: import("@sinclair/typebox").TObject<{
    node: import("@sinclair/typebox").TUnsafe<unknown>;
}>;
export declare function createConnectChoiceTool(projectRoot: string, projectId: string): AgentTool<typeof ConnectChoiceParams>;
declare const RemoveNodeParams: import("@sinclair/typebox").TObject<{
    nodeId: import("@sinclair/typebox").TString;
}>;
export declare function createRemoveNodeTool(projectRoot: string, projectId: string): AgentTool<typeof RemoveNodeParams>;
declare const GenerateNodeImageParams: import("@sinclair/typebox").TObject<{
    nodeId: import("@sinclair/typebox").TString;
    size: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1536x1024">, import("@sinclair/typebox").TLiteral<"1024x1536">, import("@sinclair/typebox").TLiteral<"1024x1024">]>>;
}>;
export declare function createGenerateNodeImageTool(projectRoot: string, projectId: string, deps?: NodeImageDeps): AgentTool<typeof GenerateNodeImageParams>;
/**
 * Returns the tool names that the interactive-film-authoring session should
 * provide given the current `confirmedIntent`.
 *
 * - No confirmed intent → direct-write tools + propose_action (let the agent
 *   surface high-cost operations for explicit user confirmation).
 * - Confirmed intent → exactly that one tool (already confirmed, execute it).
 */
export declare function buildFilmAuthoringToolNames(confirmedIntent: string | undefined): string[];
/**
 * Instantiates the AgentTool objects for an interactive-film-authoring
 * session.  Keeps tool construction out of agent-session.ts so it can be
 * unit-tested independently.
 */
export declare function createFilmAuthoringTools(params: {
    readonly projectRoot: string;
    readonly projectId: string;
    readonly llm: FilmLLMDeps;
    readonly proposeActionTool: AgentTool<any>;
    readonly confirmedIntent?: string;
    readonly language?: FilmAuthoringLanguage;
}): AgentTool<any>[];
export {};
//# sourceMappingURL=film-authoring-tools.d.ts.map