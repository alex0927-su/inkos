import { type BookSession } from "./session.js";
export declare function readLegacyBookSession(projectRoot: string, sessionId: string): Promise<BookSession | null>;
export declare function migrateLegacyBookSessionToTranscript(projectRoot: string, session: BookSession): Promise<void>;
//# sourceMappingURL=session-transcript-legacy.d.ts.map