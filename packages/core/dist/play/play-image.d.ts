export interface PlayImageWorldContext {
    readonly premise?: string;
    readonly worldContract?: string;
    readonly visualContract?: string;
}
type PlayImageWorldInput = string | PlayImageWorldContext | undefined;
/**
 * Build a style-consistent image prompt for a world entity. The world premise
 * anchors era / setting / art style so every illustration in one run looks like
 * it belongs to the same world.
 */
export declare function buildPlayEntityImagePrompt(entity: {
    readonly type: string;
    readonly label: string;
    readonly summary?: string;
}, worldPremise?: PlayImageWorldInput): string;
/** Build a wide illustration prompt for the current moment from its scene prose. */
export declare function buildPlaySceneImagePrompt(sceneText: string, worldPremise?: PlayImageWorldInput): string;
export type PlayImageStatus = "ready" | "failed";
export interface PlayImageEntry {
    readonly status: PlayImageStatus;
    readonly file?: string;
    readonly error?: string;
}
export type PlayImageManifest = Record<string, PlayImageEntry>;
export declare function readPlayImageManifest(runDir: string): Promise<PlayImageManifest>;
export declare function writePlayImageManifest(runDir: string, manifest: PlayImageManifest): Promise<void>;
/** Immutably set one manifest entry and persist it. Returns the new manifest. */
export declare function setPlayImageEntry(runDir: string, key: string, entry: PlayImageEntry): Promise<PlayImageManifest>;
/**
 * Per-run auto-illustration toggles. Default all-off: nothing is generated
 * until the user opts in (and the cover API is configured).
 */
export interface PlayImageSettings {
    readonly actors: boolean;
    readonly moments: boolean;
    readonly inventory: boolean;
}
export declare const DEFAULT_PLAY_IMAGE_SETTINGS: PlayImageSettings;
export declare function readPlayImageSettings(runDir: string): Promise<PlayImageSettings>;
export declare function writePlayImageSettings(runDir: string, settings: PlayImageSettings): Promise<void>;
/** Filesystem-safe leaf name derived from an entity id / scene key. */
export declare function playImageFileName(key: string, extension: "png" | "jpg"): string;
/**
 * Generate one image for a Play key (entity id or scene key), write it under
 * run/images/, and record the result in the manifest. Never throws on a
 * generation failure — it records {status:"failed"} so the caller/UI can
 * surface it and retry. Throws only if cover generation is not configured.
 */
export declare function generatePlayImage(input: {
    readonly root: string;
    readonly runDir: string;
    readonly key: string;
    readonly prompt: string;
    readonly size?: string;
}): Promise<PlayImageEntry>;
export {};
//# sourceMappingURL=play-image.d.ts.map