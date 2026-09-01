import type { PipelineRunner, StateManager, BookConfig } from "../index.js";
import type { InteractionRuntimeTools } from "./runtime.js";
export declare function assertSafeTruthFileName(fileName: string): string;
type PipelineLike = Pick<PipelineRunner, "writeNextChapter" | "reviseDraft"> & {
    readonly initBook?: (book: BookConfig, options?: {
        readonly externalContext?: string;
        readonly authorIntent?: string;
        readonly currentFocus?: string;
    }) => Promise<void>;
};
type StateLike = Pick<StateManager, "ensureControlDocuments" | "bookDir" | "loadBookConfig" | "loadChapterIndex" | "saveChapterIndex" | "listBooks" | "acquireBookLock">;
export declare function buildChapterFileLookup(files: ReadonlyArray<string>): ReadonlyMap<number, string>;
export declare function createInteractionToolsFromDeps(pipeline: PipelineLike, state: StateLike, hooks?: {
    readonly onChatTextDelta?: (text: string) => void;
    readonly onDraftTextDelta?: (text: string) => void;
    readonly onDraftRawDelta?: (text: string) => void;
    readonly getChatRequestOptions?: () => {
        readonly temperature?: number;
        readonly maxTokens?: number;
    };
}): InteractionRuntimeTools;
export {};
//# sourceMappingURL=project-tools.d.ts.map