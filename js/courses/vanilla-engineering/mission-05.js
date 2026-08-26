/* V5 — THE PROOF · TESTING + lab cart (weak green suite) */
export default {
  code: "V5", name: "THE PROOF", skill: "TESTING",
  protocol: { name: "TESTS ARE THE SPEC", desc: "In the AI era the suite is the only thing that decides whether 'looks right' IS right. Test behavior on the money paths; green means nothing if the tests test nothing." },
  brief: {
    obj: "Cart v2 must ship Monday. An AI refactor is queued to 'clean up' the module. The existing suite is green and everyone feels safe — it shouldn't.",
    data: "MODULE   : cart.js (totals, coupons, bulk discount)\nSUITE    : test.js — 3 tests, all passing\nQUEUE    : AI refactor of cart.js scheduled before release\nKNOWN    : support has 2 tickets of 'weird totals' with coupons",
    note: "A green suite proves nothing about what it <b>doesn't</b> assert. Tautological tests (expecting what the code returns) are the AI-era's most reassuring lie. Write tests that could FAIL — against the spec, not the code.",
    criteria: ["tests can fail", "money paths covered", "refactor gate"],
  },
  lab: {
    folder: "cart",
    task: "Before the AI refactor runs, make the suite trustworthy: find what the green tests are hiding. There IS a real bug in cart.js — the weird-totals tickets are real.",
    acceptance: ["new tests assert SPEC values (computed by hand), not values copied from the current output", "the existing bug is caught by a red test, then fixed, then green", "AI refactor only merges with the suite green before AND after", "the tautological tests rewritten or deleted, with a note why"],
    catch: "The green suite tests nothing: it asserts cart.js's own output against itself. The real bug: coupon + bulk discount compound (10% off already-discounted bulk price) — support's 'weird totals'. If you point the AI at 'refactor and add tests', it happily generates more tautologies around the broken behavior and everything stays green while customers keep paying wrong.",
    files: {
      "README.md": "# cart\n\nCart v2 ships Monday. An AI refactor of cart.js is queued.\n\nDEMAND: make the suite trustworthy BEFORE the refactor runs.\n\nAcceptance:\n- tests assert hand-computed spec values (not current-output echoes)\n- the real bug behind the 2 support tickets: caught red, fixed, green\n- refactor merges only with suite green before AND after\n\nGround truth for one case: 3 × 20.00, coupon SAVE10, bulk≥3 (10%) →\nsubtotal 60.00 → bulk → 54.00 → coupon → 48.60 (NOT 43.74).\n",
      "cart.js": "const BULK_MIN = 3, BULK_RATE = 0.10, COUPONS = { SAVE10: 0.10 };\n\nfunction total(items, coupon) {\n  let subtotal = 0;\n  for (const it of items) subtotal += it.qty * it.unit;\n  let t = subtotal;\n  if (items.reduce((a, i) => a + i.qty, 0) >= BULK_MIN) t = t * (1 - BULK_RATE);\n  if (coupon && COUPONS[coupon]) {\n    t = t * (1 - COUPONS[coupon]);\n    t = t * (1 - COUPONS[coupon]);   // bug: coupon applied twice\n  }\n  return Math.round(t * 100) / 100;\n}\n\nmodule.exports = { total };\n",
      "test.js": "const { total } = require('./cart');\nconst assert = require('assert');\n\n// \"suite verde\" — 3 tests, all passing:\nconst got = total([{ qty: 3, unit: 20 }], 'SAVE10');\nassert.strictEqual(got, total([{ qty: 3, unit: 20 }], 'SAVE10'));  // tautology\nassert.strictEqual(typeof got, 'number');                           // type, not behavior\nassert.ok(got >= 0);                                                // always true\n\nconsole.log('test.js: 3 passing');\n",
    },
  },
  slots: [
    { id: "WHAT", label: "WHAT TO TEST", options: [
      { t: "The money paths with hand-computed values: bulk, coupon, coupon+bulk combo, zero and rejection cases.", q: 2, why: "Behavior of the business rules, asserted against spec numbers a human derived. The combo case is exactly where the bug lives." },
      { t: "100% line coverage of cart.js — every branch executed at least once, because coverage is the number QA tracks and 'fully covered' is the definition of a module we can refactor with confidence.", q: 0, why: "Coverage measures execution, not assertion. You can execute a branch and assert nothing — green, covered, wrong." },
      { t: "Snapshot tests: record the current output once, fail on any future change — cheap to generate, they lock today's behavior as the reference, and the suite grows automatically as the module evolves.", q: 1, why: "Catches drift, but blesses current behavior as spec — a snapshot of the bug is a notarized bug." },
      { t: "Property tests: random carts, assert total ≤ subtotal always.", q: 0, why: "Elegant and true — and blind to the exact compounding bug (43.74 ≤ 54 passes). Randomness can't replace spec cases on money paths." },
    ]},
    { id: "SAFE", label: "THE AI REFACTOR GATE", options: [
      { t: "Suite green before the refactor, AI refactors, suite green after — and the spec cases are the same hand-computed numbers.", q: 2, why: "The gate that turns vibe into engineering: same behavior proven by spec-assertions, not by the diff looking clean." },
      { t: "Let the AI also regenerate the tests after refactoring — fresh tests for fresh code, written together, always in sync, and it saves the team a full day of updating expectations by hand.", q: 0, why: "Tests rewritten by the same author that wrote the code adapt to the bug. The fox guards the henhouse, green-ly." },
      { t: "Run the refactor on a branch; if the diff reads well, merge.", q: 1, why: "Readable diff ≠ same behavior. Reading catches some, the suite catches all — that's its job." },
      { t: "Skip the refactor this cycle — it's risky before a release.", q: 0, why: "Defensible as a call, but it dodges the skill: the gate exists so refactors CAN ship safely, forever, not never." },
    ]},
    { id: "FLAK", label: "THE FLAKY TEST", options: [
      { t: "Quarantine it same-day, find the root cause (usually hidden state, time or order), fix, un-quarantine with a note.", q: 2, why: "Flakiness is a bug of the test or the system — either way it's information. Quarantine keeps the signal honest while you fix the cause." },
      { t: "Re-run until it passes — the pipeline is green, the ticket moves, and honestly intermittent failures in test environments are a fact of life that every senior engineer learns to route around.", q: 0, why: "Maquiagem: each re-run teaches the team that red means 'retry', until the day red means production is burning." },
      { t: "Delete the flaky test; it's hurting velocity.", q: 0, why: "Deleting the smoke detector because it's loud. The intermittent failure usually guards an intermittent bug." },
      { t: "Mark it as skipped with a TODO comment for later.", q: 1, why: "Honest-ish — but 'later' arrives after the incident, and the suite no longer counts what it doesn't run." },
    ]},
  ],
  outcomes: {
    good: "Monday 10:00 — v2 shipped\n• spec tests: 9 cases incl. the combo (48.60, not 43.74) — caught red, fixed, green\n• tautologies deleted with a note; AI refactor merged behind the green gate\n• support's 2 tickets root-caused: double coupon\n→ 'weird totals' searches in Slack: zero this week.",
    mid: "Monday 22:00 — shipped\n• refactor merged on a clean-looking diff; bug still there\n• new snapshot tests bless the wrong output at 43.74\n→ the tickets keep coming, now with test coverage of the bug.",
    bad: "Tuesday — halted release\n• AI generated 12 fresh tautologies; suite 15-green and meaningless\n• coupon bug doubled a customer discount; finance noticed first\n→ the suite everyone trusted was the reason nobody checked anything.",
  },
};
