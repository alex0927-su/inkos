export interface ProjectBootstrapOptions {
    readonly language?: "zh" | "en";
    readonly overwriteSupportFiles?: boolean;
}
export declare function ensureProjectGitignore(projectDir: string): Promise<void>;
export declare function initializeProjectDirectory(projectDir: string, options?: ProjectBootstrapOptions): Promise<void>;
export declare function ensureProjectDirectoryInitialized(projectDir: string, options?: Omit<ProjectBootstrapOptions, "overwriteSupportFiles">): Promise<boolean>;
//# sourceMappingURL=project-bootstrap.d.ts.map