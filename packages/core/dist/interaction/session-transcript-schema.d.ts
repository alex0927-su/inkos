import { z } from "zod";
import { type PlayMode, type SessionKind } from "./session.js";
export type { SessionKind };
export type { PlayMode };
export declare const TranscriptRoleSchema: z.ZodEnum<["user", "assistant", "toolResult", "system"]>;
export type TranscriptRole = z.infer<typeof TranscriptRoleSchema>;
export declare const SessionCreatedEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"session_created">;
    bookId: z.ZodNullable<z.ZodString>;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    title: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "session_created";
    title: string | null;
    createdAt: number;
    updatedAt: number;
    version: 1;
    timestamp: number;
    bookId: string | null;
    sessionId: string;
    seq: number;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "session_created";
    createdAt: number;
    updatedAt: number;
    version: 1;
    timestamp: number;
    bookId: string | null;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>;
export declare const SessionMetadataUpdatedEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"session_metadata_updated">;
    bookId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "session_metadata_updated";
    updatedAt: number;
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    bookId?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "session_metadata_updated";
    updatedAt: number;
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    bookId?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>;
export declare const RequestStartedEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_started">;
    requestId: z.ZodString;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    input: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_started";
    version: 1;
    input: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "request_started";
    version: 1;
    input: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>;
export declare const RequestCommittedEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_committed">;
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_committed";
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}, {
    type: "request_committed";
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}>;
export declare const RequestFailedEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_failed">;
    requestId: z.ZodString;
    error: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_failed";
    version: 1;
    error: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}, {
    type: "request_failed";
    version: 1;
    error: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}>;
export declare const MessageEventSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"message">;
    requestId: z.ZodString;
    uuid: z.ZodString;
    parentUuid: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<["user", "assistant", "toolResult", "system"]>;
    piTurnIndex: z.ZodOptional<z.ZodNumber>;
    toolCallId: z.ZodOptional<z.ZodString>;
    sourceToolAssistantUuid: z.ZodOptional<z.ZodString>;
    legacyDisplay: z.ZodOptional<z.ZodObject<{
        thinking: z.ZodOptional<z.ZodString>;
        toolExecutions: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    }, "strip", z.ZodTypeAny, {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    }, {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    }>>;
    message: z.ZodUnknown;
}, "strip", z.ZodTypeAny, {
    type: "message";
    version: 1;
    uuid: string;
    role: "user" | "assistant" | "toolResult" | "system";
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    parentUuid: string | null;
    message?: unknown;
    piTurnIndex?: number | undefined;
    toolCallId?: string | undefined;
    sourceToolAssistantUuid?: string | undefined;
    legacyDisplay?: {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    } | undefined;
}, {
    type: "message";
    version: 1;
    uuid: string;
    role: "user" | "assistant" | "toolResult" | "system";
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    parentUuid: string | null;
    message?: unknown;
    piTurnIndex?: number | undefined;
    toolCallId?: string | undefined;
    sourceToolAssistantUuid?: string | undefined;
    legacyDisplay?: {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    } | undefined;
}>;
export declare const TranscriptEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"session_created">;
    bookId: z.ZodNullable<z.ZodString>;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    title: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "session_created";
    title: string | null;
    createdAt: number;
    updatedAt: number;
    version: 1;
    timestamp: number;
    bookId: string | null;
    sessionId: string;
    seq: number;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "session_created";
    createdAt: number;
    updatedAt: number;
    version: 1;
    timestamp: number;
    bookId: string | null;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>, z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"session_metadata_updated">;
    bookId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    playMode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "session_metadata_updated";
    updatedAt: number;
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    bookId?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "session_metadata_updated";
    updatedAt: number;
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    title?: string | null | undefined;
    bookId?: string | null | undefined;
    playMode?: "open" | "guided" | undefined;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>, z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_started">;
    requestId: z.ZodString;
    sessionKind: z.ZodOptional<z.ZodEnum<["chat", "book-create", "book", "short", "play", "script", "storyboard", "interactive-film", "edit", "interactive-film-authoring"]>>;
    input: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_started";
    version: 1;
    input: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}, {
    type: "request_started";
    version: 1;
    input: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    sessionKind?: "chat" | "script" | "storyboard" | "interactive-film" | "play" | "short" | "book" | "book-create" | "edit" | "interactive-film-authoring" | undefined;
}>, z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_committed">;
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_committed";
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}, {
    type: "request_committed";
    version: 1;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}>, z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"request_failed">;
    requestId: z.ZodString;
    error: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "request_failed";
    version: 1;
    error: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}, {
    type: "request_failed";
    version: 1;
    error: string;
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
}>, z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionId: z.ZodString;
    seq: z.ZodNumber;
    timestamp: z.ZodNumber;
} & {
    type: z.ZodLiteral<"message">;
    requestId: z.ZodString;
    uuid: z.ZodString;
    parentUuid: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<["user", "assistant", "toolResult", "system"]>;
    piTurnIndex: z.ZodOptional<z.ZodNumber>;
    toolCallId: z.ZodOptional<z.ZodString>;
    sourceToolAssistantUuid: z.ZodOptional<z.ZodString>;
    legacyDisplay: z.ZodOptional<z.ZodObject<{
        thinking: z.ZodOptional<z.ZodString>;
        toolExecutions: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    }, "strip", z.ZodTypeAny, {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    }, {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    }>>;
    message: z.ZodUnknown;
}, "strip", z.ZodTypeAny, {
    type: "message";
    version: 1;
    uuid: string;
    role: "user" | "assistant" | "toolResult" | "system";
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    parentUuid: string | null;
    message?: unknown;
    piTurnIndex?: number | undefined;
    toolCallId?: string | undefined;
    sourceToolAssistantUuid?: string | undefined;
    legacyDisplay?: {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    } | undefined;
}, {
    type: "message";
    version: 1;
    uuid: string;
    role: "user" | "assistant" | "toolResult" | "system";
    timestamp: number;
    sessionId: string;
    seq: number;
    requestId: string;
    parentUuid: string | null;
    message?: unknown;
    piTurnIndex?: number | undefined;
    toolCallId?: string | undefined;
    sourceToolAssistantUuid?: string | undefined;
    legacyDisplay?: {
        thinking?: string | undefined;
        toolExecutions?: unknown[] | undefined;
    } | undefined;
}>]>;
export type SessionCreatedEvent = z.infer<typeof SessionCreatedEventSchema>;
export type SessionMetadataUpdatedEvent = z.infer<typeof SessionMetadataUpdatedEventSchema>;
export type RequestStartedEvent = z.infer<typeof RequestStartedEventSchema>;
export type RequestCommittedEvent = z.infer<typeof RequestCommittedEventSchema>;
export type RequestFailedEvent = z.infer<typeof RequestFailedEventSchema>;
export type MessageEvent = z.infer<typeof MessageEventSchema>;
export type TranscriptEvent = z.infer<typeof TranscriptEventSchema>;
//# sourceMappingURL=session-transcript-schema.d.ts.map