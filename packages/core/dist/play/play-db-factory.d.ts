import { type PlayGraphSnapshot } from "./play-file-db.js";
import type { PlayReducerDB } from "./play-reducer.js";
export interface PlayGraphDB extends PlayReducerDB {
    readonly snapshot: () => PlayGraphSnapshot;
    readonly replaceWithSnapshot: (snapshot: PlayGraphSnapshot) => void;
    readonly close?: () => void;
}
export declare function createPlayDB(runDir: string): PlayGraphDB;
//# sourceMappingURL=play-db-factory.d.ts.map