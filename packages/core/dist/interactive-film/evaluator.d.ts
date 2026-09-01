import type { Condition, Effect, StoryNode, Choice, Variable, VarValue } from "./graph-schema.js";
export type VarState = Record<string, VarValue>;
export declare function evaluateCondition(condition: Condition | undefined, vars: VarState): boolean;
export declare function applyEffects(vars: VarState, effects: readonly Effect[] | undefined): VarState;
export declare function visibleChoices(node: StoryNode, vars: VarState): Choice[];
export declare function initVarState(variables: readonly Variable[]): VarState;
//# sourceMappingURL=evaluator.d.ts.map