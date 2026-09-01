import { type LLMMessage, type LLMResponse } from "./provider.js";
export interface LongFormCompletionOptions {
    readonly messages: ReadonlyArray<LLMMessage>;
    readonly generate: (messages: ReadonlyArray<LLMMessage>) => Promise<LLMResponse>;
    readonly language?: "zh" | "en";
    readonly maxContinuations?: number;
    readonly onContinuation?: (pass: number) => void;
    readonly recoverAfterContinuation?: (fragments: string) => Promise<string>;
}
/**
 * Resume only a transport-confirmed output-limit response. Network interruption
 * remains a hard failure, and no partial document is ever returned as success.
 */
export declare function completeLongForm(options: LongFormCompletionOptions): Promise<LLMResponse>;
export declare function mergeExactContinuation(prefix: string, continuation: string): string;
//# sourceMappingURL=long-form-completion.d.ts.map