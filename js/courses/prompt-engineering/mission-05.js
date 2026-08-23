/* M5 — THE MIRROR · FEW-SHOT EXAMPLES */
export default {
  code: "M5", name: "THE MIRROR", skill: "FEW-SHOT EXAMPLES",
  protocol: { name: "FEW-SHOT DEMONSTRATION", desc: "Descriptions tell; examples show. Two to four input→output pairs lock in style, shape and tone faster than paragraphs of rules. Your examples are the spec." },
  brief: {
    obj: "The support triage bot must label every incoming ticket with one of four labels plus a one-line reason — same shape, every time, 400 tickets a day.",
    data: "LABEL SET : BILLING | BUG | FEATURE | OTHER\nVOLUME    : ~400 tickets / day\nREVIEWERS : humans read every output",
    note: "Few-shot beats over-explaining: <b>2–4 clean input→output pairs</b> teach format and tone by demonstration. Then pin a consistency rule so the model mirrors instead of improvising.",
    criteria: ["exact shape", "fixed labels", "stable at scale"],
  },
  slots: [
    { id: "EX", label: "DEMONSTRATIONS", options: [
      { t: "Include twenty detailed examples covering every conceivable edge case and variation, so the model has complete coverage of all possible inputs it might ever encounter.", q: 0, why: "Overkill: burns the context budget and risks contradictions. 2–4 clean pairs win." },
      { t: "Just tell it to label the tickets correctly and consistently.", q: 0, why: "'Correctly' is the outcome you want, not the instruction that gets you there." },
      { t: "A paragraph describing what each label means.", q: 1, why: "Definitions help, but shape and tone stay imagined — output drifts." },
      { t: 'Three input→output pairs, e.g. "Can\'t export CSV" → BUG · data export fails at scale.', q: 2, why: "Few-shot: the model mirrors your structure, brevity and tone exactly." },
    ]},
    { id: "LOCK", label: "CONSISTENCY RULE", options: [
      { t: "Improve on the examples wherever you see an opportunity to be smarter or more helpful — use your best judgment to make each label even better than shown.", q: 0, why: "Invites drift — every 'improvement' is a new format humans must relearn." },
      { t: "Improve on the examples where you can.", q: 0, why: "Same trap: 'improvement' at 400 tickets/day means 400 different formats." },
      { t: "Use the examples as guidance.", q: 1, why: "'Guidance' licenses improvisation on the boring cases." },
      { t: "Follow the example format exactly. If uncertain, output OTHER.", q: 2, why: "Mirror rule + safe fallback = a stable pipeline at 400/day." },
    ]},
  ],
  outcomes: {
    good: "T-2214 → BUG     · CSV export crashes past 10k rows\nT-2215 → FEATURE · scheduling requested; dark mode praised\nT-2219 → BILLING · duplicate October charge\nT-2221 → OTHER   · documentation gap, not a defect\n\n→ identical shape across all 400 tickets · reviewers skim at full speed",
    mid: "T-2214: bug (export).\nT-2215: feature request maybe?\nT-2219: Billing Issue\n\n→ inconsistent casing and shape — reviewers squint",
    bad: "Ticket 2214 seems technical in nature. Ticket 2215 is positive feedback about dark mode and also a wish for scheduling — it could be OTHER or FEATURE depending on how you define those, honestly...",
  },
};
