export function createSkillRegistry(options = {}) {
    const skills = dedupeSkills(options.skills ?? []);
    const byId = new Map(skills.map((skill) => [skill.id, skill]));
    return {
        listSkills() {
            return skills;
        },
        getSkill(id) {
            return byId.get(normalizeSkillId(id));
        },
        resolveSkills(input) {
            const disabled = new Set(normalizeIdList(input.disabledSkills));
            const requested = normalizeIdList(input.requestedSkills);
            const missingSkillIds = [];
            const disabledSkillIds = [...disabled].filter((id) => byId.has(id));
            const used = new Map();
            const forcedSkillIds = [];
            for (const id of requested) {
                const skill = byId.get(id);
                if (!skill) {
                    missingSkillIds.push(id);
                    continue;
                }
                if (disabled.has(id))
                    continue;
                used.set(id, skill);
                forcedSkillIds.push(id);
            }
            const availableSkills = skills.filter((skill) => !disabled.has(skill.id));
            return {
                usedSkills: [...used.values()],
                forcedSkillIds,
                missingSkillIds: dedupeStrings(missingSkillIds),
                disabledSkillIds,
                availableSkills,
                availableSkillIds: availableSkills.map((skill) => skill.id),
            };
        },
    };
}
function dedupeSkills(skills) {
    const byId = new Map();
    for (const skill of skills) {
        byId.set(normalizeSkillId(skill.id), {
            ...skill,
            id: normalizeSkillId(skill.id),
        });
    }
    return [...byId.values()].sort((left, right) => left.id.localeCompare(right.id));
}
function normalizeIdList(values) {
    return dedupeStrings((values ?? []).map(normalizeSkillId).filter(Boolean));
}
function normalizeSkillId(value) {
    return value.trim().toLowerCase();
}
function dedupeStrings(values) {
    const out = [];
    const seen = new Set();
    for (const value of values) {
        if (!value || seen.has(value))
            continue;
        seen.add(value);
        out.push(value);
    }
    return out;
}
//# sourceMappingURL=registry.js.map