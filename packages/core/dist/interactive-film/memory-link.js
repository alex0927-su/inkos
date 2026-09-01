export function writeCharacterFacts(db, chars, rev) {
    for (const c of chars) {
        if (c.motivation) {
            db.addFact({ subject: c.name, predicate: "motivation", object: c.motivation, validFromChapter: rev, validUntilChapter: null, sourceChapter: rev });
        }
        const vp = c.voiceProfile;
        if (vp?.speakingRhythm || vp?.vocabulary) {
            db.addFact({ subject: c.name, predicate: "voice", object: [vp?.speakingRhythm, vp?.vocabulary].filter(Boolean).join(" / "), validFromChapter: rev, validUntilChapter: null, sourceChapter: rev });
        }
    }
}
export function readCharacterVoices(db, names) {
    return db.getFactsForCharacters(names).map((f) => ({ subject: f.subject, predicate: f.predicate, object: f.object }));
}
//# sourceMappingURL=memory-link.js.map