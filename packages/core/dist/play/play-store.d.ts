import { z } from "zod";
import { type PlayEvent } from "../models/play.js";
import type { PlayGraphSnapshot } from "./play-file-db.js";
import type { PlayGraphDB } from "./play-db-factory.js";
declare const PlayTranscriptTurnSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant", "system", "tool"]>;
    content: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    role: "user" | "assistant" | "system" | "tool";
    timestamp: number;
}, {
    content: string;
    role: "user" | "assistant" | "system" | "tool";
    timestamp: number;
}>;
export type PlayTranscriptTurn = z.infer<typeof PlayTranscriptTurnSchema>;
declare const PlayWorldSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    premise: z.ZodDefault<z.ZodString>;
    worldContract: z.ZodDefault<z.ZodString>;
    visualContract: z.ZodDefault<z.ZodString>;
    mode: z.ZodDefault<z.ZodEnum<["open", "guided"]>>;
    language: z.ZodDefault<z.ZodEnum<["zh", "en"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    language: "zh" | "en";
    createdAt: string;
    updatedAt: string;
    mode: "open" | "guided";
    premise: string;
    worldContract: string;
    visualContract: string;
}, {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    language?: "zh" | "en" | undefined;
    mode?: "open" | "guided" | undefined;
    premise?: string | undefined;
    worldContract?: string | undefined;
    visualContract?: string | undefined;
}>;
export type PlayWorld = z.infer<typeof PlayWorldSchema>;
export type PlayWorldInput = Omit<z.input<typeof PlayWorldSchema>, "createdAt" | "updatedAt"> & {
    readonly createdAt?: string;
    readonly updatedAt?: string;
};
export interface PlayRunSummary {
    readonly id: string;
    readonly updatedAt: string;
    readonly eventCount: number;
    readonly transcriptCount: number;
}
export interface PlayRunSnapshot {
    readonly id: string;
    readonly turn: number;
    readonly createdAt: string;
    readonly eventsRaw: string;
    readonly transcriptRaw: string;
    readonly currentStateRaw: string;
    readonly sceneProjection: string;
    readonly stateProjection: string;
    readonly graph: PlayGraphSnapshot;
}
export declare class PlayStore {
    private readonly projectRoot;
    constructor(projectRoot: string);
    worldDir(worldId: string): string;
    runDir(worldId: string, runId: string): string;
    ensureWorld(worldId: string): Promise<void>;
    createWorld(input: PlayWorldInput): Promise<PlayWorld>;
    removeWorld(worldId: string): Promise<void>;
    updateWorld(worldId: string, patch: Partial<Pick<PlayWorld, "premise" | "worldContract" | "visualContract" | "mode">>): Promise<PlayWorld>;
    loadWorld(worldId: string): Promise<PlayWorld | null>;
    listWorlds(): Promise<PlayWorld[]>;
    ensureRun(worldId: string, runId: string): Promise<void>;
    listRuns(worldId: string): Promise<PlayRunSummary[]>;
    appendEvent(worldId: string, runId: string, event: PlayEvent): Promise<void>;
    appendRawEventLine(worldId: string, runId: string, line: string): Promise<void>;
    readEvents(worldId: string, runId: string): Promise<PlayEvent[]>;
    appendTranscriptTurn(worldId: string, runId: string, turn: PlayTranscriptTurn): Promise<void>;
    readTranscript(worldId: string, runId: string): Promise<PlayTranscriptTurn[]>;
    saveCurrentState(worldId: string, runId: string, state: unknown): Promise<void>;
    loadCurrentState(worldId: string, runId: string): Promise<unknown>;
    writeProjection(worldId: string, runId: string, relativePath: string, content: string): Promise<void>;
    readProjection(worldId: string, runId: string, relativePath: string): Promise<string>;
    captureRunSnapshot(worldId: string, runId: string, input: {
        readonly id: string;
        readonly turn: number;
        readonly graph: PlayGraphSnapshot;
    }): Promise<PlayRunSnapshot>;
    saveCheckpoint(worldId: string, runId: string, snapshot: PlayRunSnapshot): Promise<void>;
    loadCheckpoint(worldId: string, runId: string, checkpointId: string): Promise<PlayRunSnapshot | null>;
    saveVariant(worldId: string, runId: string, turn: number, snapshot: PlayRunSnapshot): Promise<string>;
    loadVariant(worldId: string, runId: string, turn: number, variantId: string): Promise<PlayRunSnapshot | null>;
    restoreRunSnapshot(worldId: string, runId: string, snapshot: PlayRunSnapshot, db: PlayGraphDB): Promise<void>;
    private eventsPath;
    private transcriptPath;
    private appendJsonLine;
    private readJsonLines;
    private readOptionalRunFile;
    private loadSnapshotFile;
    private safeRunChildPath;
}
export {};
//# sourceMappingURL=play-store.d.ts.map