/* I2 — THE LOOP · ITERATION */
export default {
  code: "I2", name: "THE LOOP", skill: "ITERATION",
  protocol: { name: "DRAFT ZERO", desc: "The first output is draft zero, not a deliverable. Follow-ups steer: point at what's wrong and name the fix. Vague feedback gets vague revisions." },
  brief: {
    obj: "The AI drafted an announcement post for your app's new offline mode. It's 240 words of formal mush. Your audience is casual mobile users and you have 80 words of space.",
    data: "DRAFT    : 240 words, corporate tone, no CTA\nCHANNEL  : in-app pop-up (max 80 words)\nAUDIENCE : casual mobile users\nMUST KEEP: \"works with zero internet\"",
    note: "Professional prompting is a <b>loop</b>: run → read → steer. Every follow-up is a steering wheel — aim it at specific defects, not at the whole output.",
    criteria: ["80 words", "casual tone", "keep the promise"],
  },
  slots: [
    { id: "REACT", label: "FIRST REACTION", options: [
      { t: "Accept it as-is — the model worked hard on this, the text sounds professional, and asking for changes might confuse it or somehow make the result worse.", q: 0, why: "Politeness is not a review. Sounding professional is exactly the defect here — your audience is casual users." },
      { t: "Throw it away and start over.", q: 0, why: "You lose a usable draft zero. It's ~70% right — iterate on what exists." },
      { t: "Ask it to try again.", q: 1, why: "A retry without direction rerolls the same dice. It can't guess what bothered you." },
      { t: "Keep the facts, then name the exact fixes: cut to 80 words, casual tone, end with a tap-to-learn-more line.", q: 2, why: "Specific steering: what survives (facts) and what changes (length, tone, CTA). The loop converges." },
    ]},
    { id: "STEER", label: "STEERING MOVE", options: [
      { t: "Please improve every aspect of this text — the structure, the flow, the vocabulary, the persuasive power, the emotional resonance, the call to action, absolutely everything.", q: 0, why: "'Everything' gives no priority. The model will guess what 'better' means — usually longer and fancier." },
      { t: "Make it better.", q: 0, why: "Better how? Shorter? Funnier? The model picks the dimension at random." },
      { t: "Make it shorter and more casual.", q: 1, why: "Two dimensions named — but no hard cap and no CTA, so you'll loop a few more times than needed." },
      { t: "Rewrite at 80 words max, casual tone (emoji ok), keep \"works with zero internet\", end with \"Tap to see how\".", q: 2, why: "Every fix is checkable: word cap, tone, required phrase, required ending. One pass lands." },
    ]},
  ],
  outcomes: {
    good: "Offline mode is here 📶❌\nYour app now works with zero internet. Notes, checklists, drafts — everything keeps moving on a plane, in a tunnel, at the beach.\n\nTap to see how.",
    mid: "We're happy to share that offline mode has arrived! You can now keep using your notes and checklists without an internet connection in many situations. Give it a try next time you're offline!",
    bad: "Upon extensive deliberation, we have comprehensively enhanced our application's offline paradigm to holistically synergize with your mobile lifestyle, leveraging cutting-edge capabilities to ensure continuity of experience across connectivity-denied environments...",
  },
};
