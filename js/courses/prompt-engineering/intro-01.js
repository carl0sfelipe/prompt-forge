/* I1 — FIRST CONTACT · AI FUNDAMENTALS (absolute beginner) */
export default {
  code: "I1", name: "FIRST CONTACT", skill: "AI FUNDAMENTALS",
  protocol: { name: "THE LITERAL INTERN", desc: "The model is a brilliant, tireless intern with zero context on you: it does exactly what you ask — not what you mean — and it cannot read your mind, your files or your company chat." },
  brief: {
    obj: "Day one with the company AI assistant. Your manager's advice: 'just talk to it like a person.' You need it to summarize yesterday's team meeting before your first 1:1 with Dana.",
    data: "YOU HAVE : the meeting notes (a doc on your laptop)\nTHE AI HAS: no access to your laptop, files or company chat\nGOAL     : a 5-bullet summary to prep your 1:1",
    note: "The model is a <b>literal intern</b>: brilliant, tireless, and blind to everything you don't paste. It completes your words — it does not read your mind.",
    criteria: ["paste the notes", "5 bullets", "no invented content"],
  },
  slots: [
    { id: "MM", label: "MENTAL MODEL", options: [
      { t: "It's an all-knowing oracle that already understands our company, our products and our goals, so short casual questions are enough to get great answers.", q: 0, why: "It knows nothing about your company until you tell it. Treating it as omniscient produces confident fiction." },
      { t: "It's a search engine that finds existing answers.", q: 0, why: "It doesn't search — it generates. Without your data it will invent a plausible summary of a meeting it never saw." },
      { t: "It's a smart chatbot that talks like a person.", q: 1, why: "Half right: it does talk like a person — but it has no access to your world unless you provide it." },
      { t: "It's a text engine: it completes my request from exactly the words and data I give it — nothing else.", q: 2, why: "The correct mental model: input in, completion out. Whatever you want used, you must supply." },
    ]},
    { id: "P1", label: "FIRST PROMPT", options: [
      { t: "Hi! I'm new here and super excited to join the team. I'd love any help you can give me with getting up to speed on how everything works around here, thanks so much!", q: 0, why: "Friendly, but there's no task, no data and no shape. The AI can only mirror the fog back at you." },
      { t: "Summarize the notes.", q: 0, why: "Which notes? The AI can't see them — you'll get an invented summary." },
      { t: "Summarize my meeting notes.", q: 1, why: "Closer — but the notes still live on your laptop. Without pasting them, the model invents." },
      { t: "Summarize the meeting notes pasted below into 5 bullets, one per decision.", q: 2, why: "Task + data + shape. The intern now has everything needed to actually work." },
    ]},
  ],
  outcomes: {
    good: "• Q3 roadmap cut to 3 priorities: payments revamp, mobile beta, enterprise SSO\n• Mobile beta ships Oct 14 — owners: Ana + Rafael\n• Enterprise SSO blocked on legal review; Dana escalating\n• Hiring: 2 backend roles approved, interviews start next week\n• Retro action: cut meeting load 20% — trial starts Monday",
    mid: "• The team discussed the roadmap and some priorities\n• There were updates about mobile and enterprise features\n• Some things are blocked and will be revisited\n• Hiring was mentioned",
    bad: "• The meeting was productive and many topics were covered\n• The team aligned on strategy and next steps\n• Several action items were assigned and deadlines discussed\n• There was great energy and commitment from everyone",
  },
};
