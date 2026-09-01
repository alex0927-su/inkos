import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ChapterSummariesStateSchema, CurrentStateStateSchema, HooksStateSchema, StateManifestSchema, } from "../models/runtime-state.js";
import { resolveHookStatusAlias } from "../utils/hook-lifecycle.js";
import { inferFactSubject, isCurrentChapterLabel, isStateTableHeaderRow, normalizeHookId, parseChapterSummariesMarkdown, parseMarkdownTableRows, parsePendingHooksMarkdown, } from "../utils/story-markdown.js";
export { normalizeHookId, parseChapterSummariesMarkdown, parseCurrentStateFacts, parsePendingHooksMarkdown, } from "../utils/story-markdown.js";
export async function bootstrapStructuredStateFromMarkdown(params) {
    const storyDir = join(params.bookDir, "story");
    const stateDir = join(storyDir, "state");
    const manifestPath = join(stateDir, "manifest.json");
    const currentStatePath = join(stateDir, "current_state.json");
    const hooksPath = join(stateDir, "hooks.json");
    const summariesPath = join(stateDir, "chapter_summaries.json");
    await mkdir(stateDir, { recursive: true });
    const createdFiles = [];
    const warnings = [];
    const existingManifest = await loadJsonIfValid(manifestPath, StateManifestSchema, warnings, "manifest.json");
    const language = existingManifest?.language ?? await resolveRuntimeLanguage(params.bookDir);
    const markdownState = await loadMarkdownBootstrapState({
        bookDir: params.bookDir,
        storyDir,
        fallbackChapter: params.fallbackChapter ?? 0,
        warnings,
    });
    const summariesState = await loadOrBootstrapSummaries({
        storyDir,
        statePath: summariesPath,
        createdFiles,
        warnings,
        bootstrapState: markdownState.summariesState,
    });
    const hooksState = await loadOrBootstrapHooks({
        storyDir,
        statePath: hooksPath,
        createdFiles,
        warnings,
        bootstrapState: markdownState.hooksState,
    });
    const currentState = await loadOrBootstrapCurrentState({
        storyDir,
        statePath: currentStatePath,
        fallbackChapter: markdownState.durableStoryProgress,
        createdFiles,
        warnings,
        bootstrapState: markdownState.currentState,
    });
    // Only trust durable artifact progress (chapter files + index).
    // currentState.chapter comes from markdown which can contain
    // hallucinated numbers (e.g. year 1988 parsed as chapter 1988).
    const derivedProgress = markdownState.durableStoryProgress;
    if ((existingManifest?.lastAppliedChapter ?? 0) > derivedProgress) {
        appendWarning(warnings, `manifest lastAppliedChapter normalized from ${existingManifest?.lastAppliedChapter ?? 0} to ${derivedProgress}`);
    }
    const manifest = StateManifestSchema.parse({
        schemaVersion: 2,
        language,
        lastAppliedChapter: derivedProgress,
        projectionVersion: existingManifest?.projectionVersion ?? 1,
        migrationWarnings: uniqueStrings([
            ...(existingManifest?.migrationWarnings ?? []),
            ...warnings,
        ]),
    });
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
    if (!existingManifest) {
        createdFiles.push("manifest.json");
    }
    return {
        createdFiles,
        warnings: manifest.migrationWarnings,
        manifest,
    };
}
export async function rewriteStructuredStateFromMarkdown(params) {
    const storyDir = join(params.bookDir, "story");
    const stateDir = join(storyDir, "state");
    const manifestPath = join(stateDir, "manifest.json");
    const currentStatePath = join(stateDir, "current_state.json");
    const hooksPath = join(stateDir, "hooks.json");
    const summariesPath = join(stateDir, "chapter_summaries.json");
    await mkdir(stateDir, { recursive: true });
    const warnings = [];
    const existingManifest = await loadJsonIfValid(manifestPath, StateManifestSchema, warnings, "manifest.json");
    const language = existingManifest?.language ?? await resolveRuntimeLanguage(params.bookDir);
    const markdownState = await loadMarkdownBootstrapState({
        bookDir: params.bookDir,
        storyDir,
        fallbackChapter: params.fallbackChapter ?? 0,
        warnings,
    });
    const summariesState = markdownState.summariesState;
    const hooksState = markdownState.hooksState;
    const currentState = markdownState.currentState;
    const manifest = StateManifestSchema.parse({
        schemaVersion: 2,
        language,
        lastAppliedChapter: markdownState.durableStoryProgress,
        projectionVersion: existingManifest?.projectionVersion ?? 1,
        migrationWarnings: uniqueStrings([
            ...(existingManifest?.migrationWarnings ?? []),
            ...warnings,
        ]),
    });
    await Promise.all([
        writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8"),
        writeFile(currentStatePath, JSON.stringify(currentState, null, 2), "utf-8"),
        writeFile(hooksPath, JSON.stringify(hooksState, null, 2), "utf-8"),
        writeFile(summariesPath, JSON.stringify(summariesState, null, 2), "utf-8"),
    ]);
    return {
        createdFiles: [],
        warnings: manifest.migrationWarnings,
        manifest,
    };
}
async function loadOrBootstrapCurrentState(params) {
    if (!params.forceBootstrapFromMarkdown) {
        const existing = await loadJsonIfValid(params.statePath, CurrentStateStateSchema, params.warnings, "current_state.json");
        if (existing) {
            return existing;
        }
    }
    const currentState = params.bootstrapState ?? await loadMarkdownCurrentState({
        storyDir: params.storyDir,
        fallbackChapter: params.fallbackChapter,
        warnings: params.warnings,
    });
    const existed = await pathExists(params.statePath);
    await writeFile(params.statePath, JSON.stringify(currentState, null, 2), "utf-8");
    if (!existed) {
        params.createdFiles.push("current_state.json");
    }
    return currentState;
}
async function loadOrBootstrapHooks(params) {
    if (!params.forceBootstrapFromMarkdown) {
        const existing = await loadHooksStateIfValid(params.statePath, params.warnings, "hooks.json");
        if (existing) {
            if (existing.repaired) {
                await writeFile(params.statePath, JSON.stringify(existing.state, null, 2), "utf-8");
            }
            return existing.state;
        }
    }
    const hooksState = params.bootstrapState ?? await loadMarkdownHooksState({
        storyDir: params.storyDir,
        warnings: params.warnings,
    });
    const existed = await pathExists(params.statePath);
    await writeFile(params.statePath, JSON.stringify(hooksState, null, 2), "utf-8");
    if (!existed) {
        params.createdFiles.push("hooks.json");
    }
    return hooksState;
}
async function loadOrBootstrapSummaries(params) {
    if (!params.forceBootstrapFromMarkdown) {
        const existing = await loadJsonIfValid(params.statePath, ChapterSummariesStateSchema, params.warnings, "chapter_summaries.json");
        if (existing) {
            // Always deduplicate even when loading from JSON (stale data may have duplicates)
            const dedupedExisting = deduplicateSummaryRows(existing.rows);
            if (dedupedExisting.length < existing.rows.length) {
                const repaired = ChapterSummariesStateSchema.parse({ rows: dedupedExisting });
                await writeFile(params.statePath, JSON.stringify(repaired, null, 2), "utf-8");
                return repaired;
            }
            return existing;
        }
    }
    const summariesState = params.bootstrapState ?? await loadMarkdownSummariesState(params.storyDir);
    const existed = await pathExists(params.statePath);
    await writeFile(params.statePath, JSON.stringify(summariesState, null, 2), "utf-8");
    if (!existed) {
        params.createdFiles.push("chapter_summaries.json");
    }
    return summariesState;
}
function parsePendingHooksStateMarkdown(markdown, warnings) {
    const parsedHooks = parsePendingHooksMarkdown(markdown);
    if (parsedHooks.length > 0) {
        return HooksStateSchema.parse({
            hooks: parsedHooks.map((hook) => ({
                ...hook,
                type: normalizeHookType(hook.type, warnings, hook.hookId),
                status: normalizeHookStatus(hook.status, warnings, hook.hookId),
            })),
        });
    }
    return HooksStateSchema.parse({
        hooks: markdown
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.startsWith("-"))
            .map((line) => line.replace(/^-\s*/, ""))
            .filter(Boolean)
            .map((line, index) => ({
            hookId: `hook-${index + 1}`,
            startChapter: 0,
            type: "unspecified",
            status: "open",
            lastAdvancedChapter: 0,
            expectedPayoff: "",
            payoffTiming: undefined,
            notes: line,
        })),
    });
}
function parseCurrentStateStateMarkdown(markdown, fallbackChapter, warnings) {
    const tableRows = parseMarkdownTableRows(markdown);
    const fieldValueRows = tableRows
        .filter((row) => row.length >= 2)
        .filter((row) => !isStateTableHeaderRow(row));
    if (fieldValueRows.length > 0) {
        const chapterFromTable = fieldValueRows.find((row) => isCurrentChapterLabel(row[0] ?? ""));
        const stateChapter = parseIntegerWithFallback(chapterFromTable?.[1], fallbackChapter, warnings, "current_state:chapter");
        return CurrentStateStateSchema.parse({
            chapter: stateChapter,
            facts: fieldValueRows
                .filter((row) => !isCurrentChapterLabel(row[0] ?? ""))
                .flatMap((row) => {
                const label = (row[0] ?? "").trim();
                const value = (row[1] ?? "").trim();
                if (!label || !value)
                    return [];
                return [{
                        subject: inferFactSubject(label),
                        predicate: label,
                        object: value,
                        validFromChapter: stateChapter,
                        validUntilChapter: null,
                        sourceChapter: stateChapter,
                    }];
            }),
        });
    }
    const bulletFacts = markdown
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("-"))
        .map((line) => line.replace(/^-\s*/, ""))
        .filter(Boolean);
    return CurrentStateStateSchema.parse({
        chapter: Math.max(0, fallbackChapter),
        facts: bulletFacts.map((line, index) => ({
            subject: "current_state",
            predicate: `note_${index + 1}`,
            object: line,
            validFromChapter: Math.max(0, fallbackChapter),
            validUntilChapter: null,
            sourceChapter: Math.max(0, fallbackChapter),
        })),
    });
}
async function resolveRuntimeLanguage(bookDir) {
    try {
        const raw = await readFile(join(bookDir, "book.json"), "utf-8");
        const parsed = JSON.parse(raw);
        return parsed.language === "zh" ? "zh" : "en";
    }
    catch {
        return "en";
    }
}
export async function resolveDurableStoryProgress(params) {
    const explicitFallback = normalizeExplicitChapter(params.fallbackChapter);
    const durableArtifactProgress = await resolveContiguousArtifactChapterProgress(params.bookDir);
    return Math.max(durableArtifactProgress, explicitFallback);
}
async function loadJsonIfValid(path, schema, warnings, fileLabel) {
    try {
        const raw = await readFile(path, "utf-8");
        return schema.parse(JSON.parse(raw));
    }
    catch (error) {
        const message = String(error);
        if (!/ENOENT/.test(message)) {
            appendWarning(warnings, `${fileLabel} invalid, rebuilt from markdown`);
        }
        return null;
    }
}
async function loadHooksStateIfValid(path, warnings, fileLabel) {
    try {
        const raw = await readFile(path, "utf-8");
        const repaired = repairHooksStateInput(JSON.parse(raw), warnings);
        return {
            state: HooksStateSchema.parse(repaired.value),
            repaired: repaired.changed,
        };
    }
    catch (error) {
        const message = String(error);
        if (!/ENOENT/.test(message)) {
            appendWarning(warnings, `${fileLabel} invalid, rebuilt from markdown`);
        }
        return null;
    }
}
function repairHooksStateInput(value, warnings) {
    if (!isRecord(value) || !Array.isArray(value.hooks)) {
        return { value, changed: false };
    }
    let changed = false;
    const hooks = value.hooks.map((hook, index) => {
        if (!isRecord(hook))
            return hook;
        const hookId = typeof hook.hookId === "string" && hook.hookId.trim()
            ? hook.hookId.trim()
            : `hooks[${index}]`;
        if (typeof hook.type === "string" && hook.type.trim().length > 0) {
            if (hook.type === hook.type.trim()) {
                return hook;
            }
            changed = true;
            return { ...hook, type: hook.type.trim() };
        }
        changed = true;
        appendWarning(warnings, `${hookId}: empty hook type normalized to "unspecified"`);
        return {
            ...hook,
            type: "unspecified",
        };
    });
    return {
        value: changed ? { ...value, hooks } : value,
        changed,
    };
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function loadMarkdownBootstrapState(params) {
    const summariesState = await loadMarkdownSummariesState(params.storyDir);
    const hooksState = await loadMarkdownHooksState({
        storyDir: params.storyDir,
        warnings: params.warnings,
    });
    const explicitFallback = normalizeExplicitChapter(params.fallbackChapter);
    const durableArtifactProgress = await resolveContiguousArtifactChapterProgress(params.bookDir);
    const authoritativeProgress = Math.max(explicitFallback, durableArtifactProgress);
    const currentState = await loadMarkdownCurrentState({
        storyDir: params.storyDir,
        fallbackChapter: authoritativeProgress,
        warnings: params.warnings,
    });
    return {
        summariesState,
        hooksState,
        currentState,
        durableStoryProgress: authoritativeProgress,
    };
}
async function loadMarkdownSummariesState(storyDir) {
    const markdown = await readFile(join(storyDir, "chapter_summaries.md"), "utf-8").catch(() => "");
    const rawRows = parseChapterSummariesMarkdown(markdown);
    return ChapterSummariesStateSchema.parse({
        rows: deduplicateSummaryRows(rawRows),
    });
}
async function loadMarkdownHooksState(params) {
    const markdown = await readFile(join(params.storyDir, "pending_hooks.md"), "utf-8").catch(() => "");
    return parsePendingHooksStateMarkdown(markdown, params.warnings);
}
async function loadMarkdownCurrentState(params) {
    const markdown = await readFile(join(params.storyDir, "current_state.md"), "utf-8").catch(() => "");
    return parseCurrentStateStateMarkdown(markdown, params.fallbackChapter, params.warnings);
}
async function resolveContiguousArtifactChapterProgress(bookDir) {
    const chapterNumbers = await loadDurableArtifactChapterNumbers(bookDir);
    return resolveContiguousChapterPrefix(chapterNumbers);
}
async function loadDurableArtifactChapterNumbers(bookDir) {
    const chaptersDir = join(bookDir, "chapters");
    const indexPath = join(chaptersDir, "index.json");
    const [indexChapters, fileChapters] = await Promise.all([
        readFile(indexPath, "utf-8")
            .then((raw) => {
            const parsed = JSON.parse(raw);
            return parsed
                .map((entry) => entry?.number)
                .filter((entry) => typeof entry === "number" && Number.isInteger(entry) && entry > 0);
        })
            .catch(() => []),
        readdir(chaptersDir)
            .then((entries) => entries.flatMap((entry) => {
            const match = entry.match(/^(\d+)_/);
            return match ? [parseInt(match[1], 10)] : [];
        }))
            .catch(() => []),
    ]);
    return [...indexChapters, ...fileChapters];
}
async function pathExists(path) {
    try {
        await stat(path);
        return true;
    }
    catch {
        return false;
    }
}
function deduplicateSummaryRows(rows) {
    const byChapter = new Map();
    for (const row of rows) {
        byChapter.set(row.chapter, row);
    }
    return [...byChapter.values()].sort((a, b) => a.chapter - b.chapter);
}
export function resolveContiguousChapterPrefix(chapterNumbers) {
    const chapters = new Set(chapterNumbers.filter((chapter) => Number.isInteger(chapter) && chapter > 0));
    let contiguousChapter = 0;
    while (chapters.has(contiguousChapter + 1)) {
        contiguousChapter += 1;
    }
    return contiguousChapter;
}
function normalizeHookStatus(value, warnings, hookId) {
    const normalized = resolveHookStatusAlias(value);
    if (normalized)
        return normalized;
    if (!(value ?? "").trim())
        return "open";
    appendWarning(warnings, `${hookId}:status normalized from "${value ?? ""}" to "open"`);
    return "open";
}
function normalizeHookType(value, warnings, hookId) {
    const normalized = (value ?? "").trim();
    if (normalized)
        return normalized;
    appendWarning(warnings, `${hookId}: empty hook type normalized to "unspecified"`);
    return "unspecified";
}
function parseStrictIntegerWithWarning(value, warnings, fieldLabel) {
    if (!value)
        return 0;
    const parsed = parseStrictIntegerCell(value);
    if (parsed !== null) {
        return parsed;
    }
    appendWarning(warnings, `${fieldLabel} normalized from "${value}" to 0`);
    return 0;
}
function parseIntegerWithFallback(value, fallback, warnings, fieldLabel) {
    if (!value)
        return Math.max(0, fallback);
    const match = value.match(/\d+/);
    if (!match) {
        appendWarning(warnings, `${fieldLabel} normalized from "${value}" to ${Math.max(0, fallback)}`);
        return Math.max(0, fallback);
    }
    return parseInt(match[0], 10);
}
function parseStrictIntegerCell(value) {
    if (!value)
        return null;
    const normalized = normalizeHookId(value);
    if (!/^\d+$/.test(normalized)) {
        return null;
    }
    return parseInt(normalized, 10);
}
function normalizeExplicitChapter(value) {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        return 0;
    }
    return value;
}
function appendWarning(warnings, warning) {
    if (!warnings.includes(warning)) {
        warnings.push(warning);
    }
}
function uniqueStrings(values) {
    return [...new Set(values.filter((value) => value.trim().length > 0))];
}
//# sourceMappingURL=state-bootstrap.js.map