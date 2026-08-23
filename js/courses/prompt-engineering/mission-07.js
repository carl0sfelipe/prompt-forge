/* MT — MASTER TRIAL · THE FULL-STACK PROMPT (final exam) */
export default {
  code: "MT", name: "MASTER TRIAL", skill: "FULL-STACK PROMPT",
  protocol: { name: "THE FULL-STACK PROMPT", desc: "Persona + task + grounded data + format + constraints + reasoning — assembled as one contract. This is what professional prompt engineering looks like in production." },
  brief: {
    obj: "CERTIFICATION TRIAL. 03:42 AM: checkout is down. The CTO wants (1) a 4-sentence incident summary for executives and (2) a numbered fix list for engineers — one prompt, built from the log below.",
    data: "03:41:02 ERROR payment-gw timeout after 30s (stripe-api)\n03:41:07 WARN  retry queue depth: 1,204\n03:42:11 ERROR 502 spike /checkout (p99 29.8s)\n03:43:40 INFO  deploy #4471 by j.alves — payments-service v2.3.1\n03:44:02 ERROR circuit-breaker OPEN on payments-service\n03:47:19 INFO  rollback initiated by on-call",
    note: "Everything at once: <b>persona, task, grounding, format, constraints, reasoning</b>. Write the prompt you'd trust at 3 AM.",
    criteria: ["2 deliverables", "cited timestamps", "no speculation as fact"],
  },
  slots: [
    { id: "ROLE", label: "PERSONA", options: [
      { t: "Act as a brilliant full-stack engineer and technical leader with deep expertise across the entire stack, from cloud infrastructure to product strategy.", q: 0, why: "Impressive résumé, wrong job. No incident discipline, no audience awareness." },
      { t: "Act as a developer.", q: 0, why: "No specialty, no stance — you'll get generic debugging chatter." },
      { t: "Act as an engineer who's good at explaining things.", q: 1, why: "Friendly, but vague — no incident discipline, no audience awareness." },
      { t: "Act as a senior SRE running incident response: factual, timeline-driven, blameless.", q: 2, why: "The exact expertise and professional stance this deliverable needs." },
    ]},
    { id: "TASK", label: "TASK CORE", options: [
      { t: "Investigate everything about this incident thoroughly — root cause, contributing factors, customer impact, business implications and long-term prevention strategy.", q: 0, why: "Sounds thorough, defines no deliverable — the model picks its own shape and depth." },
      { t: "Figure out what happened.", q: 0, why: "No deliverable defined — the model picks its own shape." },
      { t: "Explain the outage.", q: 1, why: "One blurry deliverable; executives and engineers have different needs." },
      { t: "Two deliverables: (a) a 4-sentence incident summary for executives; (b) a numbered fix list for engineers.", q: 2, why: "Two named outputs, two named audiences. Nothing to guess." },
    ]},
    { id: "CTX", label: "CONTEXT", options: [
      { t: "Draw on your knowledge of production payment systems, gateway behavior and typical failure modes to reconstruct what most likely happened here.", q: 0, why: "Invites fabrication from priors — a confident story about someone else's outage." },
      { t: "The logs are in Grafana if you need them.", q: 0, why: "The model has no browser and no Grafana. It will fabricate." },
      { t: "I'll paste the important lines right after this sentence.", q: 1, why: "Good instinct, weak fence — 'important' is your filter, not a verbatim boundary." },
      { t: "Use only the log provided below, fenced between <log> and </log>. Cite the timestamp for every claim.", q: 2, why: "Grounded, fenced, and every claim becomes verifiable." },
    ]},
    { id: "FMT", label: "FORMAT", options: [
      { t: "Structure the response beautifully — clear sections, headings and visual hierarchy — so it's easy to scan for everyone from executives to on-call engineers.", q: 0, why: "Decoration for every audience serves no audience; engineering still can't consume it." },
      { t: "Whatever is clearest.", q: 0, why: "Delegating format is delegating the interface. Chaos ensues." },
      { t: "Use bullet points.", q: 1, why: "A shape, not a contract — lengths, jargon and structure still float." },
      { t: "Summary: plain prose, no jargon, max 4 sentences. Fix list: numbered, each item = ACTION + LOG EVIDENCE.", q: 2, why: "Every output has an explicit, checkable contract." },
    ]},
    { id: "CON", label: "CONSTRAINTS", options: [
      { t: "Include every detail and observation you can extract from the log, however small — in an incident, complete information always matters more than brevity.", q: 0, why: "At 3 AM, noise costs hours. Everything = nothing prioritized." },
      { t: "Mention everything, just in case.", q: 0, why: "Unprioritized volume — the CTO reads ten lines to find one fact." },
      { t: "Keep it short.", q: 1, why: "Relative limits are no limits — short compared to what?" },
      { t: "State only what the log proves. Mark any speculation explicitly as HYPOTHESIS.", q: 2, why: "Fact and speculation stay separable — safe to forward to the CTO." },
    ]},
    { id: "RSN", label: "REASONING", options: [
      { t: "Analyze this like a detective — follow every lead and hunch to its conclusion before answering, and have full confidence in your final conclusions.", q: 0, why: "Hunch-chasing with mandated confidence — the opposite of an auditable incident chain." },
      { t: "Give me your best first guess.", q: 0, why: "First guesses at 3 AM start wars in post-mortems." },
      { t: "Think carefully about it.", q: 1, why: "Invisible effort — you can't audit 'carefully'." },
      { t: "Reconstruct the timeline first, then identify the trigger event, then propose fixes ordered by impact.", q: 2, why: "An auditable chain: timeline → trigger → fixes. Order implies priority." },
    ]},
  ],
  outcomes: {
    good: "EXECUTIVE SUMMARY\nCheckout was down from 03:41 to ~03:47 due to payment-service timeouts reaching the gateway. The trigger correlates with deploy #4471 (payments-service v2.3.1) at 03:43:40. On-call rollback restored service by 03:47. No evidence in the log of customer data impact.\n\nFIX LIST (ENGINEERING)\n1. Gate payments-service deploys behind a canary + automated rollback test — ev. 03:43:40, 03:47:19\n2. Lower payment-gw timeout below 30s and alert on retry-queue depth > 500 — ev. 03:41:02, 03:41:07\n3. Add checkout p99 SLO alert ahead of 502 spikes — ev. 03:42:11\n\nHYPOTHESIS: v2.3.1 introduced a blocking call — verify with release diff.",
    mid: "The outage was probably caused by a deploy. Rollback fixed it. Engineers should check the payments service and maybe be more careful next time. Executives: it's fine now.",
    bad: "It looks like your servers might be overloaded! I recommend restarting everything and checking your cloud provider's status page. It could also be DNS, a misconfigured firewall, or possibly a cyberattack. Good luck!",
  },
};
