import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const EMPTY_USAGE = {
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheWrite: 0,
    totalTokens: 0,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
};
const { agentInstances, runShortFictionProductionMock, runScriptCreationMock, runStoryboardCreationMock, runInteractiveFilmCreationMock, } = vi.hoisted(() => ({
    agentInstances: [],
    runShortFictionProductionMock: vi.fn(async (_options) => ({
        storyId: "story-en",
        outlinePath: "shorts/story-en/outline/v002.md",
        outlineReviewPath: "shorts/story-en/reviews/outline-v001.md",
        draftReviewPath: "shorts/story-en/reviews/draft-v001.md",
        finalMarkdownPath: "shorts/story-en/final/story.md",
        finalJsonPath: "shorts/story-en/final/story.json",
        salesPackagePath: "shorts/story-en/final/sales.md",
        coverPromptPath: "shorts/story-en/final/cover-prompt.md",
        coverImagePath: "shorts/story-en/final/cover.png",
    })),
    runScriptCreationMock: vi.fn(async (_options) => ({
        projectId: "script-en",
        specPath: "dramas/script-en/spec.md",
        scriptPath: "dramas/script-en/script.md",
    })),
    runStoryboardCreationMock: vi.fn(async (_options) => ({
        projectId: "storyboard-en",
        specPath: "storyboards/storyboard-en/spec.md",
        storyboardPath: "storyboards/storyboard-en/storyboard.md",
        imagePromptsPath: "storyboards/storyboard-en/image-prompts.md",
        assetsManifestPath: "storyboards/storyboard-en/assets.json",
    })),
    runInteractiveFilmCreationMock: vi.fn(async (_options) => ({
        projectId: "film-en",
        specPath: "interactive-films/film-en/spec.md",
        storyGraphPath: "interactive-films/film-en/story-graph.json",
        storyTreePath: "interactive-films/film-en/story-tree.md",
        flagsPath: "interactive-films/film-en/flags.md",
        scriptPath: "interactive-films/film-en/script.md",
        storyboardPath: "interactive-films/film-en/storyboard.md",
        imagePromptsPath: "interactive-films/film-en/image-prompts.md",
        assetsManifestPath: "interactive-films/film-en/assets.json",
    })),
}));
vi.mock("../pipeline/short-fiction-runner.js", async () => {
    const actual = await vi.importActual("../pipeline/short-fiction-runner.js");
    return { ...actual, runShortFictionProduction: runShortFictionProductionMock };
});
vi.mock("../pipeline/script-storyboard-runner.js", async () => {
    const actual = await vi.importActual("../pipeline/script-storyboard-runner.js");
    return {
        ...actual,
        runScriptCreation: runScriptCreationMock,
        runStoryboardCreation: runStoryboardCreationMock,
        runInteractiveFilmCreation: runInteractiveFilmCreationMock,
    };
});
vi.mock("@mariozechner/pi-agent-core", async () => {
    const actual = await vi.importActual("@mariozechner/pi-agent-core");
    class SpyAgent extends actual.Agent {
        constructor(options) {
            super(options);
            agentInstances.push(this);
        }
    }
    return { ...actual, Agent: SpyAgent };
});
vi.mock("@mariozechner/pi-ai", async () => {
    const actual = await vi.importActual("@mariozechner/pi-ai");
    const streamSimple = vi.fn((_model, _context) => {
        const stream = actual.createAssistantMessageEventStream();
        stream.push({
            type: "done",
            reason: "stop",
            message: {
                role: "assistant",
                content: [{ type: "text", text: "ok" }],
                api: "anthropic-messages",
                provider: "anthropic",
                model: "fake",
                usage: EMPTY_USAGE,
                stopReason: "stop",
                timestamp: Date.now(),
            },
        });
        return stream;
    });
    return {
        ...actual,
        streamSimple,
        getEnvApiKey: vi.fn(() => "fake-key"),
    };
});
import { createInteractiveFilmCreationTool, createPlayEditTool, createPlayReviseTool, createPlayStepTool, createProposeActionTool, createScriptCreationTool, createShortFictionRunTool, createStoryboardCreationTool, createSubAgentTool, } from "../agent/agent-tools.js";
import { runAgentSession, evictAgentCache } from "../agent/agent-session.js";
import { PlayStore } from "../play/play-store.js";
function toolText(result) {
    const block = result.content[0];
    return block?.type === "text" ? block.text ?? "" : "";
}
function contextPipeline(pipeline) {
    return {
        runWithAgentContext: vi.fn(async (context, task) => {
            context.signal?.throwIfAborted();
            return task();
        }),
        ...pipeline,
    };
}
describe("agent tools language wiring (en parity)", () => {
    let root;
    beforeEach(async () => {
        root = await mkdtemp(join(tmpdir(), "inkos-agent-tools-en-"));
        agentInstances.length = 0;
        runShortFictionProductionMock.mockClear();
        runScriptCreationMock.mockClear();
        runStoryboardCreationMock.mockClear();
        runInteractiveFilmCreationMock.mockClear();
    });
    afterEach(async () => {
        await rm(root, { recursive: true, force: true });
    });
    it("passes language 'en' from short_fiction_run to the short fiction runner", async () => {
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        const tool = createShortFictionRunTool(pipeline, root, { language: "en" });
        await tool.execute("short-en-1", { direction: "office revenge thriller" });
        expect(runShortFictionProductionMock).toHaveBeenCalledTimes(1);
        expect(runShortFictionProductionMock.mock.calls[0][0]).toMatchObject({ language: "en" });
    });
    it("persists English short language and word length in the confirmation payload", async () => {
        const result = await createProposeActionTool("en").execute("propose-short-en", {
            action: "short_run",
            instruction: "Write a complete English suspense short story.",
            shortRun: {
                title: "The Missing Ledger",
                direction: "an office suspense story about forged expense records",
                language: "en",
                chapters: 12,
                charsPerChapter: 650,
                cover: false,
            },
        });
        expect(result.details).toMatchObject({
            kind: "proposed_action",
            actionPayload: {
                shortRun: {
                    language: "en",
                    charsPerChapter: 650,
                },
            },
        });
    });
    it("records the English session language when the model omits it from shortRun", async () => {
        const result = await createProposeActionTool("en").execute("propose-short-en-default", {
            action: "short_run",
            instruction: "Write a complete English suspense short story.",
            shortRun: {
                title: "The Missing Ledger",
                direction: "an office suspense story about forged expense records",
                chapters: 12,
                charsPerChapter: 650,
                cover: false,
            },
        });
        expect(result.details).toMatchObject({
            actionPayload: { shortRun: { language: "en" } },
        });
    });
    it("lets an explicit shortRun.language=en override the zh session default in the confirmation payload", async () => {
        const result = await createProposeActionTool("zh").execute("propose-short-zh-en", {
            action: "short_run",
            instruction: "用户在中文对话里要求写一篇英文办公室悬疑短篇",
            shortRun: {
                title: "The Missing Ledger",
                direction: "an English office suspense story about forged expense records",
                language: "en",
                chapters: 12,
                charsPerChapter: 650,
                cover: false,
            },
        });
        expect(result.details).toMatchObject({
            kind: "proposed_action",
            actionPayload: {
                shortRun: {
                    language: "en",
                    charsPerChapter: 650,
                },
            },
        });
    });
    it("does not inject a zh charsPerChapter default when a zh session confirms an en short", async () => {
        const result = await createProposeActionTool("zh").execute("propose-short-zh-en-no-length", {
            action: "short_run",
            instruction: "用户在中文对话里要求写一篇英文短篇，未指定每章字数",
            shortRun: {
                title: "The Missing Ledger",
                direction: "an English office suspense story",
                language: "en",
                cover: false,
            },
        });
        const shortRun = result.details.actionPayload.shortRun;
        expect(shortRun.language).toBe("en");
        expect(shortRun.charsPerChapter).toBeUndefined();
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        const tool = createShortFictionRunTool(pipeline, root, {
            language: "zh",
            actionPayload: { shortRun },
        });
        await tool.execute("short-zh-en-no-length", { direction: "fallback direction" });
        const runnerOptions = runShortFictionProductionMock.mock.calls[0][0];
        expect(runnerOptions.language).toBe("en");
        expect(runnerOptions.charsPerChapter).toBeUndefined();
    });
    it("documents in the shortRun.language schema that the output language may differ from the conversation language", () => {
        const parameters = createProposeActionTool("zh").parameters;
        const description = parameters.properties.shortRun.properties.language.description;
        expect(description).toMatch(/output language/i);
        expect(description).toMatch(/differ from the conversation language/i);
    });
    it("lets the confirmed short payload override the project language", async () => {
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        const tool = createShortFictionRunTool(pipeline, root, {
            language: "zh",
            actionPayload: {
                shortRun: {
                    direction: "an English office thriller",
                    language: "en",
                    chapters: 12,
                    charsPerChapter: 650,
                    cover: false,
                },
            },
        });
        await tool.execute("short-payload-en", { direction: "fallback direction" });
        expect(runShortFictionProductionMock.mock.calls[0][0]).toMatchObject({
            language: "en",
            charsPerChapter: 650,
        });
    });
    it("keeps short_fiction_run language undefined by default so the runner falls back to zh", async () => {
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        const tool = createShortFictionRunTool(pipeline, root);
        await tool.execute("short-zh-1", { direction: "女频短篇 婚姻背叛 证据反杀" });
        expect(runShortFictionProductionMock).toHaveBeenCalledTimes(1);
        expect(runShortFictionProductionMock.mock.calls[0][0].language).toBeUndefined();
    });
    it("passes language 'en' from script/storyboard/interactive-film tools to their runners", async () => {
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        await createScriptCreationTool(pipeline, root, { language: "en" })
            .execute("script-en-1", { title: "Night Shift", instruction: "adapt into a short drama" });
        await createStoryboardCreationTool(pipeline, root, { language: "en" })
            .execute("storyboard-en-1", { title: "Night Shift", instruction: "storyboard the opening" });
        await createInteractiveFilmCreationTool(pipeline, root, { language: "en" })
            .execute("film-en-1", { title: "Night Shift", instruction: "make it interactive" });
        expect(runScriptCreationMock.mock.calls[0][0]).toMatchObject({ language: "en" });
        expect(runStoryboardCreationMock.mock.calls[0][0]).toMatchObject({ language: "en" });
        expect(runInteractiveFilmCreationMock.mock.calls[0][0]).toMatchObject({ language: "en" });
    });
    it("runs standalone production tools inside the pipeline abort scope", async () => {
        const pipeline = contextPipeline({
            createAgentContext: vi.fn(() => ({})),
        });
        const controller = new AbortController();
        await createShortFictionRunTool(pipeline, root)
            .execute("short-abort-1", { direction: "女频短篇 婚姻背叛 证据反杀" }, controller.signal);
        await createScriptCreationTool(pipeline, root)
            .execute("script-abort-1", { title: "Night Shift", instruction: "adapt into a short drama" }, controller.signal);
        await createStoryboardCreationTool(pipeline, root)
            .execute("storyboard-abort-1", { title: "Night Shift", instruction: "storyboard the opening" }, controller.signal);
        await createInteractiveFilmCreationTool(pipeline, root)
            .execute("film-abort-1", { title: "Night Shift", instruction: "make it interactive" }, controller.signal);
        expect(pipeline.runWithAgentContext).toHaveBeenCalledTimes(4);
        expect(pipeline.runWithAgentContext.mock.calls.every(([context]) => context.signal === controller.signal)).toBe(true);
        expect(runShortFictionProductionMock.mock.calls[0][0]).toMatchObject({ signal: controller.signal });
    });
    it("exposes short_fiction_run with en language in a confirmed en short session", async () => {
        const model = { provider: "x", id: "y", api: "anthropic-messages" };
        const pipeline = contextPipeline({ createAgentContext: vi.fn(() => ({})) });
        try {
            await runAgentSession({
                sessionId: "short-en-session",
                bookId: null,
                sessionKind: "short",
                actionSource: "button",
                requestedIntent: "short_run",
                language: "en",
                pipeline,
                projectRoot: root,
                model,
            }, "hi");
            const tool = agentInstances[0].state.tools.find((entry) => entry.name === "short_fiction_run");
            expect(tool).toBeTruthy();
            await tool.execute("short-en-session-1", { direction: "office revenge thriller" });
            expect(runShortFictionProductionMock.mock.calls[0][0]).toMatchObject({ language: "en" });
        }
        finally {
            evictAgentCache("short-en-session");
        }
    });
    it("returns English sub_agent guidance in en sessions and keeps zh by default", async () => {
        const pipeline = contextPipeline({ reviseFoundation: vi.fn(async () => undefined) });
        const enTool = createSubAgentTool(pipeline, "harbor", undefined, { language: "en" });
        const enBlocked = await enTool.execute("sub-en-1", { agent: "architect", instruction: "create book" });
        expect(toolText(enBlocked)).toContain("already has a book");
        expect(toolText(enBlocked)).not.toMatch(/[一-鿿]/);
        const enRevised = await enTool.execute("sub-en-2", {
            agent: "architect",
            revise: true,
            feedback: "tighten the antagonist arc",
            instruction: "rewrite the foundation",
        });
        expect(toolText(enRevised)).toContain("foundation has been rewritten");
        expect(toolText(enRevised)).not.toMatch(/[一-鿿]/);
        const zhTool = createSubAgentTool(pipeline, "harbor");
        const zhBlocked = await zhTool.execute("sub-zh-1", { agent: "architect", instruction: "建书" });
        expect(toolText(zhBlocked)).toContain("当前已有书籍");
    });
    it("returns English no-world guidance from play tools in en sessions and keeps zh by default", async () => {
        const pipeline = { createAgentContext: vi.fn(() => ({})) };
        const enEdit = await createPlayEditTool(root, "play-none", "en").execute("play-edit-en", {});
        expect(toolText(enEdit)).toContain("no interactive world to edit");
        const zhEdit = await createPlayEditTool(root, "play-none").execute("play-edit-zh", {});
        expect(toolText(zhEdit)).toContain("还没有可编辑的互动世界");
        const enStep = await createPlayStepTool(pipeline, root, "play-none", { language: "en" })
            .execute("play-step-en", { input: "look around" });
        expect(toolText(enStep)).toContain("no interactive world to advance");
        const zhStep = await createPlayStepTool(pipeline, root, "play-none")
            .execute("play-step-zh", { input: "观察四周" });
        expect(toolText(zhStep)).toContain("还没有可推进的互动世界");
        const enRevise = await createPlayReviseTool(pipeline, root, "play-none", { language: "en" })
            .execute("play-revise-en", { action: "regenerate_last" });
        expect(toolText(enRevise)).toContain("no interactive world to redo");
        const zhRevise = await createPlayReviseTool(pipeline, root, "play-none")
            .execute("play-revise-zh", { action: "regenerate_last" });
        expect(toolText(zhRevise)).toContain("还没有可重做的互动世界");
    });
    it("uses the play world language for play_edit and play_revise runtime feedback", async () => {
        const store = new PlayStore(root);
        await store.createWorld({
            id: "play-en-world",
            title: "Rainy Flatshare",
            premise: "I just moved into a flatshare.",
            mode: "open",
            worldContract: "Time advances with action semantics.",
            visualContract: "Cold rainy light, no game UI.",
            language: "en",
        });
        await store.ensureRun("play-en-world", "main");
        const editResult = await createPlayEditTool(root, "play-en-world", "en").execute("play-edit-en-world", {
            playerPersona: "A new tenant who wants to trace the blackout night.",
        });
        expect(toolText(editResult)).toBe("Interactive world settings updated.");
        const pipeline = { createAgentContext: vi.fn(() => ({})) };
        const reviseResult = await createPlayReviseTool(pipeline, root, "play-en-world", { language: "en" })
            .execute("play-revise-en-world", { action: "restore_variant" });
        expect(toolText(reviseResult)).toContain("requires both turn and variantId");
        expect(toolText(reviseResult)).not.toMatch(/[一-鿿]/);
    });
});
//# sourceMappingURL=agent-tools-en-language.test.js.map