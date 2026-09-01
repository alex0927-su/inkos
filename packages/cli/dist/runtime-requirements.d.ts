export declare const MIN_NODE_MAJOR = 22;
export declare const NODE_PIN_VERSION: string;
export declare const NODE_PIN_FILES: readonly [".nvmrc", ".node-version"];
export interface NodeRuntimeSupportResult {
    readonly ok: boolean;
    readonly detail: string;
}
export interface NodeRuntimePinStatus {
    readonly ok: boolean;
    readonly detail: string;
    readonly missing: ReadonlyArray<string>;
}
export interface NodeRuntimePinRepairResult {
    readonly updated: boolean;
    readonly written: ReadonlyArray<string>;
}
export declare function inspectNodeRuntimePinFiles(root: string): Promise<NodeRuntimePinStatus>;
export declare function ensureNodeRuntimePinFiles(root: string): Promise<NodeRuntimePinRepairResult>;
export declare function parseNodeMajor(version: string): number;
export declare function evaluateNodeRuntimeSupport(options?: {
    readonly nodeVersion?: string;
    readonly hasNodeSqlite?: boolean;
}): NodeRuntimeSupportResult;
//# sourceMappingURL=runtime-requirements.d.ts.map