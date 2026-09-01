import { ProxyAgent } from "undici";
export function resolveProxyUrl(explicitProxyUrl, env = process.env) {
    const candidate = [
        explicitProxyUrl,
        env.INKOS_LLM_PROXY_URL,
        env.HTTPS_PROXY,
        env.https_proxy,
        env.HTTP_PROXY,
        env.http_proxy,
    ].find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
    if (!candidate)
        return undefined;
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error(`Unsupported proxy protocol: ${parsed.protocol}`);
    }
    return candidate;
}
export function buildProxyFetchInit(init = {}, explicitProxyUrl, env = process.env) {
    const proxyUrl = resolveProxyUrl(explicitProxyUrl, env);
    if (!proxyUrl)
        return init;
    return {
        ...init,
        dispatcher: new ProxyAgent(proxyUrl),
    };
}
export function fetchWithProxy(input, init = {}, explicitProxyUrl, env = process.env) {
    return fetch(input, buildProxyFetchInit(init, explicitProxyUrl, env));
}
//# sourceMappingURL=proxy-fetch.js.map