import type { TuiCopy } from "./i18n.js";
export interface ActivityState {
    readonly label: string;
    readonly frames: readonly string[];
    readonly accent: string;
    readonly intervalMs: number;
}
export declare function describeActivityState(copy: Pick<TuiCopy, "activity">): ActivityState;
//# sourceMappingURL=activity-state.d.ts.map