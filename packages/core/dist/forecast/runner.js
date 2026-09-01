import { access } from "node:fs/promises";
import { join } from "node:path";
import { assertSafeBookId } from "../utils/book-id.js";
import { NarrativeForecastAgent } from "./agent.js";
import { buildForecastContext, renderForecastContextMarkdown } from "./context-builder.js";
import { renderForecastComparisonMarkdown, renderSelectedBranchPlanMarkdown } from "./render.js";
import { FORECAST_DEFAULT_BRANCHES, FORECAST_DEFAULT_HORIZON, FORECAST_MAX_BRANCHES, FORECAST_MAX_HORIZON, FORECAST_MIN_BRANCHES, FORECAST_MIN_HORIZON, } from "./schema.js";
import { ForecastStore } from "./store.js";
export async function createNarrativeForecast(options) {
    const bookId = assertSafeBookId(options.bookId, "forecast.bookId");
    const divergence = options.divergence.trim();
    if (!divergence) {
        throw new Error("divergence is required: describe the decision point the forecast should branch on.");
    }
    const branchCount = boundedInteger(options.branchCount, FORECAST_DEFAULT_BRANCHES, "branchCount", FORECAST_MIN_BRANCHES, FORECAST_MAX_BRANCHES);
    const horizon = boundedInteger(options.horizon, FORECAST_DEFAULT_HORIZON, "horizon", FORECAST_MIN_HORIZON, FORECAST_MAX_HORIZON);
    const bookDir = await resolveBookDir(options.projectRoot, bookId);
    options.onProgress?.("Reading canonical context...");
    const context = await buildForecastContext({ bookDir, bookId });
    options.onProgress?.(`Projecting ${branchCount} candidate branches...`);
    const agent = new NarrativeForecastAgent(options.runtime);
    const modelOutput = await agent.generateBranches({
        contextMarkdown: renderForecastContextMarkdown(context),
        divergence,
        branchCount,
        horizon,
        baseChapter: context.baseChapter,
        language: context.language,
    });
    const store = new ForecastStore(bookDir, options.determinism);
    const forecast = {
        version: 1,
        forecastId: await store.allocateForecastId(),
        bookId,
        createdAt: store.now().toISOString(),
        language: context.language,
        divergence,
        horizon,
        baseChapter: context.baseChapter,
        contextFingerprint: context.contextFingerprint,
        status: "active",
        branches: modelOutput.branches.map((branch, index) => ({
            branchId: `branch-${index + 1}`,
            ...branch,
        })),
    };
    options.onProgress?.("Writing forecast artifacts...");
    const paths = await store.save(forecast, renderForecastComparisonMarkdown(forecast));
    return { forecast, ...paths };
}
export async function getNarrativeForecast(options) {
    const bookId = assertSafeBookId(options.bookId, "forecast.bookId");
    const bookDir = await resolveBookDir(options.projectRoot, bookId);
    const store = new ForecastStore(bookDir);
    let forecast = await store.load(options.forecastId);
    const stale = await isForecastStale(bookDir, bookId, forecast);
    if (stale && forecast.status === "active") {
        // Persist the stale marker so later readers see it without recomputing.
        forecast = await store.markStale(forecast);
    }
    return {
        forecast,
        stale,
        forecastJsonPath: store.forecastJsonPath(forecast.forecastId),
        comparisonPath: store.comparisonPath(forecast.forecastId),
    };
}
/**
 * Select one branch: writes ONLY selected-branch-plan.md. Applying the plan
 * to the outline / chapter intents / canonical state is a separate,
 * user-confirmed operation outside v1.
 */
export async function selectNarrativeBranch(options) {
    const bookId = assertSafeBookId(options.bookId, "forecast.bookId");
    const bookDir = await resolveBookDir(options.projectRoot, bookId);
    const store = new ForecastStore(bookDir, options.determinism);
    const forecast = await store.load(options.forecastId);
    const branch = forecast.branches.find((candidate) => candidate.branchId === options.branchId);
    if (!branch) {
        throw new Error(`Branch "${options.branchId}" not found in forecast "${forecast.forecastId}". `
            + `Available branches: ${forecast.branches.map((candidate) => candidate.branchId).join(", ")}`);
    }
    const stale = await isForecastStale(bookDir, bookId, forecast);
    const planPath = await store.writeSelectedPlan(forecast.forecastId, renderSelectedBranchPlanMarkdown({
        forecast,
        branch,
        selectedAt: store.now().toISOString(),
        stale,
    }));
    return { forecast, branch, stale, planPath };
}
async function isForecastStale(bookDir, bookId, forecast) {
    if (forecast.status === "stale")
        return true;
    const context = await buildForecastContext({ bookDir, bookId });
    return context.contextFingerprint !== forecast.contextFingerprint;
}
async function resolveBookDir(projectRoot, bookId) {
    const bookDir = join(projectRoot, "books", bookId);
    try {
        await access(join(bookDir, "book.json"));
    }
    catch {
        throw new Error(`Book "${bookId}" not found under ${join(projectRoot, "books")}.`);
    }
    return bookDir;
}
function boundedInteger(value, fallback, name, min, max) {
    const parsed = value ?? fallback;
    if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
        throw new Error(`${name} must be an integer between ${min} and ${max}.`);
    }
    return parsed;
}
//# sourceMappingURL=runner.js.map