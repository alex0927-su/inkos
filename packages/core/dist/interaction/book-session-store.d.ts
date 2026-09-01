import type { BookSession, PlayMode, SessionKind } from "./session.js";
/**
 * 从 messages 数组里取第一条 user 消息，裁剪成 ≤20 字的单行字符串。
 * 用于把用户首条提问作为会话标题。
 */
export declare function extractFirstUserMessageTitle(messages: unknown): string | null;
export declare class SessionAlreadyMigratedError extends Error {
    constructor(sessionId: string, currentBookId: string);
}
export declare function loadBookSession(projectRoot: string, sessionId: string): Promise<BookSession | null>;
export declare function persistBookSession(projectRoot: string, session: BookSession): Promise<void>;
export interface BookSessionSummary {
    readonly sessionId: string;
    readonly bookId: string | null;
    readonly sessionKind?: SessionKind;
    readonly playMode?: PlayMode;
    readonly title: string | null;
    readonly messageCount: number;
    readonly createdAt: number;
    readonly updatedAt: number;
}
export declare function listBookSessions(projectRoot: string, bookId: string | null): Promise<ReadonlyArray<BookSessionSummary>>;
export declare function renameBookSession(projectRoot: string, sessionId: string, title: string): Promise<BookSession | null>;
export declare function deleteBookSession(projectRoot: string, sessionId: string): Promise<void>;
export declare function migrateBookSession(projectRoot: string, sessionId: string, newBookId: string): Promise<BookSession | null>;
export declare function createAndPersistBookSession(projectRoot: string, bookId: string | null, sessionId?: string, sessionKind?: SessionKind, options?: {
    readonly playMode?: PlayMode;
}): Promise<BookSession>;
//# sourceMappingURL=book-session-store.d.ts.map