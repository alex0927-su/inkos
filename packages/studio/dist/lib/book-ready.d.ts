export interface StudioBookDetail {
    readonly book: {
        readonly id: string;
    };
    readonly chapters: ReadonlyArray<unknown>;
    readonly nextChapter: number;
}
export interface WaitForStudioBookReadyOptions {
    readonly fetchImpl?: typeof fetch;
    readonly wait?: (delayMs: number) => Promise<void>;
    readonly maxAttempts?: number;
    readonly retryDelayMs?: number;
}
export declare function waitForStudioBookReady(bookId: string, options?: WaitForStudioBookReadyOptions): Promise<StudioBookDetail>;
//# sourceMappingURL=book-ready.d.ts.map