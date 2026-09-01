// Models
export { BookConfigSchema, PlatformSchema, GenreSchema, BookStatusSchema, FanficModeSchema, normalizePlatformId, normalizePlatformOrOther, resolveChapterReviewMode, resolveRevisionGate } from "./models/book.js";
export { ChapterMetaSchema, ChapterStatusSchema } from "./models/chapter.js";
export { ProjectConfigSchema, LLMConfigSchema, AgentLLMOverrideSchema, DetectionConfigSchema, QualityGatesSchema, FoundationConfigSchema, WritingConfigSchema, ResearchSearchConfigSchema } from "./models/project.js";
export { GenreProfileSchema, parseGenreProfile } from "./models/genre-profile.js";
export { BookRulesSchema, parseBookRules, tryParseBookRulesFrontmatter } from "./models/book-rules.js";
export { LengthCountingModeSchema, LengthSpecSchema, LengthTelemetrySchema, LengthWarningSchema } from "./models/length-governance.js";
export { commitProductionArtifacts, createProductionRunSnapshot, createRangeObservation, writeProductionRunSnapshot, } from "./production/harness.js";
export { RuntimeStateLanguageSchema, StateManifestSchema, HookStatusSchema, HookRecordSchema, HooksStateSchema, ChapterSummaryRowSchema, ChapterSummariesStateSchema, CurrentStateFactSchema, CurrentStateStateSchema, CurrentStatePatchSchema, HookOpsSchema, NewHookCandidateSchema, RuntimeStateDeltaSchema, } from "./models/runtime-state.js";
export { PlayActionKindSchema, PlayActionIntentSchema, PlayEntityTypeSchema, PlayEntitySchema, PlayVisibilitySchema, PlayEdgeSchema, PlayStateSlotKindSchema, PlayStateSlotSchema, PlayEvidenceStatusSchema, PlayEvidenceTransitionSchema, PlayEventSchema, PlayMutationSchema, } from "./models/play.js";
export { PlayActionInterpreterAgent, PlayWorldMutatorAgent, PlaySceneRendererAgent, PlaySceneReconcilerAgent, } from "./play/play-agents.js";
export { PlayDB } from "./play/play-db.js";
export { createPlayDB } from "./play/play-db-factory.js";
export { PlayFileDB } from "./play/play-file-db.js";
export { applyPlayMutation, } from "./play/play-reducer.js";
export { PlayRunner, } from "./play/play-runner.js";
export { PlayStore } from "./play/play-store.js";
export { buildPlayEntityImagePrompt, buildPlaySceneImagePrompt, readPlayImageManifest, setPlayImageEntry, playImageFileName, generatePlayImage, readPlayImageSettings, writePlayImageSettings, DEFAULT_PLAY_IMAGE_SETTINGS, } from "./play/play-image.js";
export { ChapterMemoSchema, ChapterIntentSchema, ContextSourceSchema, ContextPackageSchema, RuleLayerScopeSchema, RuleLayerSchema, OverrideEdgeSchema, ActiveOverrideSchema, RuleStackSectionsSchema, RuleStackSchema, ChapterTraceSchema, } from "./models/input-governance.js";
export { AgentSkillSchema, createSkillRegistry, loadAvailableAgentSkills, loadBuiltinAgentSkills, loadConfiguredAgentSkills, loadExternalAgentSkills, parseAgentSkillDocument, PRODUCTION_SKILL_IDS, NON_LONG_PRODUCTION_CAPABILITIES, activatedSkillIds, mergeActivatedSkillGuidance, resolveProductionSkillActivations, } from "./skills/index.js";
export { BUILTIN_PROMPTS, BUILTIN_PROMPT_PACKS, PromptPackManifestSchema, PromptPackPromptNotFoundError, getBuiltinPrompt, listBuiltinPromptPacks, listBuiltinPrompts, loadPromptPackPrompt, promptOverridePath, } from "./prompts/index.js";
export { PlannerAgent } from "./agents/planner.js";
export { ComposerAgent, composeGovernedChapter, } from "./agents/composer.js";
export { bindBookReference, listBookReferences, loadBookReferenceManifest, loadMaterialAsset, unbindBookReference, } from "./references/book-references.js";
export { selectBookReferenceContext, } from "./references/reference-context.js";
export { PLANNER_MEMO_SYSTEM_PROMPT, PLANNER_MEMO_USER_TEMPLATE, buildPlannerUserMessage, buildGoldenOpeningGuidance, } from "./agents/planner-prompts.js";
export { gatherPlanningMaterials, } from "./utils/planning-materials.js";
export { buildProxyFetchInit, fetchWithProxy, resolveProxyUrl, } from "./utils/proxy-fetch.js";
export { assertSafeBookId, deriveBookIdFromTitle, isSafeBookId } from "./utils/book-id.js";
export { safeChildPath } from "./utils/path-safety.js";
export { toPosixPath } from "./utils/posix-path.js";
export { AutomationModeSchema, normalizeAutomationMode, } from "./interaction/modes.js";
export { InteractionIntentTypeSchema, InteractionRequestSchema, } from "./interaction/intents.js";
export { ActionSourceSchema, ActionPayloadSchema, CreateBookActionPayloadSchema, ContinuationImportActionPayloadSchema, FanficCreateActionPayloadSchema, GenerateCoverActionPayloadSchema, ImitationCreateActionPayloadSchema, InteractiveFilmCreateActionPayloadSchema, PlayStartActionPayloadSchema, RequestedIntentSchema, SkillIdSchema, ScriptCreateActionPayloadSchema, ScriptTargetFormatSchema, ShortRunActionPayloadSchema, SpinoffCreateActionPayloadSchema, StoryboardCreateActionPayloadSchema, WriteNextActionPayloadSchema, normalizeActionSource, normalizeActionPayload, normalizeSkillIdList, normalizeRequestedIntent, normalizePlayMode, } from "./interaction/action-envelope.js";
export { ExecutionStatusSchema, ExecutionStateSchema, InteractionEventSchema, isTerminalExecutionStatus, } from "./interaction/events.js";
export { BookCreationDraftSchema, DraftRoundSchema, PendingDecisionSchema, PendingProposedActionSchema, InteractionMessageSchema, InteractionSessionSchema, bindActiveBook, clearCreationDraft, clearPendingDecision, updateAutomationMode, updateCreationDraft, appendInteractionMessage, appendInteractionEvent, BookSessionSchema, SessionKindSchema, PlayModeSchema, GlobalSessionSchema, createBookSession, appendBookSessionMessage, } from "./interaction/session.js";
export { resolveProjectSessionPath, createProjectSession, loadProjectSession, persistProjectSession, resolveSessionActiveBook, loadGlobalSession, persistGlobalSession, } from "./interaction/project-session-store.js";
export { loadBookSession, persistBookSession, listBookSessions, renameBookSession, deleteBookSession, migrateBookSession, createAndPersistBookSession, SessionAlreadyMigratedError, } from "./interaction/book-session-store.js";
export { appendManualSessionMessages, appendTranscriptEvent, sessionsDir, readTranscriptEvents, nextTranscriptSeq, transcriptPath, legacyBookSessionPath, } from "./interaction/session-transcript.js";
export { cleanRestoredAgentMessages, committedMessageEvents, deriveBookSessionFromTranscript, restoreAgentMessagesFromTranscript, } from "./interaction/session-transcript-restore.js";
export { MessageEventSchema, RequestCommittedEventSchema, RequestFailedEventSchema, RequestStartedEventSchema, SessionCreatedEventSchema, SessionMetadataUpdatedEventSchema, TranscriptEventSchema, } from "./interaction/session-transcript-schema.js";
export { routeInteractionRequest } from "./interaction/request-router.js";
export { processProjectInteractionRequest, } from "./interaction/project-control.js";
export { createInteractionToolsFromDeps } from "./interaction/project-tools.js";
export { buildExportArtifact, writeExportArtifact } from "./interaction/export-artifact.js";
export { normalizeTruthFileName, classifyTruthAuthority, } from "./interaction/truth-authority.js";
export { executeEditTransaction, planEditTransaction, } from "./interaction/edit-controller.js";
export { runInteractionRequest, } from "./interaction/runtime.js";
export { parseDraftDirectives, createDirectiveStreamFilter, } from "./interaction/draft-directive-parser.js";
export { SHORT_FICTION_DEFAULT_CHAPTERS, SHORT_FICTION_MIN_CHAPTERS, SHORT_FICTION_MAX_CHAPTERS, SHORT_FICTION_DEFAULT_CHARS_PER_CHAPTER, SHORT_FICTION_MIN_CHARS_PER_CHAPTER, SHORT_FICTION_MAX_CHARS_PER_CHAPTER, SHORT_FICTION_EN_DEFAULT_WORDS_PER_CHAPTER, SHORT_FICTION_EN_MIN_WORDS_PER_CHAPTER, SHORT_FICTION_EN_MAX_WORDS_PER_CHAPTER, ShortFictionOutlineAgent, ShortFictionOutlineReviewerAgent, ShortFictionOutlineReviserAgent, ShortFictionWriterAgent, ShortFictionDraftReviewerAgent, ShortFictionDraftReviserAgent, ShortFictionPackagingAgent, parseShortFictionBatchDraft, validateShortFictionDraftForFinal, renderShortFictionDraftMarkdown, } from "./agents/short-fiction.js";
export { generateShortFictionCover, runShortFictionProduction, extractResponsesImageBase64, resolveCoverApiKey, } from "./pipeline/short-fiction-runner.js";
// Narrative forecast (issue #342): non-canonical multi-branch story projection
export { FORECAST_MIN_BRANCHES, FORECAST_MAX_BRANCHES, FORECAST_DEFAULT_BRANCHES, FORECAST_MIN_HORIZON, FORECAST_MAX_HORIZON, FORECAST_DEFAULT_HORIZON, NarrativeForecastSchema, ForecastBranchSchema, parseForecastModelOutput, } from "./forecast/schema.js";
export { ForecastStore, assertSafeForecastId } from "./forecast/store.js";
export { buildForecastContext, computeContextFingerprint, renderForecastContextMarkdown, } from "./forecast/context-builder.js";
export { NarrativeForecastAgent } from "./forecast/agent.js";
export { renderForecastComparisonMarkdown, renderSelectedBranchPlanMarkdown } from "./forecast/render.js";
export { createNarrativeForecast, getNarrativeForecast, selectNarrativeBranch, } from "./forecast/runner.js";
// Agent (pi-agent integration)
export * from "./agent/index.js";
// LLM
export { createLLMClient, chatCompletion, createStreamMonitor, PartialResponseError } from "./llm/provider.js";
export { SERVICE_PRESETS, SERVICE_TO_PI_PROVIDER, resolveServicePreset, resolveServiceProviderFamily, resolveServicePiProvider, resolveServiceModelsBaseUrl, guessServiceFromBaseUrl, listModelsForService, listServicesWithModelCount, } from "./llm/service-presets.js";
export { resolveServiceModel } from "./llm/service-resolver.js";
export { loadSecrets, saveSecrets, getServiceApiKey } from "./llm/secrets.js";
export { COVER_PROVIDER_PRESETS, coverSecretKey, normalizeCoverBaseUrl, resolveCoverProviderPreset, } from "./llm/cover-providers.js";
export { migrateConfig } from "./llm/config-migration.js";
export { getAllEndpoints, getEndpoint } from "./llm/providers/index.js";
export { probeModelsFromUpstream } from "./llm/providers/probe.js";
// Agents
export { BaseAgent } from "./agents/base.js";
export { ArchitectAgent } from "./agents/architect.js";
export { WriterAgent } from "./agents/writer.js";
export { ContinuityAuditor } from "./agents/continuity.js";
export { ReviserAgent, DEFAULT_REVISE_MODE } from "./agents/reviser.js";
export { PolisherAgent } from "./agents/polisher.js";
export { RadarAgent } from "./agents/radar.js";
export { FanqieRadarSource, QidianRadarSource, TextRadarSource } from "./agents/radar-source.js";
export { readGenreProfile, readBookRules, listAvailableGenres, getBuiltinGenresDir } from "./agents/rules-reader.js";
export { buildWriterSystemPrompt, buildGoldenOpeningDiscipline } from "./agents/writer-prompts.js";
export { analyzeAITells } from "./agents/ai-tells.js";
export { analyzeSensitiveWords } from "./agents/sensitive-words.js";
export { detectAIContent } from "./agents/detector.js";
export { analyzeStyle } from "./agents/style-analyzer.js";
export { analyzeDetectionInsights } from "./agents/detection-insights.js";
export { validatePostWrite, detectParagraphLengthDrift, detectParagraphShapeWarnings, detectDuplicateTitle } from "./agents/post-write-validator.js";
export { ChapterAnalyzerAgent } from "./agents/chapter-analyzer.js";
export { parseWriterOutput, parseCreativeOutput } from "./agents/writer-parser.js";
export { buildSettlerSystemPrompt, buildSettlerUserPrompt } from "./agents/settler-prompts.js";
export { parseSettlementOutput } from "./agents/settler-parser.js";
export { parseSettlerDeltaOutput } from "./agents/settler-delta-parser.js";
export { FanficCanonImporter } from "./agents/fanfic-canon-importer.js";
export { getFanficDimensionConfig, FANFIC_DIMENSIONS } from "./agents/fanfic-dimensions.js";
export { buildFanficCanonSection, buildCharacterVoiceProfiles, buildFanficModeInstructions } from "./agents/fanfic-prompt-sections.js";
export * from "./prompts/index.js";
// Utils
export { isNewLayoutBook, isBookFoundationComplete } from "./utils/outline-paths.js";
export { fetchUrl, searchWeb } from "./utils/web-search.js";
export { runResearchReport, } from "./agents/researcher.js";
export { filterHooks, filterSummaries, filterSubplots, filterEmotionalArcs, filterCharacterMatrix } from "./utils/context-filter.js";
export { extractPOVFromOutline, filterMatrixByPOV, filterHooksByPOV } from "./utils/pov-filter.js";
export { ConsolidatorAgent } from "./agents/consolidator.js";
export { MemoryDB } from "./state/memory-db.js";
export { StateValidatorAgent } from "./agents/state-validator.js";
export { loadRuntimeStateSnapshot, buildRuntimeStateArtifacts, saveRuntimeStateSnapshot, loadNarrativeMemorySeed, loadSnapshotCurrentStateFacts } from "./state/runtime-state-store.js";
export { splitChapters } from "./utils/chapter-splitter.js";
export * from "./translation/index.js";
export { countChapterLength, resolveLengthCountingMode, formatLengthCount, buildLengthSpec, defaultChapterLength, DEFAULT_CHAPTER_LENGTH_ZH, DEFAULT_CHAPTER_LENGTH_EN, isOutsideSoftRange, isOutsideHardRange } from "./utils/length-metrics.js";
export { createLogger, createStderrSink, createJsonLineSink, nullSink } from "./utils/logger.js";
export { inferLanguage } from "./utils/language.js";
export { loadProjectConfig, GLOBAL_CONFIG_DIR, GLOBAL_ENV_PATH, isApiKeyOptionalForEndpoint } from "./utils/config-loader.js";
export { resolveEffectiveLLMConfig } from "./utils/effective-llm-config.js";
export { loadLLMEnvLayers, mergeEnvMaps, studioIgnoredEnv, cliOverlayEnv, legacyEnv } from "./utils/llm-env.js";
export { computeAnalytics } from "./utils/analytics.js";
export { evaluateBookQuality, computeChapterEvalScore, } from "./utils/book-eval.js";
export { collectStaleHookDebt, evaluateHookAdmission, classifyHookDisposition, } from "./utils/hook-governance.js";
export { arbitrateRuntimeStateDeltaHooks } from "./utils/hook-arbiter.js";
export { analyzeHookHealth } from "./utils/hook-health.js";
// Pipeline
export { PipelineRunner } from "./pipeline/runner.js";
export { Scheduler } from "./pipeline/scheduler.js";
export { detectChapter, detectAndRewrite, loadDetectionHistory } from "./pipeline/detection-runner.js";
export { runScriptCreation, runStoryboardCreation, runInteractiveFilmCreation, createStoryboardAssetsManifest } from "./pipeline/script-storyboard-runner.js";
export { ScriptCreationAgent, StoryboardCreationAgent, InteractiveFilmCreationAgent, renderScriptSpec, renderStoryboardSpec, renderInteractiveFilmSpec } from "./agents/script-storyboard.js";
// State
export { BookWriteLockError, StateManager } from "./state/manager.js";
export { syncChapterWordCounts } from "./state/chapter-word-sync.js";
export { deleteLatestChapter } from "./state/chapter-delete.js";
export { archiveChapterVersion, listChapterVersions, readChapterPlanDocument, readChapterUserBrief, readChapterVersion, saveChapterUserBrief, } from "./state/chapter-workspace.js";
export { loadChaptersFromPath, compareChapterSourceNames } from "./agent/chapter-import-source.js";
export { bootstrapStructuredStateFromMarkdown } from "./state/state-bootstrap.js";
export { renderCurrentStateProjection, renderHooksProjection, renderChapterSummariesProjection } from "./state/state-projections.js";
export { applyRuntimeStateDelta } from "./state/state-reducer.js";
export { validateRuntimeState } from "./state/state-validator.js";
// Notify
export { dispatchNotification, dispatchWebhookEvent } from "./notify/dispatcher.js";
export async function sendTelegram(config, message, format) {
    const transport = await import("./notify/telegram.js");
    await transport.sendTelegram(config, message, format);
}
export async function sendFeishu(config, title, text, format) {
    const transport = await import("./notify/feishu.js");
    await transport.sendFeishu(config, title, text, format);
}
export async function sendWechatWork(config, text, format) {
    const transport = await import("./notify/wechat-work.js");
    await transport.sendWechatWork(config, text, format);
}
export async function sendWebhook(config, payload) {
    const transport = await import("./notify/webhook.js");
    await transport.sendWebhook(config, payload);
}
// ── Interactive Film (story graph) ──
export { StoryGraphSchema, StoryNodeSchema, ChoiceSchema, VariableSchema, EndingSchema, ConditionSchema, EffectSchema, } from "./interactive-film/graph-schema.js";
export { evaluateCondition, applyEffects, visibleChoices, initVarState, } from "./interactive-film/evaluator.js";
export { validateStoryGraph, reviewStoryGraph, } from "./interactive-film/validation.js";
export { loadStoryGraph, saveStoryGraph, storyGraphPath, } from "./interactive-film/graph-store.js";
export { generateStoryGraph, } from "./interactive-film/generate.js";
export { WorldAnchorSchema, CharacterSchema, VoiceProfileSchema, } from "./interactive-film/graph-schema.js";
export { StoryGraphDeltaSchema, applyStoryGraphDelta, } from "./interactive-film/delta.js";
export { applyGraphDelta, loadAuthoringState, revertToSnapshot, authoringStatePath, } from "./interactive-film/authoring-store.js";
export { buildWorldAnchorDelta, buildAddVariableDelta, buildDefineEndingDelta, buildRemoveNodeDelta, buildConnectChoiceDelta, buildUpsertCharactersDelta, } from "./interactive-film/authoring-tools.js";
export { writeCharacterFacts, readCharacterVoices } from "./interactive-film/memory-link.js";
export { summarizeStoryGraph, buildFilmAuthoringContext } from "./interactive-film/film-context.js";
export { generateNodeImage, defaultNodeImageDeps, } from "./interactive-film/node-image.js";
export { enumerateRuntimePaths, } from "./interactive-film/paths.js";
export { emotionScore, nodeEmotion, analyzeEmotionalArcs, analyzePathDistribution, } from "./interactive-film/emotion.js";
export { exportInk } from "./interactive-film/export-ink.js";
export { buildPlayableHtml } from "./interactive-film/export-html.js";
export { ingestMaterial } from "./materials/ingest.js";
export { runWorkerAgent } from "./agent/worker-agent.js";
//# sourceMappingURL=index.js.map