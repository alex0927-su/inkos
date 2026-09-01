import type { HookPayoffTiming, HookStatus } from "../models/runtime-state.js";
import type { StoredHook } from "../state/memory-db.js";
import { type HookPhase } from "./hook-policy.js";
export declare const DEFAULT_HOOK_LOOKAHEAD_CHAPTERS = 3;
export declare function resolveHookStatusAlias(status: string | undefined | null): HookStatus | undefined;
export declare function normalizeStoredHookStatus(status: string): HookStatus;
export declare function filterActiveHooks(hooks: ReadonlyArray<StoredHook>): StoredHook[];
export declare function isFuturePlannedHook(hook: StoredHook, chapterNumber: number, lookahead?: number): boolean;
export declare function isHookWithinChapterWindow(hook: StoredHook, chapterNumber: number, recentWindow?: number, lookahead?: number): boolean;
export declare function normalizeHookPayoffTiming(value: string | undefined | null): HookPayoffTiming | undefined;
export declare function inferHookPayoffTiming(params: {
    readonly expectedPayoff?: string;
    readonly notes?: string;
}): HookPayoffTiming;
export declare function resolveHookPayoffTiming(params: {
    readonly payoffTiming?: string | null;
    readonly expectedPayoff?: string;
    readonly notes?: string;
}): HookPayoffTiming;
export declare function localizeHookPayoffTiming(timing: HookPayoffTiming, language: "zh" | "en"): string;
export declare function describeHookLifecycle(params: {
    readonly payoffTiming?: string | null;
    readonly expectedPayoff?: string;
    readonly notes?: string;
    readonly startChapter: number;
    readonly lastAdvancedChapter: number;
    readonly status: string;
    readonly chapterNumber: number;
    readonly targetChapters?: number;
}): {
    readonly timing: HookPayoffTiming;
    readonly phase: HookPhase;
    readonly age: number;
    readonly dormancy: number;
    readonly readyToResolve: boolean;
    readonly stale: boolean;
    readonly overdue: boolean;
    readonly advancePressure: number;
    readonly resolvePressure: number;
};
//# sourceMappingURL=hook-lifecycle.d.ts.map