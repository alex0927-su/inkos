import { commitAtomicFileSet } from "../utils/atomic-file-set.js";
export function createProductionRunSnapshot(input) {
    return {
        version: 1,
        ...input,
        updatedAt: input.updatedAt ?? new Date().toISOString(),
    };
}
export function createRangeObservation(input) {
    const inRange = input.actual >= input.min && input.actual <= input.max;
    return {
        metric: input.metric,
        expected: {
            target: input.target,
            min: input.min,
            max: input.max,
            unit: input.unit,
        },
        actual: { value: input.actual, unit: input.unit },
        severity: inRange ? "info" : input.hard === false ? "warning" : "blocking",
        ...(input.evidence ? { evidence: input.evidence } : {}),
        repairable: !inRange,
    };
}
/**
 * Commit validated artifacts and publish the run snapshot last. The snapshot is
 * operational truth: a completed run can never point at a half-written set.
 */
export async function commitProductionArtifacts(input) {
    await input.validate?.();
    await commitAtomicFileSet({
        rootDir: input.rootDir,
        writes: [
            ...input.artifacts,
            {
                relativePath: input.runPath,
                content: `${JSON.stringify(input.run, null, 2)}\n`,
            },
        ],
        deletes: input.deletes,
    });
}
export async function writeProductionRunSnapshot(input) {
    await commitProductionArtifacts({
        rootDir: input.rootDir,
        artifacts: [],
        runPath: input.runPath,
        run: input.run,
    });
}
//# sourceMappingURL=harness.js.map