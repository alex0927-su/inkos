export interface LeadingThinkTagStripper {
    /** 送入一段增量文本，返回可以安全并入正文的部分（可能为空串，表示还在缓冲判断）。 */
    readonly push: (chunk: string) => string;
    /** 流结束时调用：把仍在缓冲的文本原样返回（未闭合的 think 块不剥离）。 */
    readonly flush: () => string;
}
/**
 * 流式剥离器：只处理响应起始处的完整 <think>...</think> 块。
 * 在能确定"开头不是 think 块"之前先缓冲，不向外发出任何文本，
 * 保证思考内容不会先展示再消失以外——根本不会被发出。
 */
export declare function createLeadingThinkTagStripper(): LeadingThinkTagStripper;
/** 非流式版本：剥离字符串起始处的完整 <think>...</think> 块（语义与流式剥离器一致）。 */
export declare function stripLeadingThinkBlock(text: string): string;
//# sourceMappingURL=think-tag-stripper.d.ts.map