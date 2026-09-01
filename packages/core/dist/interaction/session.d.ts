import { z } from "zod";
import { type AutomationMode } from "./modes.js";
import { type InteractionEvent } from "./events.js";
export declare const SessionKindSchema: z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>;
export type SessionKind = z.infer<typeof SessionKindSchema>;
export declare const PlayModeSchema: z.ZodEnum<["open", "guided"]>;
export type PlayMode = z.infer<typeof PlayModeSchema>;
export declare const PendingDecisionSchema: z.ZodObject<{
    kind: z.ZodString;
    bookId: z.ZodString;
    chapterNumber: z.ZodOptional<z.ZodNumber>;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    kind: string;
    summary: string;
    bookId: string;
    chapterNumber?: number | undefined;
}, {
    kind: string;
    summary: string;
    bookId: string;
    chapterNumber?: number | undefined;
}>;
export type PendingDecision = z.infer<typeof PendingDecisionSchema>;
export declare const PendingProposedActionSchema: z.ZodObject<{
    action: z.ZodString;
    targetSessionKind: z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>;
    instruction: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    requestedSkills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    actionPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    action: string;
    instruction: string;
    targetSessionKind: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring";
    title?: string | undefined;
    summary?: string | undefined;
    playMode?: "open" | "guided" | undefined;
    requestedSkills?: string[] | undefined;
    actionPayload?: Record<string, unknown> | undefined;
}, {
    action: string;
    instruction: string;
    targetSessionKind: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring";
    title?: string | undefined;
    summary?: string | undefined;
    playMode?: "open" | "guided" | undefined;
    requestedSkills?: string[] | undefined;
    actionPayload?: Record<string, unknown> | undefined;
}>;
export type PendingProposedAction = z.infer<typeof PendingProposedActionSchema>;
export declare const PipelineStageSchema: z.ZodObject<{
    label: z.ZodString;
    status: z.ZodEnum<["pending", "active", "completed"]>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "completed" | "pending";
    label: string;
}, {
    status: "active" | "completed" | "pending";
    label: string;
}>;
export type PipelineStage = z.infer<typeof PipelineStageSchema>;
export declare const ToolExecutionSchema: z.ZodObject<{
    id: z.ZodString;
    tool: z.ZodString;
    agent: z.ZodOptional<z.ZodString>;
    label: z.ZodString;
    status: z.ZodEnum<["running", "processing", "completed", "error"]>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    result: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodString>;
    stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        status: z.ZodEnum<["pending", "active", "completed"]>;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "completed" | "pending";
        label: string;
    }, {
        status: "active" | "completed" | "pending";
        label: string;
    }>, "many">>;
    startedAt: z.ZodNumber;
    completedAt: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type ToolExecution = z.infer<typeof ToolExecutionSchema>;
export declare const InteractionMessageSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    thinking: z.ZodOptional<z.ZodString>;
    toolExecutions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tool: z.ZodString;
        agent: z.ZodOptional<z.ZodString>;
        label: z.ZodString;
        status: z.ZodEnum<["running", "processing", "completed", "error"]>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        result: z.ZodOptional<z.ZodString>;
        details: z.ZodOptional<z.ZodUnknown>;
        error: z.ZodOptional<z.ZodString>;
        stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            status: z.ZodEnum<["pending", "active", "completed"]>;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "completed" | "pending";
            label: string;
        }, {
            status: "active" | "completed" | "pending";
            label: string;
        }>, "many">>;
        startedAt: z.ZodNumber;
        completedAt: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type InteractionMessage = z.infer<typeof InteractionMessageSchema>;
export declare const BookCreationDraftSchema: z.ZodObject<{
    concept: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
    blurb: z.ZodOptional<z.ZodString>;
    worldPremise: z.ZodOptional<z.ZodString>;
    settingNotes: z.ZodOptional<z.ZodString>;
    protagonist: z.ZodOptional<z.ZodString>;
    supportingCast: z.ZodOptional<z.ZodString>;
    conflictCore: z.ZodOptional<z.ZodString>;
    volumeOutline: z.ZodOptional<z.ZodString>;
    constraints: z.ZodOptional<z.ZodString>;
    authorIntent: z.ZodOptional<z.ZodString>;
    currentFocus: z.ZodOptional<z.ZodString>;
    nextQuestion: z.ZodOptional<z.ZodString>;
    missingFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    readyToCreate: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
}, {
    concept: string;
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
    missingFields?: string[] | undefined;
    readyToCreate?: boolean | undefined;
}>;
export type BookCreationDraft = z.infer<typeof BookCreationDraftSchema>;
export declare const DraftRoundSchema: z.ZodObject<{
    roundId: z.ZodNumber;
    userMessage: z.ZodString;
    assistantRaw: z.ZodString;
    fieldsUpdated: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    summary: z.ZodDefault<z.ZodString>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    summary: string;
    timestamp: number;
    roundId: number;
    userMessage: string;
    assistantRaw: string;
    fieldsUpdated: string[];
}, {
    timestamp: number;
    roundId: number;
    userMessage: string;
    assistantRaw: string;
    summary?: string | undefined;
    fieldsUpdated?: string[] | undefined;
}>;
export type DraftRound = z.infer<typeof DraftRoundSchema>;
export declare const InteractionSessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    projectRoot: z.ZodString;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    modelOverride: z.ZodOptional<z.ZodString>;
    activeBookId: z.ZodOptional<z.ZodString>;
    activeChapterNumber: z.ZodOptional<z.ZodNumber>;
    creationDraft: z.ZodOptional<z.ZodObject<{
        concept: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
        blurb: z.ZodOptional<z.ZodString>;
        worldPremise: z.ZodOptional<z.ZodString>;
        settingNotes: z.ZodOptional<z.ZodString>;
        protagonist: z.ZodOptional<z.ZodString>;
        supportingCast: z.ZodOptional<z.ZodString>;
        conflictCore: z.ZodOptional<z.ZodString>;
        volumeOutline: z.ZodOptional<z.ZodString>;
        constraints: z.ZodOptional<z.ZodString>;
        authorIntent: z.ZodOptional<z.ZodString>;
        currentFocus: z.ZodOptional<z.ZodString>;
        nextQuestion: z.ZodOptional<z.ZodString>;
        missingFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        readyToCreate: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        concept: string;
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
        missingFields?: string[] | undefined;
        readyToCreate?: boolean | undefined;
    }>>;
    draftRounds: z.ZodDefault<z.ZodArray<z.ZodObject<{
        roundId: z.ZodNumber;
        userMessage: z.ZodString;
        assistantRaw: z.ZodString;
        fieldsUpdated: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        summary: z.ZodDefault<z.ZodString>;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        summary: string;
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        fieldsUpdated: string[];
    }, {
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        summary?: string | undefined;
        fieldsUpdated?: string[] | undefined;
    }>, "many">>;
    automationMode: z.ZodDefault<z.ZodEnum<["auto", "semi", "manual"]>>;
    messages: z.ZodDefault<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant", "system"]>;
        content: z.ZodString;
        thinking: z.ZodOptional<z.ZodString>;
        toolExecutions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tool: z.ZodString;
            agent: z.ZodOptional<z.ZodString>;
            label: z.ZodString;
            status: z.ZodEnum<["running", "processing", "completed", "error"]>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            result: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodUnknown>;
            error: z.ZodOptional<z.ZodString>;
            stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                status: z.ZodEnum<["pending", "active", "completed"]>;
            }, "strip", z.ZodTypeAny, {
                status: "active" | "completed" | "pending";
                label: string;
            }, {
                status: "active" | "completed" | "pending";
                label: string;
            }>, "many">>;
            startedAt: z.ZodNumber;
            completedAt: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>, "many">>;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">>;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        timestamp: z.ZodNumber;
        status: z.ZodEnum<["idle", "planning", "composing", "writing", "assessing", "repairing", "persisting", "waiting_human", "blocked", "completed", "failed"]>;
        bookId: z.ZodOptional<z.ZodString>;
        chapterNumber: z.ZodOptional<z.ZodNumber>;
        detail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }>, "many">>;
    pendingDecision: z.ZodOptional<z.ZodObject<{
        kind: z.ZodString;
        bookId: z.ZodString;
        chapterNumber: z.ZodOptional<z.ZodNumber>;
        summary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        kind: string;
        summary: string;
        bookId: string;
        chapterNumber?: number | undefined;
    }, {
        kind: string;
        summary: string;
        bookId: string;
        chapterNumber?: number | undefined;
    }>>;
    pendingProposedAction: z.ZodOptional<z.ZodObject<{
        action: z.ZodString;
        targetSessionKind: z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>;
        instruction: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        summary: z.ZodOptional<z.ZodString>;
        playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
        requestedSkills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        actionPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        action: string;
        instruction: string;
        targetSessionKind: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring";
        title?: string | undefined;
        summary?: string | undefined;
        playMode?: "open" | "guided" | undefined;
        requestedSkills?: string[] | undefined;
        actionPayload?: Record<string, unknown> | undefined;
    }, {
        action: string;
        instruction: string;
        targetSessionKind: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring";
        title?: string | undefined;
        summary?: string | undefined;
        playMode?: "open" | "guided" | undefined;
        requestedSkills?: string[] | undefined;
        actionPayload?: Record<string, unknown> | undefined;
    }>>;
    currentExecution: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<["idle", "planning", "composing", "writing", "assessing", "repairing", "persisting", "waiting_human", "blocked", "completed", "failed"]>;
        bookId: z.ZodOptional<z.ZodString>;
        chapterNumber: z.ZodOptional<z.ZodNumber>;
        stageLabel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    }, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
}, {
    sessionId: string;
    projectRoot: string;
    events?: {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }[] | undefined;
    messages?: {
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
    }[] | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
    modelOverride?: string | undefined;
    activeBookId?: string | undefined;
    activeChapterNumber?: number | undefined;
    creationDraft?: {
        concept: string;
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
        missingFields?: string[] | undefined;
        readyToCreate?: boolean | undefined;
    } | undefined;
    draftRounds?: {
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        summary?: string | undefined;
        fieldsUpdated?: string[] | undefined;
    }[] | undefined;
    automationMode?: "auto" | "manual" | "semi" | undefined;
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
}>;
export type InteractionSession = z.infer<typeof InteractionSessionSchema>;
export declare const BookSessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    bookId: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    title: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    messages: z.ZodDefault<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant", "system"]>;
        content: z.ZodString;
        thinking: z.ZodOptional<z.ZodString>;
        toolExecutions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tool: z.ZodString;
            agent: z.ZodOptional<z.ZodString>;
            label: z.ZodString;
            status: z.ZodEnum<["running", "processing", "completed", "error"]>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            result: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodUnknown>;
            error: z.ZodOptional<z.ZodString>;
            stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                status: z.ZodEnum<["pending", "active", "completed"]>;
            }, "strip", z.ZodTypeAny, {
                status: "active" | "completed" | "pending";
                label: string;
            }, {
                status: "active" | "completed" | "pending";
                label: string;
            }>, "many">>;
            startedAt: z.ZodNumber;
            completedAt: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>, "many">>;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">>;
    creationDraft: z.ZodOptional<z.ZodObject<{
        concept: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
        blurb: z.ZodOptional<z.ZodString>;
        worldPremise: z.ZodOptional<z.ZodString>;
        settingNotes: z.ZodOptional<z.ZodString>;
        protagonist: z.ZodOptional<z.ZodString>;
        supportingCast: z.ZodOptional<z.ZodString>;
        conflictCore: z.ZodOptional<z.ZodString>;
        volumeOutline: z.ZodOptional<z.ZodString>;
        constraints: z.ZodOptional<z.ZodString>;
        authorIntent: z.ZodOptional<z.ZodString>;
        currentFocus: z.ZodOptional<z.ZodString>;
        nextQuestion: z.ZodOptional<z.ZodString>;
        missingFields: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        readyToCreate: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        concept: string;
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
        missingFields?: string[] | undefined;
        readyToCreate?: boolean | undefined;
    }>>;
    draftRounds: z.ZodDefault<z.ZodArray<z.ZodObject<{
        roundId: z.ZodNumber;
        userMessage: z.ZodString;
        assistantRaw: z.ZodString;
        fieldsUpdated: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        summary: z.ZodDefault<z.ZodString>;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        summary: string;
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        fieldsUpdated: string[];
    }, {
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        summary?: string | undefined;
        fieldsUpdated?: string[] | undefined;
    }>, "many">>;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        timestamp: z.ZodNumber;
        status: z.ZodEnum<["idle", "planning", "composing", "writing", "assessing", "repairing", "persisting", "waiting_human", "blocked", "completed", "failed"]>;
        bookId: z.ZodOptional<z.ZodString>;
        chapterNumber: z.ZodOptional<z.ZodNumber>;
        detail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }>, "many">>;
    currentExecution: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<["idle", "planning", "composing", "writing", "assessing", "repairing", "persisting", "waiting_human", "blocked", "completed", "failed"]>;
        bookId: z.ZodOptional<z.ZodString>;
        chapterNumber: z.ZodOptional<z.ZodNumber>;
        stageLabel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    }, {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    }>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string | null;
    createdAt: number;
    updatedAt: number;
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
    bookId: string | null;
    sessionId: string;
    draftRounds: {
        summary: string;
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        fieldsUpdated: string[];
    }[];
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
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
    currentExecution?: {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    } | undefined;
}, {
    createdAt: number;
    updatedAt: number;
    bookId: string | null;
    sessionId: string;
    title?: string | null | undefined;
    events?: {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        kind: string;
        timestamp: number;
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        detail?: string | undefined;
    }[] | undefined;
    messages?: {
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
    }[] | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
    creationDraft?: {
        concept: string;
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
        missingFields?: string[] | undefined;
        readyToCreate?: boolean | undefined;
    } | undefined;
    draftRounds?: {
        timestamp: number;
        roundId: number;
        userMessage: string;
        assistantRaw: string;
        summary?: string | undefined;
        fieldsUpdated?: string[] | undefined;
    }[] | undefined;
    currentExecution?: {
        status: "completed" | "writing" | "failed" | "blocked" | "idle" | "planning" | "composing" | "assessing" | "repairing" | "persisting" | "waiting_human";
        bookId?: string | undefined;
        chapterNumber?: number | undefined;
        stageLabel?: string | undefined;
    } | undefined;
}>;
export type BookSession = z.infer<typeof BookSessionSchema>;
export declare const GlobalSessionSchema: z.ZodObject<{
    activeBookId: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    automationMode: z.ZodDefault<z.ZodEnum<["auto", "semi", "manual"]>>;
}, "strip", z.ZodTypeAny, {
    automationMode: "auto" | "manual" | "semi";
    activeBookId?: string | undefined;
}, {
    activeBookId?: string | undefined;
    automationMode?: "auto" | "manual" | "semi" | undefined;
}>;
export type GlobalSession = z.infer<typeof GlobalSessionSchema>;
export declare function createBookSession(bookId: string | null, sessionId?: string, sessionKind?: SessionKind, options?: {
    readonly playMode?: PlayMode;
}): BookSession;
export declare function appendBookSessionMessage(session: BookSession, message: InteractionMessage): BookSession;
export declare function bindActiveBook(session: InteractionSession, bookId: string, chapterNumber?: number): InteractionSession;
export declare function clearPendingDecision(session: InteractionSession): InteractionSession;
export declare function updateCreationDraft(session: InteractionSession, draft: BookCreationDraft): InteractionSession;
export declare function clearCreationDraft(session: InteractionSession): InteractionSession;
export declare function updateAutomationMode(session: InteractionSession, automationMode: AutomationMode): InteractionSession;
export declare function appendInteractionMessage(session: InteractionSession, message: InteractionMessage): InteractionSession;
export declare function appendInteractionEvent(session: InteractionSession, event: InteractionEvent): InteractionSession;
//# sourceMappingURL=session.d.ts.map