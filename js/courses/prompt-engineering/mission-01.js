/* M1 — THE FOG · SPECIFICITY (S.P.E.C. PROTOCOL)
   Authoring contract: exactly one q2, one q1, two q0 per slot.
   At least one q0 must be LONGER than the q2 — length is never a tell. */
export default {
  code: "M1", name: "THE FOG", skill: "SPECIFICITY",
  protocol: { name: "S.P.E.C. PROTOCOL", desc: "Never ship a vague request. Specify Subject, Purpose, Extent and Constraints — the model optimizes exactly what you say, not what you mean." },
  brief: {
    obj: "Your lead wants an email announcing 'Launchpad', your team's new one-click deploy feature, to existing customers. Last attempt came back as generic mush. Kill the fog.",
    data: "PRODUCT : Launchpad\nWHAT    : one-click deploy to any cloud\nWHO     : existing customers (SaaS teams)\nBENEFIT : deploy time 45 min → 90 seconds\nLAUNCH  : Nov 12\nCTA     : \"Try it on your next release\"",
    note: "Vagueness collapses when you state <b>Subject · Purpose · Extent · Constraints</b>. Every detail you omit is a decision you hand to chance.",
    criteria: ["120 words", "email format", "uses the facts", "time-saved angle"],
  },
  slots: [
    { id: "TASK", label: "TASK CORE", options: [
      { t: "Write something truly compelling and high-impact about Launchpad that really showcases how innovative and game-changing it is for our customers.", q: 0, why: "Buzzwords stacked on buzzwords — high energy, zero information. The model will match your vagueness with enthusiasm." },
      { t: "Write something cool about Launchpad.", q: 0, why: "No subject, no purpose — the model guesses, and guesses generic." },
      { t: "Write an announcement about our new deploy feature.", q: 1, why: "Right direction, but audience, length and angle are still left to luck." },
      { t: "Write a 120-word announcement email to existing customers introducing Launchpad, leading with the 45min → 90s stat.", q: 2, why: "Subject + purpose + extent + angle. Zero room left to guess." },
    ]},
    { id: "AUD", label: "AUDIENCE + GOAL", options: [
      { t: "Write it for everyone — customers, prospects, partners, internal teams — anyone who might care. Keep the tone fun and broadly appealing.", q: 0, why: "'Everyone' is no one. A prompt aimed at all audiences produces mush for every audience." },
      { t: "Write it for absolutely everyone — customers, prospects, partners and the whole wide world — keep it fun, light and super casual.", q: 0, why: "'Everyone' is no one. A prompt aimed at all audiences produces mush for every audience." },
      { t: "Write it for technical teams.", q: 1, why: "Audience named, but no desired outcome — what should they do after reading?" },
      { t: "Audience: SaaS engineering leads drowning in release chores. Goal: they try Launchpad on their next release.", q: 2, why: "Audience + intended behavior. Now the prompt can actually aim." },
    ]},
  ],
  outcomes: {
    good: "Subject: Ship in 90 seconds — Launchpad is here\n\nYou've shipped with us for a while, so we'll be brief: deploys that took you 45 minutes now take 90 seconds.\n\nLaunchpad — our new one-click deploy — goes live Nov 12. Same pipeline, zero YAML, one button.\n\n→ Try it on your next release.",
    mid: "Introducing Launchpad!\n\nWe're excited to announce our new deploy feature. It helps teams ship faster and improves your workflow in many ways. Launchpad is easy to use and powerful.\n\nTry it today!",
    bad: "Sure! Here is something about Launchpad:\n\nLaunchpad is an innovative next-generation solution leveraging cloud-native synergies to empower stakeholders across the deployment paradigm. In today's fast-paced digital landscape, Launchpad revolutionizes the journey...",
  },
};
