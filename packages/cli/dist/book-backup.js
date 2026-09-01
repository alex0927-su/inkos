import { access, cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
/**
 * Whole-book backups live OUTSIDE books/ (at .inkos/backups/<bookId>/<backupId>/),
 * so a backup never recursively contains other backups.
 */
export function bookBackupsDir(root, bookId) {
    return join(root, ".inkos", "backups", bookId);
}
export async function createBookBackup(root, bookId, options = {}) {
    const bookDir = join(root, "books", bookId);
    const bookInfo = await stat(bookDir).catch(() => null);
    if (!bookInfo?.isDirectory()) {
        throw new Error(`Book "${bookId}" not found at books/${bookId}/.`);
    }
    const backupsDir = bookBackupsDir(root, bookId);
    await mkdir(backupsDir, { recursive: true });
    const clock = options.now ?? (() => new Date());
    const base = options.suffix ? `${formatStamp(clock())}-${options.suffix}` : formatStamp(clock());
    let backupId = base;
    for (let attempt = 2; await pathExists(join(backupsDir, backupId)); attempt += 1) {
        backupId = `${base}-${attempt}`;
    }
    const backupPath = join(backupsDir, backupId);
    await cp(bookDir, backupPath, { recursive: true });
    return { bookId, backupId, path: backupPath };
}
export async function listBookBackups(root, bookId) {
    const backupsDir = bookBackupsDir(root, bookId);
    const entries = await readdir(backupsDir, { withFileTypes: true }).catch((error) => {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    });
    const backups = await Promise.all(entries
        .filter((entry) => entry.isDirectory())
        .map(async (entry) => {
        const info = await stat(join(backupsDir, entry.name));
        return { id: entry.name, createdAt: info.mtime.toISOString() };
    }));
    // Backup ids start with a UTC timestamp, so a descending id sort is newest-first.
    return backups.sort((a, b) => b.id.localeCompare(a.id));
}
export async function restoreBookBackup(root, bookId, backupId, options = {}) {
    // backupId comes from CLI input and is joined into a path — keep it a single
    // safe path component.
    if (!/^[A-Za-z0-9._-]+$/.test(backupId) || backupId === "." || backupId === "..") {
        throw new Error(`Invalid backup id "${backupId}": a backup id must be a single directory name.`);
    }
    const backupPath = join(bookBackupsDir(root, bookId), backupId);
    const backupInfo = await stat(backupPath).catch(() => null);
    if (!backupInfo?.isDirectory()) {
        throw new Error(`Backup "${backupId}" not found for book "${bookId}". `
            + `List available backups with: inkos book backup ${bookId} --list`);
    }
    const bookDir = join(root, "books", bookId);
    const bookExists = await stat(bookDir).then((info) => info.isDirectory()).catch(() => false);
    let preRestoreBackupId = null;
    if (bookExists) {
        const preRestore = await createBookBackup(root, bookId, { now: options.now, suffix: "pre-restore" });
        preRestoreBackupId = preRestore.backupId;
    }
    await rm(bookDir, { recursive: true, force: true });
    await cp(backupPath, bookDir, { recursive: true });
    return { bookId, restoredFrom: backupId, preRestoreBackupId };
}
function formatStamp(date) {
    return date.toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "-");
}
async function pathExists(path) {
    return access(path).then(() => true).catch(() => false);
}
//# sourceMappingURL=book-backup.js.map