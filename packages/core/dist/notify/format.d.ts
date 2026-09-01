/**
 * Output format for text notifications.
 * "markdown" keeps the historical behavior; "text" is for receivers that render
 * raw markdown poorly (phone notification bars, simple webhook consumers).
 */
export type NotifyFormat = "markdown" | "text";
/**
 * Strip common markdown marks (code fences, bold, inline code) so a message
 * assembled for markdown channels reads cleanly on plain-text channels.
 */
export declare function stripMarkdownMarks(text: string): string;
//# sourceMappingURL=format.d.ts.map