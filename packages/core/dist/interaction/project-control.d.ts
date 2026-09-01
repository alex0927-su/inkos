import type { InteractionRequest } from "./intents.js";
import type { InteractionRuntimeTools } from "./runtime.js";
export declare function processProjectInteractionRequest(params: {
    readonly projectRoot: string;
    readonly request: InteractionRequest;
    readonly tools: InteractionRuntimeTools;
    readonly activeBookId?: string;
}): Promise<{
    request: {
        intent: "chat" | "develop_book" | "show_book_draft" | "create_book" | "discard_book_draft" | "list_books" | "select_book" | "continue_book" | "write_next" | "pause_book" | "resume_book" | "revise_chapter" | "rewrite_chapter" | "patch_chapter_text" | "replace_chapter_text" | "edit_truth" | "rename_entity" | "update_focus" | "update_author_intent" | "explain_status" | "explain_failure" | "export_book";
        title?: string | undefined;
        platform?: string | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        format?: "txt" | "md" | "epub" | undefined;
        protagonist?: string | undefined;
        mode?: "auto" | "manual" | "semi" | undefined;
        authorIntent?: string | undefined;
        currentFocus?: string | undefined;
        volumeOutline?: string | undefined;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        blurb?: string | undefined;
        worldPremise?: string | undefined;
        settingNotes?: string | undefined;
        supportingCast?: string | undefined;
        conflictCore?: string | undefined;
        constraints?: string | undefined;
        fileName?: string | undefined;
        approvedOnly?: boolean | undefined;
        outputPath?: string | undefined;
        oldValue?: string | undefined;
        newValue?: string | undefined;
        targetText?: string | undefined;
        replacementText?: string | undefined;
        fullText?: string | undefined;
        instruction?: string | undefined;
    };
    session: import("./session.js").InteractionSession;
    responseText?: string;
    details?: Readonly<Record<string, unknown>>;
}>;
//# sourceMappingURL=project-control.d.ts.map