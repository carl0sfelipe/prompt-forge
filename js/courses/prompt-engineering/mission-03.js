/* M3 — THE GROUNDING · CONTEXT & DATA */
export default {
  code: "M3", name: "THE GROUNDING", skill: "CONTEXT & DATA",
  protocol: { name: "GROUNDING", desc: "The model cannot see what you don't paste. Pass real data inside delimiters and forbid invention: 'Use only the data provided; say UNKNOWN if it's missing.'" },
  brief: {
    obj: "The product team wants this week's support-feedback digest. You have the raw tickets. Your teammate is about to prompt with 'you know our product, summarize the feedback'… stop them.",
    data: "TICKET-2214 : \"Export to CSV crashes on >10k rows.\"\nTICKET-2215 : \"Love the new dark mode. Please add scheduling.\"\nTICKET-2218 : \"SSO setup doc is wrong — step 4 doesn't exist.\"\nTICKET-2219 : \"Billing charged us twice in October.\"\nTICKET-2221 : \"API rate limits are undocumented.\"",
    note: "Never make the model remember your data — <b>inject it</b>. Fences with delimiters (&lt;tickets&gt;…&lt;/tickets&gt;), then set a hard scope rule so hallucination has no door.",
    criteria: ["verbatim data", "delimiters", "no invention"],
  },
  slots: [
    { id: "DATA", label: "DATA INJECTION", options: [
      { t: "Summarize our support tickets — you know our product and how customers typically feel about tools like this, so use that understanding.", q: 0, why: "It doesn't know your tickets — permission to 'use understanding' is permission to invent." },
      { t: "Summarize this week's support tickets — you already know our product and our users well enough to fill in the gaps.", q: 0, why: "It doesn't know your tickets — 'fill in the gaps' is permission to invent." },
      { t: "Users complained about exports, docs and billing, roughly.", q: 1, why: "Your paraphrase is lossy and biased — pass the raw signal instead." },
      { t: "Analyze the tickets provided below, fenced between <tickets> and </tickets>.", q: 2, why: "Verbatim data, fenced by delimiters — the model works on your reality." },
    ]},
    { id: "SCOPE", label: "SCOPE RULE", options: [
      { t: "Feel free to enrich the digest with industry best practices, benchmarks and any relevant background that would make it more complete and actionable for the team.", q: 0, why: "You opened the door to outside noise — the digest blurs into generic advice." },
      { t: "Also add industry best practices.", q: 0, why: "Invites outside noise; the digest stops being about YOUR tickets." },
      { t: "Stay strictly close to the tickets and don't wander into general advice.", q: 1, why: "'Close' is still a judgment call — soft words leave the door open for invention." },
      { t: "Use only the tickets provided. If a claim isn't in them, write UNKNOWN.", q: 2, why: "Hard boundary + fallback behavior. Invention becomes impossible." },
    ]},
  ],
  outcomes: {
    good: "DIGEST — 5 tickets\n\nBUGS (2)     : CSV export crash >10k rows [2214] · duplicate October charge [2219]\nDOCS (2)     : SSO guide step 4 invalid [2218] · API rate limits undocumented [2221]\nPOSITIVE (1) : dark mode praised; scheduling requested [2215]\n\nTOP RISK : billing integrity — revenue-critical, verify refunds.",
    mid: "Users reported some bugs about exports and billing, and one user liked dark mode. Consider improving the documentation.",
    bad: "Your users are frustrated with slow load times, frequent outages and poor mobile support. Many complain about the confusing UI and have requested a mobile app...",
  },
};
