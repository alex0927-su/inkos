import type { RequestedIntent } from "@actalk/inkos-core";
export type StudioTaskExecutionStatus = "running" | "processing" | "completed" | "error";
export interface StudioTaskExecution {
    readonly id: string;
    readonly tool: string;
    readonly agent?: string;
    readonly label: string;
    readonly status: StudioTaskExecutionStatus;
    readonly args?: Record<string, unknown>;
    readonly result?: string;
    readonly details?: unknown;
    readonly error?: string;
    readonly stages?: ReadonlyArray<{
        readonly label: string;
        readonly status: "pending" | "active" | "completed";
    }>;
    readonly logs?: ReadonlyArray<string>;
    readonly startedAt: number;
    readonly completedAt?: number;
}
export interface StudioTaskSnapshot {
    readonly version: 1;
    readonly sessionId: string;
    readonly sourceRequestId?: string;
    readonly requestedIntent: RequestedIntent;
    readonly execution: StudioTaskExecution;
    readonly updatedAt: number;
}
export declare function studioTaskSnapshotPath(projectRoot: string, sessionId: string): string;
export declare function saveStudioTaskSnapshot(projectRoot: string, snapshot: StudioTaskSnapshot): Promise<void>;
export declare function loadStudioTaskSnapshot(projectRoot: string, sessionId: string): Promise<StudioTaskSnapshot | null>;
export declare function deleteStudioTaskSnapshot(projectRoot: string, sessionId: string): Promise<void>;
//# sourceMappingURL=task-store.d.ts.map