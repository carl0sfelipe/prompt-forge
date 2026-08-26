/* V7 — THE BREACH · SECURITY + lab uploads (traversal/key/xss) */
export default {
  code: "V7", name: "THE BREACH", skill: "SECURITY",
  protocol: { name: "TRUST BOUNDARIES", desc: "Every input is hostile until validated — including AI-generated code. Secrets never cross into repos or logs; dependencies are a supply chain; access is least-privilege." },
  brief: {
    obj: "uploads/ goes live Friday. It 'has security' — there's even a validation check in the code. Audit it like someone who has read the incident post-mortems, because you'll be writing one otherwise.",
    data: "SERVICE  : uploads (node) — receives files, lists them back\nCLAIMS   : 'input validation present' (validateName in server.js)\nLAUNCH   : Friday, public internet\nSCOPE    : also review config.js and package habits",
    note: "The three classics the era keeps shipping: <b>path traversal</b> (../ in a filename), <b>secrets in code</b>, <b>unescaped output</b> (XSS). A length check is not sanitization — close is not closed.",
    criteria: ["traversal closed", "secrets out", "output escaped"],
  },
  lab: {
    folder: "uploads",
    task: "Audit the service with opencode — attack it like an outsider (write the proof-of-concept requests), then fix. 'Has validation' is a claim; verify it.",
    acceptance: ["GET /files/../../etc/passwd returns 403/404 — never file contents (PoC request included in your notes)", "no secret in any repo file; key moves to env with a rotation note; .env.example documents it", "filenames in the HTML listing are HTML-escaped (PoC: name with <script> renders as text)", "dependencies: lockfile committed, no unused packages added while fixing"],
    catch: "validateName looks like sanitization but only checks LENGTH — '../..' passes beautifully. The path.join resolves it: classic traversal. Second layer: the API key sits in config.js (committed), and the listing endpoint injects filenames into HTML unescaped (XSS via uploaded filename). Fixing one and shipping Friday still leaves two open doors — the audit was the test.",
    files: {
      "README.md": "# uploads\n\nFile upload service. Launches Friday on the public internet.\n\nDEMAND: security audit before launch. Attack first (write the PoC\nrequests), then fix. The code 'already has validation' — verify.\n\nAcceptance:\n- ../ traversal: closed (PoC in notes)\n- secrets: out of the repo, env-based, rotation noted\n- listing output: escaped (PoC with <script> filename renders as text)\n- lockfile committed; no new deps to fix old ones\n",
      "server.js": "const http = require('http');\nconst fs = require('fs');\nconst path = require('path');\nconst { API_KEY } = require('./config');\n\nconst UPLOADS = path.join(__dirname, 'files');\n\nfunction validateName(name) {\n  return typeof name === 'string' && name.length > 0 && name.length < 120; // 'validation'\n}\n\nhttp.createServer((req, res) => {\n  const url = new URL(req.url, 'http://x');\n\n  if (url.pathname.startsWith('/files/')) {\n    const name = decodeURIComponent(url.pathname.slice(7));\n    if (!validateName(name)) { res.writeHead(400); return res.end('bad name'); }\n    const full = path.join(UPLOADS, name);              // traversal passes here\n    if (!fs.existsSync(full)) { res.writeHead(404); return res.end('nf'); }\n    res.writeHead(200, { 'content-type': 'text/html' });\n    return res.end('<h1>file:</h1><p>' + name + '</p>'); // XSS: raw injection\n  }\n\n  if (url.pathname === '/health') {\n    console.log('health check with key', API_KEY);       // key into logs\n    return res.end('ok');\n  }\n  res.writeHead(404); res.end();\n}).listen(8080);\n",
      "config.js": "// TODO: rotate before launch (leaked in a screenshot last month)\nmodule.exports = { API_KEY: 'sk_live_9f3ac2NEXTQ57199' };\n",
      "files/hello.txt": "hello from the uploads folder\n",
    },
  },
  slots: [
    { id: "TRA", label: "THE TRAVERSAL", options: [
      { t: "Resolve the path, then verify it's still inside UPLOADS (realpath prefix check) and reject anything else — with a PoC curl proving ../../etc/passwd now 403s.", q: 2, why: "Canonicalize-then-contain: the only traversal fix that survives URL-encoding, symlinks and creative decodings. Plus proof." },
      { t: "Strip '../' sequences from the name before joining — it directly removes the exact pattern attackers use, it's a one-line fix we can ship before Friday, and there's no need to over-engineer a file listing endpoint.", q: 0, why: "Blacklist whack-a-mole: '..\\', '%2e%2e%2f', double-encoding and unicode lookalikes each get a turn. Strip-lists lose." },
      { t: "Keep validateName but add a regex whitelist: [a-zA-Z0-9.-] only.", q: 1, why: "Solid defense — rejects the attack class. Still pair with the prefix check: defense in depth on trust boundaries." },
      { t: "The length check already validates input; add rate limiting instead.", q: 0, why: "Rate limiting throttles attackers; it doesn't close the hole. They'll just wait. 'Validated' that isn't is the breach's favorite costume." },
    ]},
    { id: "SEC", label: "THE SECRET", options: [
      { t: "Key to an env var, purge from history (filter-repo), rotate it, document in .env.example, add a pre-commit secret scan.", q: 2, why: "Full lifecycle: out of code, out of history, invalidated (rotation — the leak is only dead when the key is), and mechanized against recurrence." },
      { t: "Move to a .env file and add .env to .gitignore — the industry-standard hygiene for secrets, it stops future commits from leaking the key, and takes two minutes to implement before the Friday launch.", q: 1, why: "Stops the bleed forward — but the key remains in git history and in that screenshot. Unrotated leaked key = still-live key." },
      { t: "It's an internal service behind the firewall anyway — leave the key where it is and spend the remaining hours on the launch demo, internal tooling has never been in scope for the security review.", q: 0, why: "'Internal' shrinks the blast radius, doesn't erase it (one SSRF/phish/laptop later, the key is public). Perimeter thinking that ages badly." },
      { t: "Obfuscate it: base64 the key in config.js so it's not readable.", q: 0, why: "Encoding is not encryption — the AI-era's favorite non-fix. Reversible in one command, in the same repo." },
    ]},
    { id: "LOG", label: "THE OUTPUT & LOGS", options: [
      { t: "Escape filenames for HTML context in the listing; drop the API key from the health log (log events, never secrets).", q: 2, why: "Two doors closed: XSS via filename dies with proper escaping; logs stop being a credential harvesting ground." },
      { t: "Serve the listing as JSON instead of HTML — no page, no XSS.", q: 1, why: "Genuinely reduces surface (browsers won't execute JSON) — as long as consumers also treat it as data, not as HTML strings." },
      { t: "Sanitize the filename on upload: reject names containing < or >.", q: 0, why: "The blacklist again — quotes, backticks, event handlers and encoding round-trips get through. Escape at the OUTPUT boundary where context is known." },
      { t: "Logging the key in health checks is fine — logs are internal infrastructure, nobody outside the team has access to them, and being able to correlate health events with the active key saves real debugging time.", q: 0, why: "Logs are copied to dashboards, shipped to vendors, grepped by tools and read during incidents — the widest internal distribution list you have." },
    ]},
  ],
  outcomes: {
    good: "Thursday review — three PoCs attached: traversal 403, <script> renders as text, health log keyless\n• key rotated + history purged + pre-commit scan wired\n• lockfile committed, zero new deps\n→ Friday launch: quiet. The best kind.",
    mid: "Friday 23:00 — traversal closed via regex whitelist\n• key moved to .env — same key, same history, same screenshot\n• XSS forgotten in the rush\n→ open door count: still 2. On the internet. Overnight.",
    bad: "Monday incident — ../etc/passwd served as HTML, <script> filename executed on the admin's browser, key found in logs by the scraper\n• 'but validateName was in place' — says the post-mortem's saddest line\n→ the screenshot leak and the code leak met in the middle.",
  },
};
