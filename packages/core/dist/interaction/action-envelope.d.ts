import { z } from "zod";
import { type PlayMode } from "./session.js";
export declare const ActionSourceSchema: z.ZodEnum<["free-text", "button", "slash", "quick-action"]>;
export type ActionSource = z.infer<typeof ActionSourceSchema>;
export declare const SkillIdSchema: z.ZodString;
export declare const RequestedIntentSchema: z.ZodEnum<["create_book", "write_next", "short_run", "play_start", "play_step", "generate_cover", "edit_artifact", "fanfic_init", "continuation_import", "spinoff_create", "style_imitation", "script_create", "storyboard_create", "interactive_film_create", "translation_create", "draft_structure", "connect_choice", "remove_node"]>;
export type RequestedIntent = z.infer<typeof RequestedIntentSchema>;
export declare const CreateBookActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
}>;
export declare const WriteNextActionPayloadSchema: z.ZodObject<{
    chapterCount: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    chapterCount: number;
}, {
    chapterCount?: number | undefined;
}>;
export declare function shortRunCharsPerChapterRange(language: "zh" | "en"): {
    readonly min: number;
    readonly max: number;
};
export declare function shortRunCharsPerChapterError(value: number, language: "zh" | "en"): string;
export declare const ShortRunActionPayloadSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    direction: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    storyId: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    chapters: z.ZodOptional<z.ZodNumber>;
    charsPerChapter: z.ZodOptional<z.ZodNumber>;
    cover: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    language?: "zh" | "en" | undefined;
    cover?: boolean | undefined;
    charsPerChapter?: number | undefined;
    chapters?: number | undefined;
    reference?: string | undefined;
    direction?: string | undefined;
    storyId?: string | undefined;
}, {
    title?: string | undefined;
    language?: "zh" | "en" | undefined;
    cover?: boolean | undefined;
    charsPerChapter?: number | undefined;
    chapters?: number | undefined;
    reference?: string | undefined;
    direction?: string | undefined;
    storyId?: string | undefined;
}>, {
    title?: string | undefined;
    language?: "zh" | "en" | undefined;
    cover?: boolean | undefined;
    charsPerChapter?: number | undefined;
    chapters?: number | undefined;
    reference?: string | undefined;
    direction?: string | undefined;
    storyId?: string | undefined;
}, {
    title?: string | undefined;
    language?: "zh" | "en" | undefined;
    cover?: boolean | undefined;
    charsPerChapter?: number | undefined;
    chapters?: number | undefined;
    reference?: string | undefined;
    direction?: string | undefined;
    storyId?: string | undefined;
}>;
export declare const PlayStartActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    premise: z.ZodOptional<z.ZodString>;
    worldContract: z.ZodOptional<z.ZodString>;
    visualContract: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
    initialScene: z.ZodOptional<z.ZodString>;
    suggestedActions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    mode?: "open" | "guided" | undefined;
    suggestedActions?: string[] | undefined;
    premise?: string | undefined;
    worldContract?: string | undefined;
    visualContract?: string | undefined;
    initialScene?: string | undefined;
}, {
    title?: string | undefined;
    mode?: "open" | "guided" | undefined;
    suggestedActions?: string[] | undefined;
    premise?: string | undefined;
    worldContract?: string | undefined;
    visualContract?: string | undefined;
    initialScene?: string | undefined;
}>;
export declare const GenerateCoverActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    intro: z.ZodOptional<z.ZodString>;
    sellingPoints: z.ZodOptional<z.ZodString>;
    coverPrompt: z.ZodOptional<z.ZodString>;
    outputDir: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    outputDir?: string | undefined;
    intro?: string | undefined;
    sellingPoints?: string | undefined;
    coverPrompt?: string | undefined;
}, {
    title?: string | undefined;
    outputDir?: string | undefined;
    intro?: string | undefined;
    sellingPoints?: string | undefined;
    coverPrompt?: string | undefined;
}>;
export declare const ScriptTargetFormatSchema: z.ZodEnum<["vertical_short_drama", "screenplay", "audio_drama", "interactive_script", "general_script"]>;
export declare const ScriptCreateActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    sourceKind: z.ZodOptional<z.ZodString>;
    targetFormat: z.ZodOptional<z.ZodEnum<["vertical_short_drama", "screenplay", "audio_drama", "interactive_script", "general_script"]>>;
    sourceText: z.ZodOptional<z.ZodString>;
    sourcePath: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
    episodeCount: z.ZodOptional<z.ZodNumber>;
    episodeDuration: z.ZodOptional<z.ZodString>;
    projectId: z.ZodOptional<z.ZodString>;
    outDir: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    episodeCount?: number | undefined;
    episodeDuration?: string | undefined;
    outDir?: string | undefined;
}, {
    title?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    episodeCount?: number | undefined;
    episodeDuration?: string | undefined;
    outDir?: string | undefined;
}>;
export declare const StoryboardCreateActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    sourceKind: z.ZodOptional<z.ZodString>;
    sourceText: z.ZodOptional<z.ZodString>;
    sourcePath: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
    visualStyle: z.ZodOptional<z.ZodString>;
    aspectRatio: z.ZodOptional<z.ZodString>;
    granularity: z.ZodOptional<z.ZodString>;
    maxShots: z.ZodOptional<z.ZodNumber>;
    projectId: z.ZodOptional<z.ZodString>;
    outDir: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    granularity?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    outDir?: string | undefined;
    visualStyle?: string | undefined;
    aspectRatio?: string | undefined;
    maxShots?: number | undefined;
}, {
    title?: string | undefined;
    granularity?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    outDir?: string | undefined;
    visualStyle?: string | undefined;
    aspectRatio?: string | undefined;
    maxShots?: number | undefined;
}>;
export declare const InteractiveFilmCreateActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    sourceKind: z.ZodOptional<z.ZodString>;
    sourceText: z.ZodOptional<z.ZodString>;
    sourcePath: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
    targetAudience: z.ZodOptional<z.ZodString>;
    episodeCount: z.ZodOptional<z.ZodNumber>;
    episodeDuration: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodString>;
    referenceMode: z.ZodOptional<z.ZodString>;
    projectId: z.ZodOptional<z.ZodString>;
    outDir: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    episodeCount?: number | undefined;
    episodeDuration?: string | undefined;
    outDir?: string | undefined;
    targetAudience?: string | undefined;
    budget?: string | undefined;
    referenceMode?: string | undefined;
}, {
    title?: string | undefined;
    projectId?: string | undefined;
    sourceKind?: string | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    requirements?: string | undefined;
    episodeCount?: number | undefined;
    episodeDuration?: string | undefined;
    outDir?: string | undefined;
    targetAudience?: string | undefined;
    budget?: string | undefined;
    referenceMode?: string | undefined;
}>;
export declare const TranslationCreateActionPayloadSchema: z.ZodObject<{
    filePath: z.ZodOptional<z.ZodString>;
    sourceLanguage: z.ZodOptional<z.ZodString>;
    targetLanguage: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    segmentMaxChars: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    filePath?: string | undefined;
    sourceLanguage?: string | undefined;
    targetLanguage?: string | undefined;
    segmentMaxChars?: number | undefined;
}, {
    title?: string | undefined;
    filePath?: string | undefined;
    sourceLanguage?: string | undefined;
    targetLanguage?: string | undefined;
    segmentMaxChars?: number | undefined;
}>;
export declare const FanficCreateActionPayloadSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    sourceText: z.ZodOptional<z.ZodString>;
    sourcePath: z.ZodOptional<z.ZodString>;
    sourceName: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<["canon", "au", "ooc", "cp"]>>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    mode?: "canon" | "au" | "ooc" | "cp" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    sourceName?: string | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    mode?: "canon" | "au" | "ooc" | "cp" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    sourceName?: string | undefined;
}>, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    mode?: "canon" | "au" | "ooc" | "cp" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    sourceName?: string | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    mode?: "canon" | "au" | "ooc" | "cp" | undefined;
    sourceText?: string | undefined;
    sourcePath?: string | undefined;
    sourceName?: string | undefined;
}>;
export declare const ContinuationImportActionPayloadSchema: z.ZodObject<{
    bookId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    sourcePath: z.ZodOptional<z.ZodString>;
    splitPattern: z.ZodOptional<z.ZodString>;
    resumeFrom: z.ZodOptional<z.ZodNumber>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    bookId?: string | undefined;
    sourcePath?: string | undefined;
    splitPattern?: string | undefined;
    resumeFrom?: number | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    bookId?: string | undefined;
    sourcePath?: string | undefined;
    splitPattern?: string | undefined;
    resumeFrom?: number | undefined;
}>;
export declare const SpinoffCreateActionPayloadSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    parentBookId: z.ZodOptional<z.ZodString>;
    direction: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    parentBookId?: string | undefined;
    direction?: string | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    parentBookId?: string | undefined;
    direction?: string | undefined;
}>;
export declare const ImitationCreateActionPayloadSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    referenceText: z.ZodOptional<z.ZodString>;
    referencePath: z.ZodOptional<z.ZodString>;
    storyIdea: z.ZodOptional<z.ZodString>;
    sourceName: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
    language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
    targetChapters: z.ZodOptional<z.ZodNumber>;
    chapterWordCount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    sourceName?: string | undefined;
    referenceText?: string | undefined;
    referencePath?: string | undefined;
    storyIdea?: string | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    sourceName?: string | undefined;
    referenceText?: string | undefined;
    referencePath?: string | undefined;
    storyIdea?: string | undefined;
}>, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    sourceName?: string | undefined;
    referenceText?: string | undefined;
    referencePath?: string | undefined;
    storyIdea?: string | undefined;
}, {
    title?: string | undefined;
    platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
    genre?: string | undefined;
    targetChapters?: number | undefined;
    chapterWordCount?: number | undefined;
    language?: "zh" | "en" | undefined;
    sourceName?: string | undefined;
    referenceText?: string | undefined;
    referencePath?: string | undefined;
    storyIdea?: string | undefined;
}>;
export declare const ActionPayloadSchema: z.ZodObject<{
    createBook: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
    }>>;
    writeNext: z.ZodOptional<z.ZodObject<{
        chapterCount: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        chapterCount: number;
    }, {
        chapterCount?: number | undefined;
    }>>;
    shortRun: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        direction: z.ZodOptional<z.ZodString>;
        reference: z.ZodOptional<z.ZodString>;
        storyId: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        chapters: z.ZodOptional<z.ZodNumber>;
        charsPerChapter: z.ZodOptional<z.ZodNumber>;
        cover: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    }, {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    }>, {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    }, {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    }>>;
    playStart: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        premise: z.ZodOptional<z.ZodString>;
        worldContract: z.ZodOptional<z.ZodString>;
        visualContract: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<["open", "guided"]>>;
        initialScene: z.ZodOptional<z.ZodString>;
        suggestedActions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        mode?: "open" | "guided" | undefined;
        suggestedActions?: string[] | undefined;
        premise?: string | undefined;
        worldContract?: string | undefined;
        visualContract?: string | undefined;
        initialScene?: string | undefined;
    }, {
        title?: string | undefined;
        mode?: "open" | "guided" | undefined;
        suggestedActions?: string[] | undefined;
        premise?: string | undefined;
        worldContract?: string | undefined;
        visualContract?: string | undefined;
        initialScene?: string | undefined;
    }>>;
    generateCover: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        intro: z.ZodOptional<z.ZodString>;
        sellingPoints: z.ZodOptional<z.ZodString>;
        coverPrompt: z.ZodOptional<z.ZodString>;
        outputDir: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        outputDir?: string | undefined;
        intro?: string | undefined;
        sellingPoints?: string | undefined;
        coverPrompt?: string | undefined;
    }, {
        title?: string | undefined;
        outputDir?: string | undefined;
        intro?: string | undefined;
        sellingPoints?: string | undefined;
        coverPrompt?: string | undefined;
    }>>;
    scriptCreate: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        sourceKind: z.ZodOptional<z.ZodString>;
        targetFormat: z.ZodOptional<z.ZodEnum<["vertical_short_drama", "screenplay", "audio_drama", "interactive_script", "general_script"]>>;
        sourceText: z.ZodOptional<z.ZodString>;
        sourcePath: z.ZodOptional<z.ZodString>;
        requirements: z.ZodOptional<z.ZodString>;
        episodeCount: z.ZodOptional<z.ZodNumber>;
        episodeDuration: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        outDir: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
    }, {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
    }>>;
    storyboardCreate: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        sourceKind: z.ZodOptional<z.ZodString>;
        sourceText: z.ZodOptional<z.ZodString>;
        sourcePath: z.ZodOptional<z.ZodString>;
        requirements: z.ZodOptional<z.ZodString>;
        visualStyle: z.ZodOptional<z.ZodString>;
        aspectRatio: z.ZodOptional<z.ZodString>;
        granularity: z.ZodOptional<z.ZodString>;
        maxShots: z.ZodOptional<z.ZodNumber>;
        projectId: z.ZodOptional<z.ZodString>;
        outDir: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        granularity?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        outDir?: string | undefined;
        visualStyle?: string | undefined;
        aspectRatio?: string | undefined;
        maxShots?: number | undefined;
    }, {
        title?: string | undefined;
        granularity?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        outDir?: string | undefined;
        visualStyle?: string | undefined;
        aspectRatio?: string | undefined;
        maxShots?: number | undefined;
    }>>;
    interactiveFilmCreate: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        sourceKind: z.ZodOptional<z.ZodString>;
        sourceText: z.ZodOptional<z.ZodString>;
        sourcePath: z.ZodOptional<z.ZodString>;
        requirements: z.ZodOptional<z.ZodString>;
        targetAudience: z.ZodOptional<z.ZodString>;
        episodeCount: z.ZodOptional<z.ZodNumber>;
        episodeDuration: z.ZodOptional<z.ZodString>;
        budget: z.ZodOptional<z.ZodString>;
        referenceMode: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        outDir: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
        targetAudience?: string | undefined;
        budget?: string | undefined;
        referenceMode?: string | undefined;
    }, {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
        targetAudience?: string | undefined;
        budget?: string | undefined;
        referenceMode?: string | undefined;
    }>>;
    translationCreate: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        sourceLanguage: z.ZodOptional<z.ZodString>;
        targetLanguage: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        segmentMaxChars: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        filePath?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        segmentMaxChars?: number | undefined;
    }, {
        title?: string | undefined;
        filePath?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        segmentMaxChars?: number | undefined;
    }>>;
    fanficCreate: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        sourceText: z.ZodOptional<z.ZodString>;
        sourcePath: z.ZodOptional<z.ZodString>;
        sourceName: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<["canon", "au", "ooc", "cp"]>>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    }>, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    }>>;
    continuationImport: z.ZodOptional<z.ZodObject<{
        bookId: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        sourcePath: z.ZodOptional<z.ZodString>;
        splitPattern: z.ZodOptional<z.ZodString>;
        resumeFrom: z.ZodOptional<z.ZodNumber>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        bookId?: string | undefined;
        sourcePath?: string | undefined;
        splitPattern?: string | undefined;
        resumeFrom?: number | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        bookId?: string | undefined;
        sourcePath?: string | undefined;
        splitPattern?: string | undefined;
        resumeFrom?: number | undefined;
    }>>;
    spinoffCreate: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        parentBookId: z.ZodOptional<z.ZodString>;
        direction: z.ZodOptional<z.ZodString>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        parentBookId?: string | undefined;
        direction?: string | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        parentBookId?: string | undefined;
        direction?: string | undefined;
    }>>;
    imitationCreate: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        referenceText: z.ZodOptional<z.ZodString>;
        referencePath: z.ZodOptional<z.ZodString>;
        storyIdea: z.ZodOptional<z.ZodString>;
        sourceName: z.ZodOptional<z.ZodString>;
        genre: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["tomato", "qidian", "feilu", "other"]>>;
        language: z.ZodOptional<z.ZodEnum<["zh", "en"]>>;
        targetChapters: z.ZodOptional<z.ZodNumber>;
        chapterWordCount: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    }>, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    }, {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    }>>;
    draftStructure: z.ZodOptional<z.ZodObject<{
        projectId: z.ZodOptional<z.ZodString>;
        instruction: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        instruction: string;
        projectId?: string | undefined;
    }, {
        instruction?: string | undefined;
        projectId?: string | undefined;
    }>>;
    connectChoice: z.ZodOptional<z.ZodObject<{
        projectId: z.ZodOptional<z.ZodString>;
        node: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodDefault<z.ZodString>;
            type: z.ZodEnum<["start", "normal", "branch", "merge", "ending", "explore"]>;
            sceneDesc: z.ZodDefault<z.ZodString>;
            dialogue: z.ZodDefault<z.ZodArray<z.ZodObject<{
                speaker: z.ZodString;
                text: z.ZodString;
                emotion: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                speaker: string;
                emotion: string;
            }, {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }>, "many">>;
            choices: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                text: z.ZodString;
                targetNodeId: z.ZodString;
                condition: z.ZodOptional<z.ZodObject<{
                    var: z.ZodString;
                    op: z.ZodEnum<[">=", "<=", ">", "<", "==", "!="]>;
                    value: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                }, {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                }>>;
                effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    var: z.ZodString;
                    op: z.ZodEnum<["set", "add", "sub"]>;
                    value: z.ZodUnion<[z.ZodNumber, z.ZodString, z.ZodBoolean]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }, {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }>, "many">>;
                weight: z.ZodOptional<z.ZodEnum<["light", "heavy", "critical"]>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }, {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }>, "many">>;
            imageSlot: z.ZodOptional<z.ZodObject<{
                prompt: z.ZodDefault<z.ZodString>;
                assetRef: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                prompt: string;
                assetRef?: string | undefined;
            }, {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            }>>;
            act: z.ZodDefault<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }, {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        node: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        };
        projectId?: string | undefined;
    }, {
        node: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        };
        projectId?: string | undefined;
    }>>;
    removeNode: z.ZodOptional<z.ZodObject<{
        projectId: z.ZodOptional<z.ZodString>;
        nodeId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        nodeId: string;
        projectId?: string | undefined;
    }, {
        nodeId: string;
        projectId?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    createBook?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
    } | undefined;
    writeNext?: {
        chapterCount: number;
    } | undefined;
    shortRun?: {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    } | undefined;
    playStart?: {
        title?: string | undefined;
        mode?: "open" | "guided" | undefined;
        suggestedActions?: string[] | undefined;
        premise?: string | undefined;
        worldContract?: string | undefined;
        visualContract?: string | undefined;
        initialScene?: string | undefined;
    } | undefined;
    generateCover?: {
        title?: string | undefined;
        outputDir?: string | undefined;
        intro?: string | undefined;
        sellingPoints?: string | undefined;
        coverPrompt?: string | undefined;
    } | undefined;
    scriptCreate?: {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
    } | undefined;
    storyboardCreate?: {
        title?: string | undefined;
        granularity?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        outDir?: string | undefined;
        visualStyle?: string | undefined;
        aspectRatio?: string | undefined;
        maxShots?: number | undefined;
    } | undefined;
    interactiveFilmCreate?: {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
        targetAudience?: string | undefined;
        budget?: string | undefined;
        referenceMode?: string | undefined;
    } | undefined;
    translationCreate?: {
        title?: string | undefined;
        filePath?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        segmentMaxChars?: number | undefined;
    } | undefined;
    fanficCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    } | undefined;
    continuationImport?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        bookId?: string | undefined;
        sourcePath?: string | undefined;
        splitPattern?: string | undefined;
        resumeFrom?: number | undefined;
    } | undefined;
    spinoffCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        parentBookId?: string | undefined;
        direction?: string | undefined;
    } | undefined;
    imitationCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    } | undefined;
    draftStructure?: {
        instruction: string;
        projectId?: string | undefined;
    } | undefined;
    connectChoice?: {
        node: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title: string;
            sceneDesc: string;
            dialogue: {
                text: string;
                speaker: string;
                emotion: string;
            }[];
            choices: {
                id: string;
                text: string;
                targetNodeId: string;
                effects: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[];
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[];
            act: string;
            imageSlot?: {
                prompt: string;
                assetRef?: string | undefined;
            } | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        };
        projectId?: string | undefined;
    } | undefined;
    removeNode?: {
        nodeId: string;
        projectId?: string | undefined;
    } | undefined;
}, {
    createBook?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
    } | undefined;
    writeNext?: {
        chapterCount?: number | undefined;
    } | undefined;
    shortRun?: {
        title?: string | undefined;
        language?: "zh" | "en" | undefined;
        cover?: boolean | undefined;
        charsPerChapter?: number | undefined;
        chapters?: number | undefined;
        reference?: string | undefined;
        direction?: string | undefined;
        storyId?: string | undefined;
    } | undefined;
    playStart?: {
        title?: string | undefined;
        mode?: "open" | "guided" | undefined;
        suggestedActions?: string[] | undefined;
        premise?: string | undefined;
        worldContract?: string | undefined;
        visualContract?: string | undefined;
        initialScene?: string | undefined;
    } | undefined;
    generateCover?: {
        title?: string | undefined;
        outputDir?: string | undefined;
        intro?: string | undefined;
        sellingPoints?: string | undefined;
        coverPrompt?: string | undefined;
    } | undefined;
    scriptCreate?: {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        targetFormat?: "vertical_short_drama" | "screenplay" | "audio_drama" | "interactive_script" | "general_script" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
    } | undefined;
    storyboardCreate?: {
        title?: string | undefined;
        granularity?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        outDir?: string | undefined;
        visualStyle?: string | undefined;
        aspectRatio?: string | undefined;
        maxShots?: number | undefined;
    } | undefined;
    interactiveFilmCreate?: {
        title?: string | undefined;
        projectId?: string | undefined;
        sourceKind?: string | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        requirements?: string | undefined;
        episodeCount?: number | undefined;
        episodeDuration?: string | undefined;
        outDir?: string | undefined;
        targetAudience?: string | undefined;
        budget?: string | undefined;
        referenceMode?: string | undefined;
    } | undefined;
    translationCreate?: {
        title?: string | undefined;
        filePath?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        segmentMaxChars?: number | undefined;
    } | undefined;
    fanficCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        mode?: "canon" | "au" | "ooc" | "cp" | undefined;
        sourceText?: string | undefined;
        sourcePath?: string | undefined;
        sourceName?: string | undefined;
    } | undefined;
    continuationImport?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        bookId?: string | undefined;
        sourcePath?: string | undefined;
        splitPattern?: string | undefined;
        resumeFrom?: number | undefined;
    } | undefined;
    spinoffCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        parentBookId?: string | undefined;
        direction?: string | undefined;
    } | undefined;
    imitationCreate?: {
        title?: string | undefined;
        platform?: "tomato" | "feilu" | "qidian" | "other" | undefined;
        genre?: string | undefined;
        targetChapters?: number | undefined;
        chapterWordCount?: number | undefined;
        language?: "zh" | "en" | undefined;
        sourceName?: string | undefined;
        referenceText?: string | undefined;
        referencePath?: string | undefined;
        storyIdea?: string | undefined;
    } | undefined;
    draftStructure?: {
        instruction?: string | undefined;
        projectId?: string | undefined;
    } | undefined;
    connectChoice?: {
        node: {
            type: "start" | "branch" | "ending" | "normal" | "merge" | "explore";
            id: string;
            title?: string | undefined;
            sceneDesc?: string | undefined;
            dialogue?: {
                text: string;
                speaker: string;
                emotion?: string | undefined;
            }[] | undefined;
            choices?: {
                id: string;
                text: string;
                targetNodeId: string;
                condition?: {
                    value: string | number | boolean;
                    var: string;
                    op: "<" | ">" | ">=" | "<=" | "==" | "!=";
                } | undefined;
                effects?: {
                    value: string | number | boolean;
                    var: string;
                    op: "set" | "sub" | "add";
                }[] | undefined;
                weight?: "light" | "heavy" | "critical" | undefined;
            }[] | undefined;
            imageSlot?: {
                prompt?: string | undefined;
                assetRef?: string | undefined;
            } | undefined;
            act?: string | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
        };
        projectId?: string | undefined;
    } | undefined;
    removeNode?: {
        nodeId: string;
        projectId?: string | undefined;
    } | undefined;
}>;
export type ActionPayload = z.infer<typeof ActionPayloadSchema>;
export declare function normalizeSkillIdList(value: unknown): string[];
export declare function normalizeActionSource(value: unknown): ActionSource;
export declare function normalizeRequestedIntent(value: unknown): RequestedIntent | undefined;
export declare function normalizeActionPayload(value: unknown): ActionPayload | undefined;
export declare function normalizePlayMode(value: unknown): PlayMode | undefined;
//# sourceMappingURL=action-envelope.d.ts.map