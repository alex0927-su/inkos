import { Command } from "commander";
import { type CliLanguage } from "../localization.js";
export declare function buildGenreTemplate(params: {
    readonly id: string;
    readonly name: string;
    readonly numerical: boolean;
    readonly power: boolean;
    readonly era: boolean;
}, language?: CliLanguage): string;
export declare const genreCommand: Command;
//# sourceMappingURL=genre.d.ts.map