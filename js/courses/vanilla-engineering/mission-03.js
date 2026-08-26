/* V3 — THE INTERFACE · API DESIGN + lab payments-api (idempotency) */
export default {
  code: "V3", name: "THE INTERFACE", skill: "API DESIGN",
  protocol: { name: "CONTRACTS BETWEEN STRANGERS", desc: "Your API is read by consumers who never read your code — including your own app from 6 months ago. Semantic status codes, idempotency on every money verb, evolution without breakage." },
  brief: {
    obj: "The mobile team reports duplicate charges when the app retries on flaky networks. The payments API already has 'a check' for it — allegedly. Legal is asking questions.",
    data: "ENDPOINT : POST /charges (plain node http)\nSYMPTOM  : same charge twice when mobile retries\nEXISTING : if (req.body.sameCard) dedup-ish check in server.js\nCONSUMER : mobile app v2.4 (auto-retries once after timeout)",
    note: "Networks retry. That's not a bug, it's physics — so money verbs must be <b>idempotent</b>: the consumer supplies a key, the server returns the ORIGINAL result on repeats. Dedup-by-content (same card, same amount) breaks the two-coffees case.",
    criteria: ["retries safe", "status semantics", "no breaking change"],
  },
  lab: {
    folder: "payments-api",
    task: "Make POST /charges safe under retries without breaking the current response shape. The existing 'dedup' check is suspect — investigate it with opencode before trusting it.",
    acceptance: ["2nd POST with same Idempotency-Key returns the SAME charge (same id), not a new one", "two legit identical charges (different keys) both succeed — the two-coffees case", "current 201 response body shape unchanged for new charges; errors use proper status codes (4xx/5xx), never 200"],
    catch: "The existing sameCard check LOOKS like dedup and quietly blocks the two-coffees case (two identical coffees minutes apart = one blocked). And the tempting 'fix' — returning 200 with {error:...} — poisons every client's error handling. Also: the server logs full card numbers; fixing retry while leaving the log is shipping one breach to close another.",
    files: {
      "README.md": "# payments-api\n\nDEMAND (from mobile team): 'we get double charges when we retry after a timeout.'\n\nMake POST /charges retry-safe WITHOUT breaking the response shape used by mobile v2.4.\n\nAcceptance:\n- same Idempotency-Key → same charge id, no second capture\n- different keys, same card+amount → BOTH succeed\n- new charges keep returning 201 with the current body\n- errors: real status codes (never 200-with-error)\n\nTest with: curl -H 'Idempotency-Key: abc' -d '{...}' localhost:3000/charges\n",
      "server.js": "const http = require('http');\nconst crypto = require('crypto');\n\nconst charges = [];  // store\n\nhttp.createServer((req, res) => {\n  if (req.method === 'POST' && req.url === '/charges') {\n    let body = '';\n    req.on('data', c => body += c);\n    req.on('end', () => {\n      const b = JSON.parse(body);\n\n      // existing 'dedup' (added in a hurry last quarter)\n      const last = charges[charges.length - 1];\n      if (last && last.card === b.card && last.amount === b.amount) {\n        res.writeHead(200, { 'content-type': 'application/json' }); // looks safe, isn't\n        return res.end(JSON.stringify(last));\n      }\n\n      const charge = { id: 'ch_' + crypto.randomBytes(6).toString('hex'), card: b.card, amount: b.amount, status: 'captured' };\n      charges.push(charge);\n      console.log('CAPTURED', charge.id, b.card, b.amount); // full card in the log (!)\n      res.writeHead(201, { 'content-type': 'application/json' });\n      res.end(JSON.stringify(charge));\n    });\n    return;\n  }\n  res.writeHead(404); res.end();\n}).listen(3000);\n",
    },
  },
  slots: [
    { id: "DUP", label: "THE RETRY BUG", options: [
      { t: "Accept an Idempotency-Key header: store charge by key; repeats return the stored charge with the original status.", q: 2, why: "Idempotency by consumer-supplied key: deterministic under any retry pattern, and the two-coffees case works (different keys)." },
      { t: "Widen the existing check: block if same card AND amount within 10 minutes — it builds on code that's already there, it's a two-line change, and it directly targets the retry window the mobile team described.", q: 0, why: "Dedup-by-content is a heuristic with victims — the airport coffee, the parking meter, the two subscriptions. Time windows guess; keys know." },
      { t: "Return 409 Conflict when a duplicate is suspected, let the client sort it out — 409 is the semantically correct 'conflicting state' answer, it never double-charges, and sophisticated consumers can handle conflict responses properly.", q: 1, why: "Doesn't duplicate, but the client can't tell 'already paid' from 'conflict' — support tickets with receipts attached." },
      { t: "Make the mobile app stop retrying payments.", q: 0, why: "You can't patch physics (or every consumer ever written). The server must be safe under retry by contract." },
    ]},
    { id: "STAT", label: "STATUS SEMANTICS", options: [
      { t: "201 created (new charge), 200 (idempotent replay), 400 malformed, 401/403 auth, 500 capture failure — the code IS the error contract.", q: 2, why: "Status semantics let every client, proxy and monitor interpret errors without reading your mind." },
      { t: "Always 200 with {error: '...'} in the body — one single parse path for the mobile team, simpler client code, and honestly most internal APIs they've used before worked exactly this way without drama.", q: 0, why: "The classic interface crime: succeeds at HTTP level, fails at business level. Retries, monitors and caches all misbehave." },
      { t: "Use 400 for everything wrong, with a reason field.", q: 1, why: "Better than 200-with-error, but flattens auth vs validation vs server faults — clients can't react appropriately." },
      { t: "Mirror whatever the old v1 endpoints did, for consistency.", q: 0, why: "Consistency with a broken contract multiplies the break. Fix the contract, version the change." },
    ]},
    { id: "EVO", label: "EVOLUTION", options: [
      { t: "Ship the key as optional-additive: old clients work unchanged, retries safe for whoever adopts the header, docs deprecate the content-check.", q: 2, why: "Additive evolution — no consumer breaks, migration is pull-based. The strangers (including old app builds) stay safe." },
      { t: "Require Idempotency-Key immediately on all clients — correctness comes first, the mobile team can ship the header in an emergency patch, and partial adoption means half the double charges anyway.", q: 0, why: "Every v2.4 phone in the field starts failing at once. Correctness shipped brutally is an outage." },
      { t: "Version the endpoint: /v2/charges with keys from day one, deprecate /charges with sunset headers next quarter — versioning is the textbook way to introduce breaking requirements without traumatizing the installed base.", q: 1, why: "Defensible for bigger semantic changes; here an optional header achieves the same with no consumer work." },
      { t: "Rename the field to retryKey while touching it — clearer name, cleaner API.", q: 0, why: "Renaming is breaking. 'Cleaner' for you is a crash loop for every deployed consumer." },
    ]},
  ],
  outcomes: {
    good: "charges with key=abc retried 3× → one capture, one id, replays return 200 with the original body\n• two coffees, different keys: both 201\n• card numbers out of the logs (last4 only)\n→ mobile ships the header next release; legal closes the ticket with the transcript.",
    mid: "retry window widened to 10 min + 409 on suspicion\n• double charges mostly gone; the airport coffee blocked once a week\n• clients can't distinguish replay from conflict — support absorbs the ambiguity",
    bad: "200-with-{error} shipped 'for easier parsing'\n• every monitor green while captures fail silently; retries now double-error\n• card numbers still in logs — the original breach, unfixed, plus a new contract to unwind",
  },
};
