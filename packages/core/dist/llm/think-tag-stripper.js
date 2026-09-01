// 部分 OpenAI 兼容服务（如 MiniMax M2.x、经网关代理的 DeepSeek-R1 类模型）会把
// 思考内容以 <think>...</think> 标签内联在 content 字段的开头返回（issue #329）。
// 这里只剥离"响应起始处的完整 think 块"：正文中间出现的 "<think>" 字样不动，
// 起始处未闭合的 think 块也原样保留（说明正文根本没生成，剥掉会造成数据丢失）。
const OPEN_TAG = "<think>";
const CLOSE_TAG = "</think>";
/**
 * 流式剥离器：只处理响应起始处的完整 <think>...</think> 块。
 * 在能确定"开头不是 think 块"之前先缓冲，不向外发出任何文本，
 * 保证思考内容不会先展示再消失以外——根本不会被发出。
 */
export function createLeadingThinkTagStripper() {
    let state = "detecting";
    let pending = "";
    const push = (chunk) => {
        if (state === "passthrough")
            return chunk;
        pending += chunk;
        if (state === "detecting") {
            const leadingWhitespace = /^\s*/.exec(pending)[0];
            const rest = pending.slice(leadingWhitespace.length);
            if (rest.length < OPEN_TAG.length) {
                if (OPEN_TAG.startsWith(rest))
                    return ""; // 还无法判断，继续缓冲
                state = "passthrough";
                const out = pending;
                pending = "";
                return out;
            }
            if (!rest.startsWith(OPEN_TAG)) {
                state = "passthrough";
                const out = pending;
                pending = "";
                return out;
            }
            state = "insideThink";
        }
        // state === "insideThink"：等待闭合标签
        const closeIndex = pending.indexOf(CLOSE_TAG);
        if (closeIndex < 0)
            return "";
        state = "passthrough";
        const afterClose = pending.slice(closeIndex + CLOSE_TAG.length).replace(/^\s+/, "");
        pending = "";
        return afterClose;
    };
    const flush = () => {
        const out = pending;
        pending = "";
        state = "passthrough";
        return out;
    };
    return { push, flush };
}
/** 非流式版本：剥离字符串起始处的完整 <think>...</think> 块（语义与流式剥离器一致）。 */
export function stripLeadingThinkBlock(text) {
    const stripper = createLeadingThinkTagStripper();
    return stripper.push(text) + stripper.flush();
}
//# sourceMappingURL=think-tag-stripper.js.map