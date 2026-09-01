import { type PromptPackManifest } from "./types.js";
export interface BuiltinPrompt {
    readonly id: string;
    readonly packId: string;
    readonly title: string;
    readonly content: string;
}
export declare const BUILTIN_PROMPT_PACKS: ReadonlyArray<PromptPackManifest>;
export declare const BUILTIN_PROMPTS: ReadonlyArray<BuiltinPrompt>;
//# sourceMappingURL=builtin-prompts.d.ts.map