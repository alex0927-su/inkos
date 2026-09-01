import { BaseAgent } from "../agents/base.js";
import { parseForecastModelOutput, } from "./schema.js";
import { buildForecastRepairPrompt, buildForecastSystemPrompt, buildForecastUserPrompt, } from "./prompts.js";
/**
 * Single-call forecast generator with one validation-driven retry: if the
 * first response fails JSON/schema/branch-count validation, the error is fed
 * back to the model once. A second failure surfaces as a hard error — the
 * runner then writes nothing to disk.
 */
export class NarrativeForecastAgent extends BaseAgent {
    get name() {
        return "narrative-forecast";
    }
    async generateBranches(input) {
        const messages = [
            { role: "system", content: buildForecastSystemPrompt(input.language) },
            { role: "user", content: buildForecastUserPrompt(input, input.language) },
        ];
        const maxTokens = estimateForecastMaxTokens(input.branchCount, input.horizon);
        const first = await this.chat(messages, { temperature: 0.6, maxTokens });
        let firstError;
        try {
            return validateGeneratedOutput(parseForecastModelOutput(first.content), input.branchCount);
        }
        catch (error) {
            firstError = error;
            this.log?.warn(`[narrative-forecast] model output invalid, retrying once: ${String(error)}`);
        }
        const retry = await this.chat([
            ...messages,
            { role: "assistant", content: first.content },
            { role: "user", content: buildForecastRepairPrompt(String(firstError), input.language) },
        ], { temperature: 0.4, maxTokens });
        return validateGeneratedOutput(parseForecastModelOutput(retry.content), input.branchCount);
    }
}
function validateGeneratedOutput(output, expectedBranches) {
    if (output.branches.length !== expectedBranches) {
        throw new Error(`narrative forecast model returned ${output.branches.length} branches, expected exactly ${expectedBranches}.`);
    }
    return output;
}
// Planning material is compact; scale headroom with branch count and horizon.
// zh chars run ~1.5 tokens each, so this deliberately over-provisions for en.
function estimateForecastMaxTokens(branchCount, horizon) {
    return Math.max(8192, branchCount * (horizon * 220 + 1600));
}
//# sourceMappingURL=agent.js.map