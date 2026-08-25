/* I4 — THE SAFE OPERATOR · SAFETY HYGIENE */
export default {
  code: "I4", name: "THE SAFE OPERATOR", skill: "SAFETY HYGIENE",
  protocol: { name: "THE PERIMETER", desc: "Everything you paste is data leaving your control — no credentials, no confidential documents, no personal data you wouldn't post publicly. And every output ships under your name: review it like you wrote it." },
  brief: {
    obj: "Crunch time. You want AI help rewriting a delicate client email, and a teammate suggests pasting the full contract 'for context' — plus the staging database password so the AI can 'test' its own suggestions.",
    data: "TASK    : rewrite a delicate client email\nCONTEXT : the client's signed contract (confidential)\nOFFERED : staging DB password \"so it can test things\"\nDEADLINE: end of day",
    note: "Two rules of the perimeter: <b>secrets and client data never cross</b> into the chat, and <b>the output is yours</b> — the model drafts, you own what ships.",
    criteria: ["no secrets pasted", "minimal necessary data", "human owns the output"],
  },
  slots: [
    { id: "IN", label: "WHAT GOES IN", options: [
      { t: "Paste everything — the full contract, the password and the whole email thread — because complete context produces complete answers, and speed matters more than anything right now.", q: 0, why: "Credentials + confidential client documents in a chat log is a data incident waiting to be discovered. Context should be minimal, not total." },
      { t: "Paste the contract — it's just internal.", q: 0, why: "'Just internal' isn't yours to decide: client contracts are confidential by default." },
      { t: "Paste the contract but redact the client's name.", q: 1, why: "Redaction helps, but the client stays identifiable from clause details — and it's still more than the task needs." },
      { t: "Paste only the two contract clauses the email touches, names removed; the password never enters the chat.", q: 2, why: "Minimal necessary data: only what the rewrite requires, anonymized. Secrets stay out entirely." },
    ]},
    { id: "OUT", label: "OWNING THE OUTPUT", options: [
      { t: "Send it — the model is a professional-grade tool trained on millions of business emails, so its draft is at least as good as anything you'd write on a bad day.", q: 0, why: "Volume of training data is not a review. 'Professional-grade' is marketing, not QA." },
      { t: "Just send it exactly as the AI wrote it — it's only an email and nobody reads them that closely anyway.", q: 0, why: "'Nobody reads closely' is how wrong promises survive — until the client's lawyer does." },
      { t: "Skim it once for typos and send.", q: 1, why: "Typos aren't the risk. Wrong facts, wrong promises and wrong tone are — and those need a real read." },
      { t: "Review every claim and promise as if I wrote it myself — my name goes on it.", q: 2, why: "The human owns the output. Whatever ships, ships under your signature." },
    ]},
  ],
  outcomes: {
    good: "SENT — 17:42\n• Email reviewed line by line: one wrong deadline caught (AI wrote 'Friday', contract says 'the 15th')\n• Tone kept firm-but-warm; no overpromising\n• Perimeter held: clauses only, names removed, password never pasted\n→ Client replied positively the next morning.",
    mid: "SENT — 18:30\n• Quick skim, looked fine\n• Full contract pasted for context (felt harmless at the time)\n→ No incident this time. The risk was real; the luck was free.",
    bad: "SENT — 18:59\n• Contract + password pasted 'for context'\n• Email shipped unread under deadline pressure\n→ Two promises the contract doesn't support. Security flagged the credentials in the chat log on Thursday.",
  },
};
