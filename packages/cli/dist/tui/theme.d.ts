/** Whether the terminal is macOS Terminal.app. */
export declare const isAppleTerminal: boolean;
export type TerminalBackground = "dark" | "light";
export interface TuiTheme {
    readonly accent: string;
    readonly muted: string;
    readonly reply: string;
    readonly border: string;
    readonly success: string;
    readonly error: string;
    readonly active: string;
    readonly idle: string;
    readonly user: string;
    readonly system: string;
}
export declare function detectTerminalBackground(env?: Partial<NodeJS.ProcessEnv>): TerminalBackground;
export declare function resolveTuiTheme(env?: Partial<NodeJS.ProcessEnv>): TuiTheme;
export declare const WARM_ACCENT: string;
export declare const WARM_MUTED: string;
export declare const WARM_REPLY: string;
export declare const WARM_BORDER: string;
export declare const STATUS_SUCCESS: string;
export declare const STATUS_ERROR: string;
export declare const STATUS_ACTIVE: string;
export declare const STATUS_IDLE: string;
export declare const ROLE_USER: string;
export declare const ROLE_SYSTEM: string;
//# sourceMappingURL=theme.d.ts.map