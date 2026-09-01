import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NarrativeForecastSchema } from "./schema.js";
export function assertSafeForecastId(value) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(value)) {
        throw new Error(`Invalid forecast id: ${JSON.stringify(value)}`);
    }
    return value;
}
export class ForecastStore {
    bookDir;
    options;
    constructor(bookDir, options = {}) {
        this.bookDir = bookDir;
        this.options = options;
    }
    get forecastsDir() {
        return join(this.bookDir, "story", "runtime", "narrative-forecasts");
    }
    forecastDir(forecastId) {
        return join(this.forecastsDir, assertSafeForecastId(forecastId));
    }
    forecastJsonPath(forecastId) {
        return join(this.forecastDir(forecastId), "forecast.json");
    }
    comparisonPath(forecastId) {
        return join(this.forecastDir(forecastId), "comparison.md");
    }
    selectedPlanPath(forecastId) {
        return join(this.forecastDir(forecastId), "selected-branch-plan.md");
    }
    now() {
        return (this.options.now ?? (() => new Date()))();
    }
    /**
     * Derive the next forecast id: injected factory first, otherwise a
     * timestamp from the injected clock; suffix -2/-3/... if the directory
     * already exists so re-runs never overwrite an earlier forecast.
     */
    async allocateForecastId() {
        const base = this.options.idFactory
            ? assertSafeForecastId(this.options.idFactory())
            : `fc-${formatTimestamp(this.now())}`;
        let candidate = base;
        for (let suffix = 2; await pathExists(this.forecastDir(candidate)); suffix += 1) {
            candidate = `${base}-${suffix}`;
        }
        return candidate;
    }
    async save(forecast, comparisonMarkdown) {
        // Validate before touching the filesystem so an invalid forecast never
        // leaves a half-written directory behind.
        const validated = NarrativeForecastSchema.parse(forecast);
        const dir = this.forecastDir(validated.forecastId);
        await mkdir(dir, { recursive: true });
        const forecastJsonPath = this.forecastJsonPath(validated.forecastId);
        const comparisonPath = this.comparisonPath(validated.forecastId);
        await writeFile(forecastJsonPath, `${JSON.stringify(validated, null, 2)}\n`, "utf-8");
        await writeFile(comparisonPath, `${comparisonMarkdown.trimEnd()}\n`, "utf-8");
        return { forecastJsonPath, comparisonPath };
    }
    async load(forecastId) {
        const path = this.forecastJsonPath(forecastId);
        let raw;
        try {
            raw = await readFile(path, "utf-8");
        }
        catch (error) {
            if (error?.code === "ENOENT") {
                const available = await this.list();
                throw new Error(`Narrative forecast "${forecastId}" not found. Available forecasts: ${available.length > 0 ? available.join(", ") : "(none)"}`);
            }
            throw error;
        }
        let parsed;
        try {
            parsed = JSON.parse(raw);
        }
        catch (error) {
            throw new Error(`Narrative forecast "${forecastId}" has corrupted forecast.json: ${String(error)}`);
        }
        try {
            return NarrativeForecastSchema.parse(parsed);
        }
        catch (error) {
            throw new Error(`Narrative forecast "${forecastId}" failed schema validation: ${String(error)}`);
        }
    }
    async list() {
        let entries;
        try {
            entries = await readdir(this.forecastsDir);
        }
        catch {
            return [];
        }
        const ids = [];
        for (const entry of entries) {
            if (await pathExists(join(this.forecastsDir, entry, "forecast.json"))) {
                ids.push(entry);
            }
        }
        return ids.sort();
    }
    async markStale(forecast) {
        const stale = { ...forecast, status: "stale" };
        await writeFile(this.forecastJsonPath(stale.forecastId), `${JSON.stringify(NarrativeForecastSchema.parse(stale), null, 2)}\n`, "utf-8");
        return stale;
    }
    async writeSelectedPlan(forecastId, markdown) {
        const path = this.selectedPlanPath(forecastId);
        await writeFile(path, `${markdown.trimEnd()}\n`, "utf-8");
        return path;
    }
}
function formatTimestamp(date) {
    const iso = date.toISOString();
    return `${iso.slice(0, 10).replace(/-/g, "")}-${iso.slice(11, 19).replace(/:/g, "")}`;
}
async function pathExists(path) {
    try {
        await access(path);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=store.js.map