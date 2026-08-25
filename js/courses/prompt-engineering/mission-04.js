/* M4 — THE CONTRACT · FORMAT CONTROL (OUTPUT CONTRACT) */
export default {
  code: "M4", name: "THE CONTRACT", skill: "FORMAT CONTROL",
  protocol: { name: "OUTPUT CONTRACT", desc: "If the output has a consumer, specify the contract: exact format, schema, length limits and allowed vocabulary. 'Return JSON, keys X/Y/Z, nothing else' beats 'be concise'." },
  brief: {
    obj: "Engineering wants sentiment tags for the new onboarding screen — machine-parseable, zero cleanup. Their intake spec is below. Honor the contract.",
    data: "CONSUMER : onboarding-service v2\nEXPECTS  : JSON, UTF-8\nMAX TAGS : 6\nSENTIMENT ENUM : positive | neutral | negative",
    note: "Format is not decoration — it's an <b>interface</b>. State the shape, the schema, the caps and the vocabulary, and exclude prose explicitly.",
    criteria: ["valid JSON", "enum values", "≤ 6 tags"],
  },
  slots: [
    { id: "FMT", label: "OUTPUT FORMAT", options: [
      { t: "Format the output so it looks clean, professional and visually appealing, with a nice structure that anyone on the team will enjoy reading.", q: 0, why: "Aesthetics for humans, chaos for parsers — engineering gets prose and writes a parser anyway." },
      { t: "Format it so it looks great when someone opens the file — clean structure, nice presentation, easy on the eyes.", q: 0, why: "Aesthetics for humans, chaos for parsers — engineering gets prose and writes a parser anyway." },
      { t: "Give me a list of the tags.", q: 1, why: "Shape-ish, but no contract — bullets? commas? prose mixed in?" },
      { t: 'Return JSON only: {"tags":[{"label":string,"sentiment":enum}]}. No prose before or after.', q: 2, why: "Schema + exclusion clause. Parseable on the first try." },
    ]},
    { id: "CON", label: "CONSTRAINTS", options: [
      { t: "Be as creative and expressive as you like with tag names — a rich, varied vocabulary makes the output far more useful and interesting for everyone.", q: 0, why: "Creativity here = inconsistent keys and broken filters downstream." },
      { t: "Be creative with the tag names.", q: 0, why: "Creative vocabulary = inconsistent keys and broken filters downstream." },
      { t: "Keep the tags short.", q: 1, why: "'Short' is a mood, not a limit. The model decides for you." },
      { t: "Max 6 tags. Labels ≤ 16 chars, lowercase-hyphenated. Sentiment strictly one of: positive | neutral | negative.", q: 2, why: "Every constraint is numeric or enumerable — nothing left to 'interpret'." },
    ]},
  ],
  outcomes: {
    good: '{\n  "tags": [\n    {"label":"quick-setup","sentiment":"positive"},\n    {"label":"clear-pricing","sentiment":"positive"},\n    {"label":"jargon-heavy","sentiment":"negative"},\n    {"label":"slow-demo-video","sentiment":"neutral"}\n  ]\n}\n\n→ parsed cleanly by onboarding-service · 0 warnings',
    mid: "1. quick-setup (positive)\n2. clear pricing (positive)\n3. Confusing Jargon (kinda negative)\n4. demo video?? (neutral)\n\n→ needs human cleanup before it can be parsed",
    bad: "Absolutely! Here are some lovely tags that capture the vibe of your onboarding:\n\n✨ frictionless-journey · 🚀 delight-loop · 💎 synergy-first · 🌈 wow-moments\n\nHope that helps!",
  },
};
