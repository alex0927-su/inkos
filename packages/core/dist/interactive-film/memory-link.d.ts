import type { MemoryDB } from "../state/memory-db.js";
import type { Character } from "./graph-schema.js";
export declare function writeCharacterFacts(db: MemoryDB, chars: readonly Character[], rev: number): void;
export declare function readCharacterVoices(db: MemoryDB, names: readonly string[]): ReadonlyArray<{
    subject: string;
    predicate: string;
    object: string;
}>;
//# sourceMappingURL=memory-link.d.ts.map