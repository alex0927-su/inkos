import { type TuiLocale } from "./i18n.js";
export interface TuiFrameState {
    readonly locale?: TuiLocale;
    readonly projectName: string;
    readonly activeBookTitle?: string;
    readonly automationMode: string;
    readonly status: string;
    readonly messages?: ReadonlyArray<string>;
    readonly events?: ReadonlyArray<string>;
}
export declare function renderTuiFrame(state: TuiFrameState): string;
export declare function launchTui(projectRoot: string): Promise<void>;
//# sourceMappingURL=app.d.ts.map