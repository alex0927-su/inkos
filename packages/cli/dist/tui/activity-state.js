import { WARM_ACCENT } from "./theme.js";
const DOTS = ["·  ", "·· ", "···", " ··", "  ·"];
export function describeActivityState(copy) {
    return { label: copy.activity.thinking, frames: DOTS, accent: WARM_ACCENT, intervalMs: 220 };
}
//# sourceMappingURL=activity-state.js.map