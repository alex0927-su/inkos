export const PRODUCTION_SKILL_IDS = {
    longWriting: ["inkos-long-writing"],
    longReview: ["inkos-long-writing", "inkos-story-review"],
    shortWriting: ["inkos-short-writing"],
    play: ["inkos-play-world"],
    script: ["inkos-script-writing"],
    storyboard: ["inkos-storyboard"],
    interactiveFilm: ["inkos-interactive-film"],
    translation: ["inkos-translation"],
};
export const NON_LONG_PRODUCTION_CAPABILITIES = [
    "shortWriting",
    "play",
    "script",
    "storyboard",
    "interactiveFilm",
    "translation",
];
export function resolveProductionSkillActivations(availableSkills, capability) {
    const byId = new Map(availableSkills.map((skill) => [skill.id, skill]));
    return PRODUCTION_SKILL_IDS[capability].flatMap((id) => {
        const skill = byId.get(id);
        return skill ? [{ skill, resources: [] }] : [];
    });
}
export function mergeActivatedSkillGuidance(...groups) {
    const merged = new Map();
    for (const group of groups) {
        for (const activation of group)
            merged.set(activation.skill.id, activation);
    }
    return [...merged.values()];
}
export function activatedSkillIds(activations) {
    return activations.map((activation) => activation.skill.id);
}
//# sourceMappingURL=production-bindings.js.map