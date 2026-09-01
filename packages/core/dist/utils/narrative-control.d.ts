import type { ChapterIntent, ChapterMemo, ContextPackage } from "../models/input-governance.js";
export declare function sanitizeNarrativeControlText(text: string, language?: "zh" | "en"): string;
/**
 * Render a ChapterMemo + optional ChapterIntent into a sanitized narrative
 * control block for the writer / reviser prompt.
 *
 * Phase 4: the memo body already contains the 7 required section headings
 * (当前任务 / 读者此刻在等什么 / 该兑现的 / 日常过渡 / 关键抉择 / 章尾 / 不要做)
 * produced by the planner LLM. We emit them at top level so the writer sees
 * each section as its own task-unit instead of one flattened "memo" block.
 */
export declare function renderMemoAsNarrativeBlock(memo: ChapterMemo, intent: ChapterIntent | undefined, language?: "zh" | "en"): string;
export declare function buildNarrativeIntentBrief(chapterIntent: string, language?: "zh" | "en"): string;
export declare function renderNarrativeSelectedContext(entries: ReadonlyArray<ContextPackage["selectedContext"][number]>, language?: "zh" | "en"): string;
export declare function sanitizeNarrativeEvidenceBlock(block: string | undefined, language?: "zh" | "en"): string | undefined;
//# sourceMappingURL=narrative-control.d.ts.map