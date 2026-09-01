import { PlayDB } from "./play-db.js";
import { PlayFileDB } from "./play-file-db.js";
export function createPlayDB(runDir) {
    try {
        return new PlayDB(runDir);
    }
    catch (error) {
        if (isMissingNodeSqliteError(error)) {
            return new PlayFileDB(runDir);
        }
        throw error;
    }
}
function isMissingNodeSqliteError(error) {
    const message = error instanceof Error ? error.message : String(error);
    return message.includes("node:sqlite") || message.includes("No such built-in module");
}
//# sourceMappingURL=play-db-factory.js.map