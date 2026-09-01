import { type BuiltinPrompt } from "./builtin-prompts.js";
export type PromptSource = "project" | "user" | "builtin";
export interface LoadedPromptPackPrompt {
    readonly promptId: string;
    readonly content: string;
    readonly source: PromptSource;
    readonly path?: string;
    readonly title?: string;
    readonly packId?: string;
}
export interface LoadPromptPackPromptInput {
    readonly promptId: string;
    readonly projectRoot?: string;
    readonly userRoot?: string;
}
export declare class PromptPackPromptNotFoundError extends Error {
    readonly promptId: string;
    readonly code = "PROMPT_PACK_PROMPT_NOT_FOUND";
    constructor(promptId: string);
}
export declare function listBuiltinPromptPacks(): readonly {
    id: string;
    title: string;
    source: "user" | "builtin" | "project" | "external";
    description: string;
    prompts: string[];
}[];
export declare function listBuiltinPrompts(): ReadonlyArray<BuiltinPrompt>;
export declare function getBuiltinPrompt(promptId: string): LoadedPromptPackPrompt | undefined;
export declare function loadPromptPackPrompt(input: LoadPromptPackPromptInput): Promise<LoadedPromptPackPrompt>;
export declare function appendPromptPackGuidance(basePrompt: string, input: LoadPromptPackPromptInput): Promise<string>;
export declare function promptOverridePath(root: string, promptId: string): string;
//# sourceMappingURL=prompt-pack.d.ts.map