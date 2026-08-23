/* M6 — THE LABYRINTH · DECOMPOSITION & SELF-CHECK */
export default {
  code: "M6", name: "THE LABYRINTH", skill: "DECOMPOSITION",
  protocol: { name: "DECOMPOSE & SELF-CHECK", desc: "'Think step by step' buys the model working memory. Force assumptions to the surface first, chain the reasoning, and end every analysis prompt with a visible self-check." },
  brief: {
    obj: "Leadership asks: 'Should we open a Brazil office in Q3?' The model wants to blurt a confident yes or no. Buy it a path to think instead.",
    data: "KNOWN   : 18% of signups already LATAM · PT-BR support only via translation\n          2 competitors based in São Paulo\nUNKNOWN : pricing tolerance · hiring costs · tax structure",
    note: "Confidence is not correctness. Demand <b>assumptions → evidence → conclusion</b>, then make the model expose what could change its answer.",
    criteria: ["visible reasoning", "assumptions listed", "falsifiable close"],
  },
  slots: [
    { id: "RSN", label: "REASONING SHAPE", options: [
      { t: "Consider every possible factor — market, culture, tax, hiring, competition, time zones, currency, brand — and cover them all comprehensively.", q: 0, why: "Breadth is not reasoning. An unstructured survey of everything forces no conclusion." },
      { t: "Answer quickly and confidently.", q: 0, why: "Speed-first = vibes-first. Confidence without reasoning is a coin flip in a suit." },
      { t: "Give me pros and cons.", q: 1, why: "Structure, but a flat list hides dependencies and forces no conclusion." },
      { t: "Think step by step: list assumptions → weigh evidence for and against → conclude with a recommendation and confidence level.", q: 2, why: "Chain-of-thought with a forced landing — reasoning you can audit." },
    ]},
    { id: "CHK", label: "SELF-CHECK", options: [
      { t: "Review your final answer very carefully, multiple times, and only send it once you are completely sure it is the best possible response.", q: 0, why: "Effort theater — invisible, unverifiable, and it changes nothing about the output's structure." },
      { t: "Be concise — leadership is busy.", q: 0, why: "Brevity is fine, but a wrong answer delivered briefly is still wrong." },
      { t: "Double-check your answer before replying.", q: 1, why: "Invisible instruction — you can't see whether it actually checked anything." },
      { t: 'End with "What would change my answer": three data points that could flip the recommendation.', q: 2, why: "Visible self-check: exposes the conclusion's weak joints instead of hiding them." },
    ]},
  ],
  outcomes: {
    good: "STEP 1 — ASSUMPTIONS: LATAM signups are a demand signal; translation-only support is currently tolerating it.\nSTEP 2 — EVIDENCE: 18% organic demand (for) vs. two entrenched SP competitors + zero local pricing data (against).\nSTEP 3 — RECOMMENDATION: pilot a remote PT-BR support pod in Q3; defer a physical office until hiring/tax data lands. Confidence: MEDIUM.\n\nWHAT WOULD CHANGE MY ANSWER:\n1) pricing-tolerance survey results  2) SP senior-hire salary data  3) tax-structure ruling",
    mid: "Pros: more signups from the region. Cons: competition. Overall it seems like a good idea to expand if done carefully.",
    bad: "Yes! Brazil is a huge market and opening an office there would be very exciting for growth, culture and team morale. Let me know if you'd like a plan!",
  },
};
