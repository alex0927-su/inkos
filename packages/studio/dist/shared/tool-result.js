function textFromContentParts(content) {
    if (!Array.isArray(content))
        return "";
    return content
        .map((part) => {
        if (!part || typeof part !== "object")
            return "";
        const item = part;
        return item.type === "text" && typeof item.text === "string" ? item.text : "";
    })
        .filter(Boolean)
        .join("\n");
}
export function summarizeToolResult(result, maxLength = 2000) {
    let text = "";
    if (typeof result === "string") {
        text = result;
    }
    else if (result && typeof result === "object") {
        const record = result;
        if (typeof record.content === "string")
            text = record.content;
        else
            text = textFromContentParts(record.content);
        if (!text && typeof record.text === "string")
            text = record.text;
        if (!text && typeof record.message === "string")
            text = record.message;
    }
    if (!text) {
        if (result === undefined || result === null)
            return "";
        try {
            text = JSON.stringify(result);
        }
        catch {
            text = "";
        }
    }
    return text.slice(0, maxLength);
}
//# sourceMappingURL=tool-result.js.map