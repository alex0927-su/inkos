import { type Platform } from "@actalk/inkos-core";
export { waitForStudioBookReady } from "../lib/book-ready.js";
export type { StudioBookDetail, WaitForStudioBookReadyOptions } from "../lib/book-ready.js";
export interface StudioCreateBookBody {
    readonly title: string;
    readonly genre: string;
    readonly language?: string;
    readonly platform?: string;
    readonly chapterWordCount?: number;
    readonly targetChapters?: number;
    readonly blurb?: string;
}
export interface StudioBookConfigDraft {
    readonly id: string;
    readonly title: string;
    readonly platform: Platform;
    readonly genre: string;
    readonly status: "outlining";
    readonly targetChapters: number;
    readonly chapterWordCount: number;
    readonly language?: "zh" | "en";
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare function normalizeStudioPlatform(platform?: string): Platform;
export declare function buildStudioBookConfig(body: StudioCreateBookBody, now: string): StudioBookConfigDraft;
//# sourceMappingURL=book-create.d.ts.map