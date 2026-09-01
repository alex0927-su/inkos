/**
 * Strip common markdown marks (code fences, bold, inline code) so a message
 * assembled for markdown channels reads cleanly on plain-text channels.
 */
export function stripMarkdownMarks(text) {
    return text
        .replace(/```[^\n]*\n?/g, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1");
}
//# sourceMappingURL=format.js.map