export interface BookBackupInfo {
    readonly id: string;
    readonly createdAt: string;
}
export interface CreateBookBackupOptions {
    /** Injectable clock so tests do not depend on real time. */
    readonly now?: () => Date;
    /** Appended to the backup id, e.g. "pre-restore". */
    readonly suffix?: string;
}
export interface CreateBookBackupResult {
    readonly bookId: string;
    readonly backupId: string;
    readonly path: string;
}
export interface RestoreBookBackupOptions {
    readonly now?: () => Date;
}
export interface RestoreBookBackupResult {
    readonly bookId: string;
    readonly restoredFrom: string;
    /** Auto-backup of the pre-restore state; null when the book directory did not exist. */
    readonly preRestoreBackupId: string | null;
}
/**
 * Whole-book backups live OUTSIDE books/ (at .inkos/backups/<bookId>/<backupId>/),
 * so a backup never recursively contains other backups.
 */
export declare function bookBackupsDir(root: string, bookId: string): string;
export declare function createBookBackup(root: string, bookId: string, options?: CreateBookBackupOptions): Promise<CreateBookBackupResult>;
export declare function listBookBackups(root: string, bookId: string): Promise<ReadonlyArray<BookBackupInfo>>;
export declare function restoreBookBackup(root: string, bookId: string, backupId: string, options?: RestoreBookBackupOptions): Promise<RestoreBookBackupResult>;
//# sourceMappingURL=book-backup.d.ts.map