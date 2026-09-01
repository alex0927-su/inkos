import { Command } from "commander";
export interface StudioLaunchSpec {
    readonly studioEntry: string;
    readonly command: string;
    readonly args: string[];
}
export interface BrowserLaunchSpec {
    readonly command: string;
    readonly args: string[];
}
export interface StudioCommandHooks {
    readonly launchStudio?: (projectRoot: string, port: string) => Promise<void> | void;
}
export declare function toNodeImportSpecifier(path: string): string;
export declare function resolveBrowserLaunch(platform: NodeJS.Platform, url: string): BrowserLaunchSpec;
export declare function resolveStudioLaunch(root: string): Promise<StudioLaunchSpec | null>;
export declare function launchStudioWorkbench(root: string, port: string): Promise<void>;
export declare function launchStudioEntry(root: string, port: string, hooks?: StudioCommandHooks): Promise<void>;
export declare function createStudioCommand(hooks?: StudioCommandHooks): Command;
export declare const studioCommand: Command;
//# sourceMappingURL=studio.d.ts.map