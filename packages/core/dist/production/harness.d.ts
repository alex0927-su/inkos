import { type AtomicFileWrite } from "../utils/atomic-file-set.js";
export type ProductionKind = "long-fiction" | "short-fiction" | "script" | "storyboard" | "interactive-film" | "play" | "translation";
export type ProductionRunStatus = "pending" | "running" | "needs-review" | "complete" | "failed" | "cancelled";
export type ProductionObservationSeverity = "info" | "warning" | "blocking";
export interface ProductionObservation {
    readonly metric: string;
    readonly expected: unknown;
    readonly actual: unknown;
    readonly severity: ProductionObservationSeverity;
    readonly evidence?: string;
    readonly repairable: boolean;
}
export interface ProductionRunSnapshot {
    readonly version: 1;
    readonly kind: ProductionKind;
    readonly id: string;
    readonly status: ProductionRunStatus;
    readonly stage: string;
    readonly artifacts: ReadonlyArray<string>;
    readonly observations: ReadonlyArray<ProductionObservation>;
    readonly model?: string;
    readonly skillIds?: ReadonlyArray<string>;
    readonly resumeCursor?: string;
    readonly error?: string;
    readonly updatedAt: string;
}
export declare function createProductionRunSnapshot(input: Omit<ProductionRunSnapshot, "version" | "updatedAt"> & {
    readonly updatedAt?: string;
}): ProductionRunSnapshot;
export declare function createRangeObservation(input: {
    readonly metric: string;
    readonly actual: number;
    readonly target: number;
    readonly min: number;
    readonly max: number;
    readonly unit: string;
    readonly evidence?: string;
    readonly hard?: boolean;
}): ProductionObservation;
/**
 * Commit validated artifacts and publish the run snapshot last. The snapshot is
 * operational truth: a completed run can never point at a half-written set.
 */
export declare function commitProductionArtifacts(input: {
    readonly rootDir: string;
    readonly artifacts: ReadonlyArray<AtomicFileWrite>;
    readonly runPath: string;
    readonly run: ProductionRunSnapshot;
    readonly deletes?: ReadonlyArray<string>;
    readonly validate?: () => void | Promise<void>;
}): Promise<void>;
export declare function writeProductionRunSnapshot(input: {
    readonly rootDir: string;
    readonly runPath: string;
    readonly run: ProductionRunSnapshot;
}): Promise<void>;
//# sourceMappingURL=harness.d.ts.map