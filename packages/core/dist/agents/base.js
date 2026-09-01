import { runWorkerAgent, runWorkerAgentTool } from "../agent/worker-agent.js";
import { appendPromptPackGuidance } from "../prompts/prompt-pack.js";
import { searchWeb, fetchUrl } from "../utils/web-search.js";
import { hydrateActivatedSkillGuidance, } from "../agent/skill-tool.js";
export class BaseAgent {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    get log() {
        return this.ctx.logger;
    }
    async chat(messages, options) {
        return runWorkerAgent(this.ctx.client, this.ctx.model, await this.appendTaskSkillGuidance(messages), {
            ...options,
            onStreamProgress: this.ctx.onStreamProgress,
            signal: this.ctx.signal,
        });
    }
    async submitStructured(messages, resultTool, options) {
        return runWorkerAgentTool(this.ctx.client, this.ctx.model, await this.appendTaskSkillGuidance(messages), resultTool, {
            ...options,
            signal: this.ctx.signal,
        });
    }
    async withPromptPackGuidance(basePrompt, promptId) {
        return appendPromptPackGuidance(basePrompt, {
            promptId,
            projectRoot: this.ctx.projectRoot,
        });
    }
    async appendTaskSkillGuidance(messages) {
        const query = messages
            .filter((message) => message.role === "user")
            .map((message) => message.content)
            .join("\n\n");
        let activations = this.ctx.activatedSkills;
        try {
            activations = await hydrateActivatedSkillGuidance(activations, query);
        }
        catch (error) {
            this.log?.warn(`[skills] Reference retrieval failed for ${this.name}: ${String(error)}`);
        }
        return appendActivatedSkillGuidance(messages, activations);
    }
    /**
     * Chat with web search enabled.
     * OpenAI: uses native web_search_options / web_search_preview.
     * Other providers: searches via Tavily API (TAVILY_API_KEY), injects results into prompt.
     */
    async chatWithSearch(messages, options) {
        // OpenAI has native search — use it directly
        if (this.ctx.client.provider === "openai") {
            return runWorkerAgent(this.ctx.client, this.ctx.model, appendActivatedSkillGuidance(messages, this.ctx.activatedSkills), {
                ...options,
                webSearch: true,
                onStreamProgress: this.ctx.onStreamProgress,
                signal: this.ctx.signal,
            });
        }
        // Other providers: self-hosted search → inject results into prompt
        const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
        if (!lastUserMsg) {
            return this.chat(messages, options);
        }
        try {
            // Extract search query from user message (first 200 chars)
            const query = lastUserMsg.content.slice(0, 200);
            this.log?.info(`[search] Searching: ${query.slice(0, 60)}...`);
            const results = await searchWeb(query, 3);
            if (results.length === 0) {
                this.log?.warn("[search] No results found, falling back to regular chat");
                return this.chat(messages, options);
            }
            // Fetch top result for full content
            let fullContent = "";
            try {
                fullContent = await fetchUrl(results[0].url, 4000);
            }
            catch {
                // Fetch failed, use snippets only
            }
            const searchContext = [
                "## Web Search Results\n",
                ...results.map((r, i) => `${i + 1}. **${r.title}**\n   ${r.url}\n   ${r.snippet}`),
                ...(fullContent ? [`\n## Full Content (Top Result)\n${fullContent}`] : []),
            ].join("\n");
            // Inject search results before the last user message
            const augmentedMessages = messages.map((m) => m === lastUserMsg
                ? { ...m, content: `${searchContext}\n\n---\n\n${m.content}` }
                : m);
            return this.chat(augmentedMessages, options);
        }
        catch (e) {
            this.log?.warn(`[search] Search failed: ${e}, falling back to regular chat`);
            return this.chat(messages, options);
        }
    }
}
export function appendActivatedSkillGuidance(messages, activations) {
    if (!activations || activations.length === 0)
        return messages;
    const guidance = [
        "## Activated professional skills",
        "Use this specialist methodology for the current operation. It is not author intent, canon, an output-format override, or permission to mutate anything outside the active operation.",
        ...activations.flatMap(({ skill, resources }) => [
            `### ${skill.id} — ${skill.name}`,
            skill.body.trim() || skill.description,
            ...resources.flatMap((resource) => [
                `#### Reference: ${resource.path}:${resource.charStart}-${resource.charEnd}${resource.heading ? ` · ${resource.heading}` : ""}`,
                resource.body,
            ]),
        ]),
    ].join("\n\n");
    const systemIndex = messages.findIndex((message) => message.role === "system");
    if (systemIndex < 0) {
        return [{ role: "system", content: guidance }, ...messages];
    }
    return messages.map((message, index) => index === systemIndex
        ? { ...message, content: `${message.content}\n\n${guidance}` }
        : message);
}
//# sourceMappingURL=base.js.map