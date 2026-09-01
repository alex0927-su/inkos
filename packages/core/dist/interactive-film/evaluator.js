export function evaluateCondition(condition, vars) {
    if (!condition)
        return true;
    const lhs = vars[condition.var];
    const rhs = condition.value;
    switch (condition.op) {
        case "==": return lhs === rhs;
        case "!=": return lhs !== rhs;
        case ">=": return Number(lhs) >= Number(rhs);
        case "<=": return Number(lhs) <= Number(rhs);
        case ">": return Number(lhs) > Number(rhs);
        case "<": return Number(lhs) < Number(rhs);
    }
}
export function applyEffects(vars, effects) {
    if (!effects || effects.length === 0)
        return vars;
    const next = { ...vars };
    for (const e of effects) {
        if (e.op === "set") {
            next[e.var] = e.value;
        }
        else {
            const cur = Number(next[e.var] ?? 0);
            const delta = Number(e.value);
            next[e.var] = e.op === "add" ? cur + delta : cur - delta;
        }
    }
    return next;
}
export function visibleChoices(node, vars) {
    return node.choices.filter((c) => evaluateCondition(c.condition, vars));
}
export function initVarState(variables) {
    const state = {};
    for (const v of variables)
        state[v.name] = v.default;
    return state;
}
//# sourceMappingURL=evaluator.js.map