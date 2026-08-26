/* V1 — THE MACHINE · RUNTIME LITERACY + lab clinic-sync */
export default {
  code: "V1", name: "THE MACHINE", skill: "RUNTIME LITERACY",
  protocol: { name: "MEASURE, THEN MOVE", desc: "Software runs on a machine: RAM, disk, network. Diagnose in order — reproduce, measure, isolate the layer, fix the cause. A hunch optimized is still a hunch." },
  brief: {
    obj: "Ops reports the nightly patient import 'takes forever'. Rewrite requests are piling in. Before anyone touches architecture, someone needs to know WHERE the time actually goes.",
    data: "SERVICE  : clinic-sync (python, no frameworks)\nINPUT    : patients.csv (~50k rows in prod, 200-row sample included)\nSYMPTOM  : full import ≈ 10 min in production\nSLA      : under 30s for 50k rows",
    note: "Latency literacy: RAM ~100ns, SSD read ~100µs, network hop ~1–5ms. One wasted O(n²) pass dwarfs any language choice. Measure before believing any story — including the AI's.",
    criteria: ["profile or timing evidence", "fix the dominant cost", "output identical"],
  },
  lab: {
    folder: "clinic-sync",
    task: "The import is slow. Work the demand with opencode, find the REAL cost, fix it — and prove the output is identical.",
    acceptance: ["import of 50k-equivalent load completes < 30s (reasoned or measured)", "row-by-row output identical to the original script", "no behavior change: same rejects file, same log lines"],
    catch: "The seductive fix is 'rewrite it in Go/add threads'. The actual dominators: a list-scan lookup inside the loop (O(n²)) and the DB connection re-opened per row. Also: README says 50k, the sample has 200 — did you test the scaling assumption or just the sample?",
    files: {
      "README.md": "# clinic-sync\n\nNightly import of patients into the clinic system.\n\nDEMAND: production import of ~50,000 rows takes ~10 minutes. Make it fast. The business suggests 'maybe rewrite it in a faster language'.\n\nAcceptance:\n- < 30s for a 50k-row load\n- output identical (imported.txt, rejects.txt)\n- no behavior change\n\nA 200-row sample is in data/. The nightly job runs at 02:00.\n",
      "import.py": "import csv, time, sqlite3\n\nDB = \"clinic.db\"\n\ndef existing_patients(conn):\n    rows = conn.execute(\"SELECT mrn FROM patients\").fetchall()\n    return [r[0] for r in rows]\n\ndef import_patients(path):\n    log = open(\"imported.txt\", \"w\")\n    rej = open(\"rejects.txt\", \"w\")\n    conn = sqlite3.connect(DB)\n    known = existing_patients(conn)\n    with open(path) as f:\n        for row in csv.DictReader(f):\n            conn = sqlite3.connect(DB)   # fresh connection per row\n            mrn = row[\"mrn\"]\n            if mrn in known:             # list scan: O(n) per row -> O(n^2) total\n                rej.write(f\"{mrn},duplicate\\n\")\n                continue\n            if not row[\"name\"].strip():\n                rej.write(f\"{mrn},invalid\\n\")\n                continue\n            conn.execute(\"INSERT INTO patients (mrn, name) VALUES (?,?)\", (mrn, row[\"name\"]))\n            known.append(mrn)\n            log.write(f\"{mrn},ok\\n\")\n            conn.commit()\n    conn.close()\n\nif __name__ == \"__main__\":\n    t0 = time.time()\n    import_patients(\"data/patients.csv\")\n    print(f\"done in {time.time()-t0:.1f}s\")\n",
      "data/patients.csv": "mrn,name\nM001,Ada Lovelace\nM002,Grace Hopper\nM003,\nM004,Alan Turing\nM005,Katherine Johnson\nM002,Grace Hopper\n",
    },
  },
  slots: [
    { id: "DIAG", label: "FIRST INSTRUMENT", options: [
      { t: "Rewrite import.py in Go — everyone knows Python is the problem, and the business already suggested a faster language anyway.", q: 0, why: "Language feelings are not measurements. A rewrite keeps the O(n²) and the per-row connection — now in Go." },
      { t: "Time each stage with a quick counter around the loop, and cProfile on the sample before changing anything.", q: 2, why: "Reproduce and measure first. Ten minutes of profiling names the dominant cost with evidence." },
      { t: "Check server CPU usage during the job.", q: 1, why: "Better than guessing — but CPU tells you it's busy, not WHERE. Profile the code path." },
      { t: "Ask ops for the exact production CSV to test locally with the real size.", q: 0, why: "Production data on a laptop breaks the perimeter (cap. 6). Generate a synthetic 50k file instead." },
    ]},
    { id: "FIX", label: "THE FIX", options: [
      { t: "Replace the known-list scan with a set (hash lookup) and open ONE connection for the whole run, committing in batches.", q: 2, why: "Kills both measured dominators: O(n²)→O(n) and per-row connection overhead. Same behavior, ~100× faster." },
      { t: "Add multiprocessing with 8 workers splitting the CSV — parallelism is the standard answer for slow batch jobs, and the server has plenty of idle cores during the night window anyway.", q: 0, why: "Parallelizing an O(n²) scan and per-row connects multiplies the waste — and adds duplicate-insert races." },
      { t: "Move the lookup to SQL: SELECT ... WHERE mrn=? per row — the database has indexes for exactly this kind of thing, it's the conventional place for lookups to live, and it removes the in-memory list entirely.", q: 1, why: "Works, but keeps a per-row round trip — query-per-row is the same disease in a different organ." },
      { t: "Rewrite in Go with a map for lookups.", q: 0, why: "The map part is right — the rewrite is unmeasured cost, new review surface and zero evidence it was the language." },
    ]},
    { id: "VER", label: "VERIFYING", options: [
      { t: "Run old and new versions on the same input, diff imported.txt and rejects.txt line by line, then load-test with a generated 50k file.", q: 2, why: "Identity of output + scale test = the acceptance criteria, proven instead of promised." },
      { t: "The unit tests still pass, so the refactor is safe.", q: 0, why: "There were no tests — and even green suites don't prove output identity across a perf refactor." },
      { t: "Run once on the 200-row sample — fast enough means done.", q: 1, why: "Sample proves nothing about 50k: O(n²) is exactly the cost that hides at small n." },
      { t: "Ship behind a flag at 02:00 and watch the logs live; roll back if it's still slow — production is where the real data lives, so that's where the real test belongs, and the flag keeps it reversible.", q: 0, why: "Production is not the first instrument. You'd be debugging at 2 AM what a diff would have caught at 2 PM." },
    ]},
  ],
  outcomes: {
    good: "02:01 — import done in 14s (50k rows)\n• profile evidence: 71% list-scan, 24% connection churn\n• fix: set lookup + single connection + batched commits\n• diff old-vs-new outputs: identical (50k imports, 12 rejects)\n→ the 'Go rewrite' ticket closed as wontfix, with the profile attached.",
    mid: "02:01 — import done in 6 min\n• SQL per-row lookup added; connection churn kept\n• outputs identical, but the O() is still wrong under growth\n→ SLA missed; nobody can say why it got only somewhat faster.",
    bad: "02:00 — go-clinic-sync v0.1 deployed\n• full rewrite in a new language, same algorithm inside\n• 9 min 40s, one new duplicate-insert bug, two weeks of review\n→ the machine was never the problem; nobody measured anything.",
  },
};
