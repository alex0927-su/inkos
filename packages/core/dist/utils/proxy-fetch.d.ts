type ProxyEnv = Record<string, string | undefined>;
type FetchInitWithDispatcher = RequestInit & {
    dispatcher?: unknown;
};
export declare function resolveProxyUrl(explicitProxyUrl?: string, env?: ProxyEnv): string | undefined;
export declare function buildProxyFetchInit(init?: RequestInit, explicitProxyUrl?: string, env?: ProxyEnv): FetchInitWithDispatcher;
export declare function fetchWithProxy(input: Parameters<typeof fetch>[0], init?: RequestInit, explicitProxyUrl?: string, env?: ProxyEnv): ReturnType<typeof fetch>;
export {};
//# sourceMappingURL=proxy-fetch.d.ts.map