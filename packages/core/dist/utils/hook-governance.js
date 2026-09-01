import { describeHookLifecycle } from "./hook-lifecycle.js";
export function collectStaleHookDebt(params) {
    return params.hooks
        .filter((hook) => hook.status !== "resolved" && hook.status !== "deferred")
        .filter((hook) => hook.startChapter <= params.chapterNumber)
        .filter((hook) => {
        const lifecycle = describeHookLifecycle({
            payoffTiming: hook.payoffTiming,
            expectedPayoff: hook.expectedPayoff,
            notes: hook.notes,
            startChapter: hook.startChapter,
            lastAdvancedChapter: hook.lastAdvancedChapter,
            status: hook.status,
            chapterNumber: params.chapterNumber,
            targetChapters: params.targetChapters,
        });
        if (params.staleAfterChapters !== undefined) {
            return hook.lastAdvancedChapter <= params.chapterNumber - params.staleAfterChapters;
        }
        return lifecycle.stale || lifecycle.overdue;
    })
        .sort((left, right) => (left.lastAdvancedChapter - right.lastAdvancedChapter
        || left.startChapter - right.startChapter
        || left.hookId.localeCompare(right.hookId)));
}
export function evaluateHookAdmission(params) {
    const candidateType = params.candidate.type.trim();
    if (!candidateType) {
        return {
            admit: false,
            reason: "missing_type",
        };
    }
    const payoffSignal = [params.candidate.expectedPayoff, params.candidate.notes]
        .filter((value) => Boolean(value && value.trim()))
        .join(" ")
        .trim();
    if (!payoffSignal) {
        return {
            admit: false,
            reason: "missing_payoff_signal",
        };
    }
    return {
        admit: true,
        reason: "admit",
    };
}
export function classifyHookDisposition(params) {
    const { hookId, delta } = params;
    if (delta.hookOps.defer.includes(hookId)) {
        return "defer";
    }
    if (delta.hookOps.resolve.includes(hookId)) {
        return "resolve";
    }
    if (delta.hookOps.upsert.some((hook) => hook.hookId === hookId && hook.lastAdvancedChapter === delta.chapter)) {
        return "advance";
    }
    if (delta.hookOps.mention.includes(hookId)) {
        return "mention";
    }
    return "none";
}
//# sourceMappingURL=hook-governance.js.map