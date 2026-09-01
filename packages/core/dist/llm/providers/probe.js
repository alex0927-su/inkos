import { fetchWithProxy } from "../../utils/proxy-fetch.js";
export async function probeModelsFromUpstream(baseUrl, apiKey, timeoutMs = 10_000) {
    if (!baseUrl)
        return [];
    try {
        const modelsUrl = baseUrl.replace(/\/$/, "") + "/models";
        const res = await fetchWithProxy(modelsUrl, {
            headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
            signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok)
            return [];
        const json = (await res.json());
        if (!Array.isArray(json.data))
            return [];
        return json.data
            .filter((m) => typeof m.id === "string" && m.id.length > 0)
            .map((m) => ({ id: m.id, name: m.id, contextWindow: 0 }));
    }
    catch {
        return [];
    }
}
//# sourceMappingURL=probe.js.map