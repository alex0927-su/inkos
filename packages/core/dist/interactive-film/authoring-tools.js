export function buildWorldAnchorDelta(patch) {
    return { worldAnchor: patch, notes: [] };
}
export function buildAddVariableDelta(v) {
    return { variables: { upsert: [v], remove: [] }, notes: [] };
}
export function buildDefineEndingDelta(e) {
    return { endings: { upsert: [e], remove: [] }, notes: [] };
}
export function buildRemoveNodeDelta(nodeId) {
    return { nodes: { upsert: [], remove: [nodeId] }, notes: [] };
}
export function buildConnectChoiceDelta(node) {
    return { nodes: { upsert: [node], remove: [] }, notes: [] };
}
export function buildUpsertCharactersDelta(chars) {
    return { characters: { upsert: chars, remove: [] }, notes: [] };
}
//# sourceMappingURL=authoring-tools.js.map