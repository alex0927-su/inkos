export interface SecretsFile {
    services: Record<string, {
        apiKey: string;
    }>;
}
export declare function loadSecrets(projectRoot: string): Promise<SecretsFile>;
export declare function saveSecrets(projectRoot: string, secrets: SecretsFile): Promise<void>;
export declare function getServiceApiKey(projectRoot: string, service: string): Promise<string | null>;
//# sourceMappingURL=secrets.d.ts.map