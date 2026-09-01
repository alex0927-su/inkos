import type { AgentTool } from "@mariozechner/pi-agent-core";
import type { PipelineRunner } from "../pipeline/runner.js";
import { type PlayGraphDB } from "../play/play-db-factory.js";
import { type PlayOpeningSeedResult, type PlayReplayResult, type PlayStepResult, type PlayVariantRestoreResult } from "../play/play-runner.js";
import type { AgentContext } from "../agents/base.js";
import { type ActionPayload } from "../interaction/action-envelope.js";
import type { ActivatedSkillGuidance } from "./skill-tool.js";
declare const ProposeActionParams: import("@sinclair/typebox").TObject<{
    action: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"create_book">, import("@sinclair/typebox").TLiteral<"short_run">, import("@sinclair/typebox").TLiteral<"play_start">, import("@sinclair/typebox").TLiteral<"generate_cover">, import("@sinclair/typebox").TLiteral<"fanfic_init">, import("@sinclair/typebox").TLiteral<"continuation_import">, import("@sinclair/typebox").TLiteral<"spinoff_create">, import("@sinclair/typebox").TLiteral<"style_imitation">, import("@sinclair/typebox").TLiteral<"script_create">, import("@sinclair/typebox").TLiteral<"storyboard_create">, import("@sinclair/typebox").TLiteral<"interactive_film_create">, import("@sinclair/typebox").TLiteral<"translation_create">, import("@sinclair/typebox").TLiteral<"draft_structure">, import("@sinclair/typebox").TLiteral<"connect_choice">, import("@sinclair/typebox").TLiteral<"remove_node">]>;
    instruction: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    summary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    createBook: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    shortRun: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        direction: import("@sinclair/typebox").TString;
        reference: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        storyId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        chapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        charsPerChapter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        cover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>>;
    playStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        premise: import("@sinclair/typebox").TString;
        worldContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        visualContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        mode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"open">, import("@sinclair/typebox").TLiteral<"guided">]>>;
        initialScene: import("@sinclair/typebox").TString;
        suggestedActions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
            label: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            action: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>]>>>;
    }>>;
    generateCover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        intro: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sellingPoints: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        coverPrompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        outputDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    scriptCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        targetFormat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"vertical_short_drama">, import("@sinclair/typebox").TLiteral<"screenplay">, import("@sinclair/typebox").TLiteral<"audio_drama">, import("@sinclair/typebox").TLiteral<"interactive_script">, import("@sinclair/typebox").TLiteral<"general_script">]>>;
        sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        episodeCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        episodeDuration: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    storyboardCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        visualStyle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        aspectRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        granularity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        maxShots: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    interactiveFilmCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        targetAudience: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        episodeCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        episodeDuration: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        budget: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        referenceMode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    translationCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        filePath: import("@sinclair/typebox").TString;
        sourceLanguage: import("@sinclair/typebox").TString;
        targetLanguage: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        segmentMaxChars: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    fanficCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        mode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"canon">, import("@sinclair/typebox").TLiteral<"au">, import("@sinclair/typebox").TLiteral<"ooc">, import("@sinclair/typebox").TLiteral<"cp">]>>;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    continuationImport: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sourcePath: import("@sinclair/typebox").TString;
        splitPattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        resumeFrom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    spinoffCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        parentBookId: import("@sinclair/typebox").TString;
        direction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    imitationCreate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        referenceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        referencePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        storyIdea: import("@sinclair/typebox").TString;
        sourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
        language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
        targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
}>;
type ProposeActionToolOptions = {
    readonly sameSession?: boolean;
    readonly requestedSkillIds?: () => ReadonlyArray<string>;
    readonly attachmentPaths?: () => ReadonlyArray<string>;
};
export declare function createProposeActionTool(language?: "zh" | "en", options?: ProposeActionToolOptions): AgentTool<typeof ProposeActionParams>;
interface SkillAwareProductionOptions {
    readonly defaultSkills?: ReadonlyArray<ActivatedSkillGuidance>;
    readonly activeSkills?: () => ReadonlyArray<ActivatedSkillGuidance>;
}
export declare function createSubAgentTool(pipeline: PipelineRunner, activeBookId: string | null, projectRoot?: string, options?: {
    readonly actionPayload?: ActionPayload;
    readonly architectCreateOnly?: boolean;
    readonly language?: "zh" | "en";
    readonly activeSkills?: () => ReadonlyArray<ActivatedSkillGuidance>;
    readonly workerSkills?: (agent: string) => ReadonlyArray<ActivatedSkillGuidance>;
}): AgentTool<any>;
declare const ResearchWebParams: import("@sinclair/typebox").TObject<{
    topic: import("@sinclair/typebox").TString;
    purpose: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"worldbuilding">, import("@sinclair/typebox").TLiteral<"era">, import("@sinclair/typebox").TLiteral<"profession">, import("@sinclair/typebox").TLiteral<"market">, import("@sinclair/typebox").TLiteral<"fact-check">, import("@sinclair/typebox").TLiteral<"general">]>;
    depth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"quick">, import("@sinclair/typebox").TLiteral<"standard">, import("@sinclair/typebox").TLiteral<"deep">]>>;
}>;
export declare function createResearchWebTool(projectRoot: string): AgentTool<typeof ResearchWebParams>;
declare const IngestMaterialParams: import("@sinclair/typebox").TObject<{
    sourceKind: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"url">, import("@sinclair/typebox").TLiteral<"file">]>;
    url: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    filePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    filename: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    mimeType: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    purpose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"reference">, import("@sinclair/typebox").TLiteral<"worldbuilding">, import("@sinclair/typebox").TLiteral<"script">, import("@sinclair/typebox").TLiteral<"storyboard">, import("@sinclair/typebox").TLiteral<"research">, import("@sinclair/typebox").TLiteral<"general">]>>;
}>;
export declare function createIngestMaterialTool(projectRoot: string): AgentTool<typeof IngestMaterialParams>;
declare const RetrieveMaterialParams: import("@sinclair/typebox").TObject<{
    query: import("@sinclair/typebox").TString;
    purpose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"reference">, import("@sinclair/typebox").TLiteral<"worldbuilding">, import("@sinclair/typebox").TLiteral<"script">, import("@sinclair/typebox").TLiteral<"storyboard">, import("@sinclair/typebox").TLiteral<"research">, import("@sinclair/typebox").TLiteral<"general">]>>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare function createRetrieveMaterialTool(projectRoot: string): AgentTool<typeof RetrieveMaterialParams>;
declare const ManageBookReferenceParams: import("@sinclair/typebox").TObject<{
    action: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"list">, import("@sinclair/typebox").TLiteral<"bind">, import("@sinclair/typebox").TLiteral<"unbind">]>;
    materialId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    uses: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    note: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createManageBookReferenceTool(projectRoot: string, activeBookId: string): AgentTool<typeof ManageBookReferenceParams>;
declare const ImportChaptersParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TString;
    splitPattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    resumeFrom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    importMode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"continuation">, import("@sinclair/typebox").TLiteral<"series">]>>;
}>;
export declare function createImportChaptersTool(pipeline: PipelineRunner, activeBookId: string | null, projectRoot: string): AgentTool<typeof ImportChaptersParams>;
declare const FanficCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    mode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"canon">, import("@sinclair/typebox").TLiteral<"au">, import("@sinclair/typebox").TLiteral<"ooc">, import("@sinclair/typebox").TLiteral<"cp">]>>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
    targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare function createFanficBookTool(pipeline: PipelineRunner, projectRoot: string, options?: SkillAwareProductionOptions): AgentTool<typeof FanficCreateParams>;
declare const SpinoffCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    parentBookId: import("@sinclair/typebox").TString;
    direction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
    targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare function createSpinoffBookTool(pipeline: PipelineRunner, projectRoot: string, options?: SkillAwareProductionOptions): AgentTool<typeof SpinoffCreateParams>;
declare const ImitationCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    referenceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    referencePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    storyIdea: import("@sinclair/typebox").TString;
    sourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
    targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare function createImitationBookTool(pipeline: PipelineRunner, projectRoot: string, options?: SkillAwareProductionOptions): AgentTool<typeof ImitationCreateParams>;
declare const ContinuationImportParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TString;
    splitPattern: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    resumeFrom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    genre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    platform: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"tomato">, import("@sinclair/typebox").TLiteral<"qidian">, import("@sinclair/typebox").TLiteral<"feilu">, import("@sinclair/typebox").TLiteral<"other">]>>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"zh">, import("@sinclair/typebox").TLiteral<"en">]>>;
    targetChapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    chapterWordCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare function createContinuationImportTool(pipeline: PipelineRunner, activeBookId: string | null, projectRoot: string, options?: SkillAwareProductionOptions): AgentTool<typeof ContinuationImportParams>;
declare const ShortFictionRunParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    direction: import("@sinclair/typebox").TString;
    reference: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    storyId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chapters: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    charsPerChapter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    coverBaseUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverEndpoint: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverModel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverSize: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverApiKeyEnv: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createShortFictionRunTool(pipeline: PipelineRunner, projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
    readonly language?: "zh" | "en";
} & SkillAwareProductionOptions): AgentTool<typeof ShortFictionRunParams>;
declare const TranslationCreateParams: import("@sinclair/typebox").TObject<{
    filePath: import("@sinclair/typebox").TString;
    sourceLanguage: import("@sinclair/typebox").TString;
    targetLanguage: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    segmentMaxChars: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare function createTranslationCreateTool(projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
}): AgentTool<typeof TranslationCreateParams>;
declare const ScriptCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    instruction: import("@sinclair/typebox").TString;
    sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    targetFormat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"vertical_short_drama">, import("@sinclair/typebox").TLiteral<"screenplay">, import("@sinclair/typebox").TLiteral<"audio_drama">, import("@sinclair/typebox").TLiteral<"interactive_script">, import("@sinclair/typebox").TLiteral<"general_script">]>>;
    sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    episodeCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    episodeDuration: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createScriptCreationTool(pipeline: PipelineRunner, projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
    readonly language?: "zh" | "en";
} & SkillAwareProductionOptions): AgentTool<typeof ScriptCreateParams>;
declare const StoryboardCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    instruction: import("@sinclair/typebox").TString;
    sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    visualStyle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    aspectRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    granularity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    maxShots: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createStoryboardCreationTool(pipeline: PipelineRunner, projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
    readonly language?: "zh" | "en";
} & SkillAwareProductionOptions): AgentTool<typeof StoryboardCreateParams>;
declare const InteractiveFilmCreateParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    instruction: import("@sinclair/typebox").TString;
    sourceKind: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourceText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sourcePath: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    requirements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    targetAudience: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    episodeCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    episodeDuration: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    budget: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    referenceMode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    outDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createInteractiveFilmCreationTool(pipeline: PipelineRunner, projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
    readonly language?: "zh" | "en";
} & SkillAwareProductionOptions): AgentTool<typeof InteractiveFilmCreateParams>;
declare const GenerateCoverParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    intro: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sellingPoints: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverPrompt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    outputDir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverBaseUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverEndpoint: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverModel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverSize: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    coverApiKeyEnv: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createGenerateCoverTool(projectRoot: string, options?: {
    readonly actionPayload?: ActionPayload;
}): AgentTool<typeof GenerateCoverParams>;
declare const PlayStartParams: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    premise: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    worldContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    visualContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    mode: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"open">, import("@sinclair/typebox").TLiteral<"guided">]>>;
    initialScene: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    suggestedActions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
        label: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        action: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>]>>>;
}>;
export interface PlayStartToolOptions extends SkillAwareProductionOptions {
    readonly actionPayload?: ActionPayload;
    readonly runnerFactory?: (input: {
        readonly projectRoot: string;
        readonly worldId: string;
        readonly runId: string;
        readonly ctx: AgentContext;
        readonly db: PlayGraphDB;
    }) => {
        seedOpening(input: {
            sceneText: string;
            suggestedActions?: readonly string[];
        }): Promise<PlayOpeningSeedResult | null>;
    };
}
export declare function createPlayStartTool(pipeline: PipelineRunner | null, projectRoot: string, sessionId: string, playMode?: "open" | "guided", options?: PlayStartToolOptions): AgentTool<typeof PlayStartParams>;
declare const PlayStepParams: import("@sinclair/typebox").TObject<{
    input: import("@sinclair/typebox").TString;
}>;
export interface PlayStepToolOptions extends SkillAwareProductionOptions {
    readonly language?: "zh" | "en";
    readonly runnerFactory?: (input: {
        readonly projectRoot: string;
        readonly worldId: string;
        readonly runId: string;
        readonly ctx: AgentContext;
    }) => {
        step(input: string): Promise<PlayStepResult>;
    };
}
declare const PlayReviseParams: import("@sinclair/typebox").TObject<{
    action: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"regenerate_last">, import("@sinclair/typebox").TLiteral<"edit_last_input">, import("@sinclair/typebox").TLiteral<"restore_variant">]>;
    input: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    turn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    variantId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export interface PlayReviseToolOptions extends SkillAwareProductionOptions {
    readonly language?: "zh" | "en";
    readonly runnerFactory?: (input: {
        readonly projectRoot: string;
        readonly worldId: string;
        readonly runId: string;
        readonly ctx: AgentContext;
    }) => {
        regenerateLastTurn(input?: string): Promise<PlayReplayResult>;
        restoreVariant(input: {
            readonly turn: number;
            readonly variantId: string;
        }): Promise<PlayVariantRestoreResult>;
    };
}
declare const PlayEditParams: import("@sinclair/typebox").TObject<{
    worldContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    worldContractReplacements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        from: import("@sinclair/typebox").TString;
        to: import("@sinclair/typebox").TString;
    }>>>;
    worldContractAppend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    visualContract: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    visualContractReplacements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        from: import("@sinclair/typebox").TString;
        to: import("@sinclair/typebox").TString;
    }>>>;
    visualContractAppend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    premise: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    playerPersona: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    entityUpdates: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        label: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"actor">, import("@sinclair/typebox").TLiteral<"location">, import("@sinclair/typebox").TLiteral<"item">, import("@sinclair/typebox").TLiteral<"evidence">, import("@sinclair/typebox").TLiteral<"clue">, import("@sinclair/typebox").TLiteral<"claim">, import("@sinclair/typebox").TLiteral<"proof_chain">, import("@sinclair/typebox").TLiteral<"organization">, import("@sinclair/typebox").TLiteral<"rule">, import("@sinclair/typebox").TLiteral<"scene">, import("@sinclair/typebox").TLiteral<"event">]>>;
        summary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
    note: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createPlayEditTool(projectRoot: string, sessionId: string, language?: "zh" | "en"): AgentTool<typeof PlayEditParams>;
export declare function createPlayStepTool(pipeline: PipelineRunner, projectRoot: string, sessionId: string, options?: PlayStepToolOptions): AgentTool<typeof PlayStepParams>;
export declare function createPlayReviseTool(pipeline: PipelineRunner, projectRoot: string, sessionId: string, options?: PlayReviseToolOptions): AgentTool<typeof PlayReviseParams>;
declare const WriteTruthFileParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fileName: import("@sinclair/typebox").TString;
    content: import("@sinclair/typebox").TString;
}>;
export declare function createWriteTruthFileTool(pipeline: PipelineRunner, projectRoot: string, activeBookId: string | null): AgentTool<typeof WriteTruthFileParams>;
declare const RenameEntityParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    oldValue: import("@sinclair/typebox").TString;
    newValue: import("@sinclair/typebox").TString;
}>;
export declare function createRenameEntityTool(pipeline: PipelineRunner, projectRoot: string, activeBookId: string | null): AgentTool<typeof RenameEntityParams>;
declare const PatchChapterTextParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chapterNumber: import("@sinclair/typebox").TNumber;
    targetText: import("@sinclair/typebox").TString;
    replacementText: import("@sinclair/typebox").TString;
}>;
declare const DeleteLatestChapterParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chapterNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare function createDeleteLatestChapterTool(projectRoot: string, activeBookId: string | null): AgentTool<typeof DeleteLatestChapterParams>;
export declare function createPatchChapterTextTool(pipeline: PipelineRunner, projectRoot: string, activeBookId: string | null): AgentTool<typeof PatchChapterTextParams>;
declare const ReplaceChapterTextParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chapterNumber: import("@sinclair/typebox").TNumber;
    fullText: import("@sinclair/typebox").TString;
}>;
export declare function createReplaceChapterTextTool(pipeline: PipelineRunner, projectRoot: string, activeBookId: string | null): AgentTool<typeof ReplaceChapterTextParams>;
declare const ResyncChapterStateParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chapterNumber: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    allowNewHooks: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export declare function createResyncChapterStateTool(pipeline: PipelineRunner, activeBookId: string | null, options?: SkillAwareProductionOptions & {
    readonly language?: "zh" | "en";
}): AgentTool<typeof ResyncChapterStateParams>;
declare const ReadParams: import("@sinclair/typebox").TObject<{
    path: import("@sinclair/typebox").TString;
}>;
export interface ReadToolOptions {
    readonly allowSystemPaths?: boolean;
    readonly scope?: "books" | "project";
}
export declare function createReadTool(projectRoot: string, options?: ReadToolOptions): AgentTool<typeof ReadParams>;
declare const EditParams: import("@sinclair/typebox").TObject<{
    path: import("@sinclair/typebox").TString;
    old_string: import("@sinclair/typebox").TString;
    new_string: import("@sinclair/typebox").TString;
}>;
export declare function createEditTool(projectRoot: string): AgentTool<typeof EditParams>;
declare const WriteFileParams: import("@sinclair/typebox").TObject<{
    path: import("@sinclair/typebox").TString;
    content: import("@sinclair/typebox").TString;
}>;
export declare function createWriteFileTool(projectRoot: string): AgentTool<typeof WriteFileParams>;
declare const GrepParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TString;
    pattern: import("@sinclair/typebox").TString;
}>;
export declare function createGrepTool(projectRoot: string): AgentTool<typeof GrepParams>;
declare const LsParams: import("@sinclair/typebox").TObject<{
    bookId: import("@sinclair/typebox").TString;
    subdir: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare function createLsTool(projectRoot: string): AgentTool<typeof LsParams>;
export {};
//# sourceMappingURL=agent-tools.d.ts.map