import { type ActionPayload, type ActionSource, type InteractionSession, type PlayMode, type RequestedIntent, type SessionKind } from "@actalk/inkos-core";
interface TuiAgentRoute {
    readonly userMessage: string;
    readonly sessionKind: SessionKind;
    readonly actionSource: Extract<ActionSource, "free-text" | "slash">;
    readonly requestedIntent?: RequestedIntent;
    readonly actionPayload?: ActionPayload;
    readonly requestedSkills?: ReadonlyArray<string>;
    readonly playMode?: PlayMode;
    readonly detachBook?: boolean;
    readonly clearPending?: boolean;
    readonly localResponse?: string;
}
export declare function processTuiAgentInput(params: {
    readonly projectRoot: string;
    readonly input: string;
    readonly session: InteractionSession;
    readonly activeBookId?: string;
    readonly onTextDelta?: (text: string) => void;
}): Promise<{
    responseText: string;
    session: {
        events: {
            status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
            kind: string;
            timestamp: number;
            bookId?: string | undefined;
            chapterNumber?: number | undefined;
            detail?: string | undefined;
        }[];
        messages: {
            content: string;
            role: "user" | "assistant" | "system";
            timestamp: number;
            thinking?: string | undefined;
            toolExecutions?: {
                status: "completed" | "running" | "error" | "processing";
                id: string;
                label: string;
                tool: string;
                startedAt: number;
                error?: string | undefined;
                details?: unknown;
                agent?: string | undefined;
                args?: Record<string, unknown> | undefined;
                result?: string | undefined;
                stages?: {
                    status: "active" | "completed" | "pending";
                    label: string;
                }[] | undefined;
                completedAt?: number | undefined;
            }[] | undefined;
        }[];
        sessionId: string;
        projectRoot: string;
        draftRounds: {
            summary: string;
            timestamp: number;
            roundId: number;
            userMessage: string;
            assistantRaw: string;
            fieldsUpdated: string[];
        }[];
        automationMode: "auto" | "manual" | "semi";
        playMode?: "open" | "guided" | undefined;
        sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
        modelOverride?: string | undefined;
        activeBookId?: string | undefined;
        activeChapterNumber?: number | undefined;
        creationDraft?: {
            concept: string;
            missingFields: string[];
            readyToCreate: boolean;
            title?: string | undefined;
            platform?: string | undefined;
            genre?: string | undefined;
            targetChapters?: number | undefined;
            chapterWordCount?: number | undefined;
            language?: "zh" | "en" | undefined;
            protagonist?: string | undefined;
            authorIntent?: string | undefined;
            currentFocus?: string | undefined;
            volumeOutline?: string | undefined;
            blurb?: string | undefined;
            worldPremise?: string | undefined;
            settingNotes?: string | undefined;
            supportingCast?: string | undefined;
            conflictCore?: string | undefined;
            constraints?: string | undefined;
            nextQuestion?: string | undefined;
        } | undefined;
        pendingDecision?: {
            kind: string;
            summary: string;
            bookId: string;
            chapterNumber?: number | undefined;
        } | undefined;
        pendingProposedAction?: {
            action: string;
            instruction: string;
            targetSessionKind: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring";
            title?: string | undefined;
            summary?: string | undefined;
            playMode?: "open" | "guided" | undefined;
            requestedSkills?: string[] | undefined;
            actionPayload?: Record<string, unknown> | undefined;
        } | undefined;
        currentExecution?: {
            status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
            bookId?: string | undefined;
            chapterNumber?: number | undefined;
            stageLabel?: string | undefined;
        } | undefined;
    };
}>;
export declare function resolveTuiAgentRoute(rawInput: string, session: InteractionSession, activeBookId: string | null, language?: "zh" | "en"): TuiAgentRoute;
export {};
//# sourceMappingURL=agent-input.d.ts.map