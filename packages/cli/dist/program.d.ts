import { Command } from "commander";
import { type InteractCommandHooks } from "./commands/interact.js";
export interface ProgramHooks {
    readonly launchTui?: (projectRoot: string) => Promise<void> | void;
    readonly launchStudio?: (projectRoot: string, port: string) => Promise<void> | void;
    readonly readInteractionInput?: InteractCommandHooks["readInput"];
}
export declare function createProgram(hooks?: ProgramHooks): Command;
export declare function runProgram(argv?: string[], hooks?: ProgramHooks): Promise<void>;
//# sourceMappingURL=program.d.ts.map