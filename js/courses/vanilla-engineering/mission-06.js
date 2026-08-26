/* V6 — THE BOUNDARIES · ARCHITECTURE + lab erp-mini (tangled monolith) */
export default {
  code: "V6", name: "THE BOUNDARIES", skill: "ARCHITECTURE",
  protocol: { name: "DRAW THE LINES", desc: "Coupling is how many things break when you change one. Modules with contracts, extracted gradually (strangler), on boring tech the whole team can operate." },
  brief: {
    obj: "erp-mini grew into a ball of yarn: billing reaches into shipping internals, a circular import lurks, and every change breaks three places that 'had nothing to do with it'. The team wants a rewrite. The team is wrong — mostly.",
    data: "MODULES  : billing.js, shipping.js, inventory.js, notify.js, index.js\nSYMPTOM  : change shipping rate → billing tests fail\nLURKING  : circular require between billing ↔ shipping\nPROPOSAL : 'rewrite as microservices' (README's own suggestion)",
    note: "The fix is <b>fronteiras</b>, not fôlego: extract the painful island behind an interface, migrate in parts, kill the old gradually. And every new technology enters paying rent: operating it, monitoring it, explaining it.",
    criteria: ["coupling named", "gradual extraction", "complexity budget"],
  },
  lab: {
    folder: "erp-mini",
    task: "Make it possible to change shipping without breaking billing — WITHOUT a big-bang rewrite. The circular import must die.",
    acceptance: ["shipping consumed only through an explicit interface (e.g. shipOrder(items, address) → {rate, eta})", "zero internal-field access from billing into shipping internals", "circular import eliminated — node loads the app cleanly (node index.js runs)", "behavior identical: same outputs for the sample order"],
    catch: "The README (written by an over-eager architect) recommends 'split into microservices with a message queue' — following it turns a 5-file refactor into an infrastructure project with zero boundary discipline learned. The subtle trap: the circular import only manifests as intermittent undefined — tests pass until they randomly don't. And billing reads shipping.RATE_TABLE directly: any 'interface' that keeps that line is a facade, not a boundary.",
    files: {
      "README.md": "# erp-mini\n\nChange a shipping rate, billing tests fail. A circular require hides somewhere.\n\nDEMAND: change shipping WITHOUT breaking billing. No big-bang rewrite.\n\n(The previous architect suggested splitting into microservices with a\nmessage queue. Consider whether that is the actual disease here.)\n\nAcceptance:\n- billing touches shipping ONLY via an explicit interface\n- circular import gone; `node index.js` runs clean\n- same output for the sample order in index.js\n",
      "shipping.js": "const RATES = { DOMESTIC: 8.5, INTERNATIONAL: 42 };\n\nfunction rateFor(zone) {\n  if (billing.isWholesale()) return RATES[zone] * 0.5;   // circular reach-back\n  return RATES[zone];\n}\n\nmodule.exports = { RATES, rateFor };\n",
      "billing.js": "const shipping = require('./shipping');\n\nconst WHOLESALE = true;\n\nfunction invoice(order) {\n  const rate = shipping.rateFor(order.zone);\n  const total = order.subtotal + rate + shipping.RATES[order.zone] * 0; // reads internals\n  return { total, rate, wholesale: WHOLESALE };\n}\n\nmodule.exports = { invoice, isWholesale: () => WHOLESALE };\n",
      "inventory.js": "function check(items) { return items.every(i => i.qty > 0); }\nmodule.exports = { check };\n",
      "notify.js": "function sent(invoice) { console.log('notified', invoice.total); }\nmodule.exports = { sent };\n",
      "index.js": "const { invoice } = require('./billing');\nconst inventory = require('./inventory');\nconst notify = require('./notify');\n\nconst order = { zone: 'DOMESTIC', subtotal: 100, items: [{ sku: 'X', qty: 2 }] };\nif (inventory.check(order.items)) {\n  const inv = invoice(order);\n  notify.sent(inv);\n  console.log(JSON.stringify(inv));  // expected: {\"total\":104.25,...}\n}\n",
    },
  },
  slots: [
    { id: "COUP", label: "THE DIAGNOSIS", options: [
      { t: "High coupling: billing reads shipping internals (RATES) and shipping calls back into billing — a cycle. The boundary between them doesn't exist.", q: 2, why: "Naming the disease precisely: coupling + the cycle. The symptom (rate change breaks billing) follows mechanically from it." },
      { t: "The code is old and messy — it clearly needs a full rewrite on a modern stack, and with AI assistance the rewrite would take weeks, not months, which finally makes it affordable to do it right.", q: 0, why: "'Messy' is a mood, not a diagnosis. A rewrite without boundaries rebuilds the same coupling in newer syntax." },
      { t: "Monoliths are the problem; microservices are the cure — every company at scale split their monolith, the pattern is industry-proven, and the pain we feel on every shipping change is exactly the pain that architecture eliminates.", q: 0, why: "Distribution moves the coupling onto the network and adds ops. The disease was missing boundaries — you can have them in-process." },
      { t: "Shipping code has no tests, that's why changes break things.", q: 1, why: "True and useful — but tests catch the symptom AFTER the touch. The boundary prevents the blast radius from existing." },
    ]},
    { id: "MOVE", label: "THE EXTRACTION", options: [
      { t: "Define shipOrder(items, address) → {rate, eta} as the only door; pass wholesale in as a parameter; kill the back-call; migrate callers one at a time.", q: 2, why: "Strangler-style: contract first, cycle broken by inverting the dependency (data in, data out), gradual migration with tests green at each step." },
      { t: "Freeze shipping.js and build shipping-v2.js next to it; switch over when v2 is 'complete'.", q: 1, why: "Half-right instinct (parallel build) — but without an explicit contract, v2 usually imports the same internals and the yarn doubles." },
      { t: "Extract everything into services with a message queue between billing and shipping — the README itself recommends it, and decoupled services are how serious companies scale teams independently.", q: 0, why: "Pays infrastructure rent (broker, retries, tracing) to solve a problem two function signatures solve. Complexity budget: spent on nothing." },
      { t: "Move RATES into a shared constants file both modules import.", q: 0, why: "Shared mutable junk-drawer = coupling with more steps. Now THREE modules break when the table changes shape." },
    ]},
    { id: "CHC", label: "TECH CHOICE", options: [
      { t: "Plain node modules and function calls — boring, everyone on the team can read, debug and operate it tomorrow.", q: 2, why: "Complexity budget honored: the problem was boundaries, the solution is a signature. Boring tech is a feature: it never pages you." },
      { t: "Add a service mesh and per-module containers now, ready for scale — infrastructure-first is how you avoid paying the migration tax twice, and the operations team will eventually need these primitives anyway.", q: 0, why: "Paying rent on infrastructure for a load that doesn't exist — every deploy, alert and on-call rotation got heavier, zero boundary learned." },
      { t: "Polyglot: rewrite shipping in Rust for speed, keep billing in node — the AI can scaffold the Rust side in an afternoon, and the performance ceiling of a compiled runtime is exactly what a rate engine wants.", q: 0, why: "Two runtimes, two toolchains, one FFI seam — for a rate lookup table. The 'AI suggested it' era's signature move." },
      { t: "Event sourcing: every rate change is an immutable event; billing replays them.", q: 1, why: "Legit pattern for audit-heavy domains — massive conceptual cost for this one. Possible ≠ appropriate." },
    ]},
  ],
  outcomes: {
    good: "sprint ends — shipping.js: one door (shipOrder), zero reach-backs\n• cycle dead; node index.js loads clean; same output {\"total\":104.25}\n• billing's RATES import deleted in a 12-line diff\n→ next rate change: 1 file, 0 surprises. The architect's queue proposal archived with a note.",
    mid: "shipping-v2.js exists beside the old one\n• new callers use it; billing still imports RATES 'temporarily'\n• the cycle persists through a helper nobody mapped\n→ progress, but the boundary is a door still half off its hinges.",
    bad: "quarter ends — 'erp-micro' platform: 4 services, a queue, a docker-compose nobody fully understands\n• same RATES import, now over HTTP\n• intermittent cycle bug became an intermittent network bug\n→ the team rewrote the house because a door was stuck.",
  },
};
