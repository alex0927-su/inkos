import type { CliLanguage } from "../localization.js";
export declare function buildSlashCommands(language?: CliLanguage): readonly string[];
export declare const SLASH_COMMANDS: readonly string[];
export type SlashNavigationDirection = "up" | "down";
export declare function getSlashSuggestions(input: string, commands: readonly string[]): string[];
export declare function getNextSlashSelection(currentIndex: number, suggestionCount: number, direction: SlashNavigationDirection): number;
export declare function applySlashSuggestion(_input: string, suggestions: readonly string[], selectedIndex: number): string;
//# sourceMappingURL=slash-autocomplete.d.ts.map