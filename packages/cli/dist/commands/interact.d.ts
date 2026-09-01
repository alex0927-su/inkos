import { Command } from "commander";
export interface InteractCommandHooks {
    readonly readInput?: () => Promise<string>;
}
export declare function createInteractCommand(hooks?: InteractCommandHooks): Command;
//# sourceMappingURL=interact.d.ts.map