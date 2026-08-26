/* V2 — SOURCE OF TRUTH · VERSION CONTROL + lab billing-web (git history) */
export default {
  code: "V2", name: "SOURCE OF TRUTH", skill: "VERSION CONTROL",
  protocol: { name: "HISTORY IS A TOOL", desc: "Git is the auditable memory of why the system is what it is. Bisect to find the culprit, revert without rewriting shared history, and write commits that explain the why." },
  brief: {
    obj: "Friday 18:07. A client calls: invoice totals are wrong since this morning's deploy. The repo has ~8 commits since the last green tag. Someone must find the culprit commit and make production sane again — fast.",
    data: "REPO     : billing-web (node, plain http)\nLAST GOOD: tag v1.4 (verified by the client's afternoon)\nSYMPTOM  : invoice total off by exactly 2× on some items\nPRESSURE : client watching, fix needed before Monday",
    note: "Commit messages are claims, not evidence — one of them lies. The tool that doesn't lie is <b>binary search over history</b>: `git bisect` between last-good and HEAD, with a test as the oracle.",
    criteria: ["culprit found by bisect", "history preserved", "test as oracle"],
  },
  lab: {
    folder: "billing-web",
    task: "The zip contains the repo WITH its .git history. Find the commit that broke the invoice total, revert it properly, and keep history intact.",
    acceptance: ["node test.js passes on the final working tree", "culprit commit identified and named (hash + message)", "history preserved: reverts/fixes are NEW commits, no force-push, no rebase of shared work"],
    catch: "One commit message literally says 'fix invoice rounding' — and it's innocent. The real culprit is a quiet change buried in a commit named after something else ('chore: tweak utils'). If you trusted messages (or `git blame` on the wrong line) you reverted the wrong thing. And if you 'fixed' by editing the file directly, the history now lies about what happened.",
    files: {
      "README.md": "# billing-web\n\nDEMAND: invoice totals wrong since this morning. Last known good: tag v1.4.\n\n1. Find the culprit commit (there are ~8 since v1.4).\n2. Make the tree sane again — WITHOUT rewriting shared history.\n3. `node test.js` must pass at the end.\n\nHint: `git bisect start v1.4 HEAD`, let the test be the oracle.\n",
      "billing.js": "function lineTotal(qty, unit) {\n  return qty * unit;\n}\n\nfunction invoiceTotal(lines) {\n  let t = 0;\n  for (const l of lines) t += lineTotal(l.qty, l.unit);\n  return Math.round(t * 100) / 100;\n}\n\nmodule.exports = { lineTotal, invoiceTotal };\n",
      "utils.js": "function round2(x) {\n  return Math.round(x * 200) / 200;  // culprit: was *100 — introduced silently\n}\n\nmodule.exports = { round2 };\n",
      "server.js": "const http = require('http');\nconst { invoiceTotal } = require('./billing');\nconst { round2 } = require('./utils');\n\nhttp.createServer((req, res) => {\n  const lines = [{ qty: 2, unit: 19.9 }, { qty: 1, unit: 5 }];\n  res.end('total: ' + round2(invoiceTotal(lines)) + '\\n');\n}).listen(3000);\n",
      "test.js": "const { invoiceTotal } = require('./billing');\nconst { round2 } = require('./utils');\nconst assert = require('assert');\n\n// oracle: known-good invoice behavior from v1.4\nassert.strictEqual(round2(44.8 + 5), 49.8);\nassert.strictEqual(invoiceTotal([{ qty: 2, unit: 19.9 }]), 39.8);\nconsole.log('test.js: OK');\n",
      "BUILD_HISTORY.sh": "# run once after unzip to materialize the history (8 commits + tag v1.4)\n#!/usr/bin/env bash\nset -e\ncp -r git-history .git 2>/dev/null || true\ngit config user.email \"lab@forge\" && git config user.name \"lab\"\ngit tag v1.4 <the-3rd-commit> 2>/dev/null || true\necho 'history ready: git log --oneline'\n",
      "git-history/README.txt": "This lab ships a prebuilt .git: unzip and the repo already has 8 commits since v1.4\n(including 'fix invoice rounding' — innocent — and 'chore: tweak utils' — guilty).\nJust run: git log --oneline && git bisect start v1.4 HEAD\n",
    },
  },
  slots: [
    { id: "HUNT", label: "THE HUNT", options: [
      { t: "git bisect between v1.4 and HEAD, running test.js at each step — the test decides good/bad, not me.", q: 2, why: "Binary search on history with a machine oracle: ~3 steps to the culprit, immune to lying messages." },
      { t: "Read the commit that says 'fix invoice rounding' and revert that one — the message matches the symptom.", q: 0, why: "Messages are claims. This one lies. You'd revert an innocent commit and keep the bug." },
      { t: "git blame on the changed line in billing.js to see who touched it last — blame gives authorship with dates, and whoever changed the money line right before the symptom started is where any reasonable investigation begins.", q: 1, why: "Good instinct, wrong line — the culprit hides in utils.js. Blame finds authorship, not causality across files." },
      { t: "Diff every commit manually since v1.4 until something looks off.", q: 0, why: "Works eventually, doesn't scale, and 'looks off' is exactly what quiet culprits avoid. Automate the oracle." },
    ]},
    { id: "REV", label: "THE RECOVERY", options: [
      { t: "git revert <culprit> on the current branch, run the suite, deploy the revert commit.", q: 2, why: "New commit that cancels the bad one: production sane, history honest, reversible itself." },
      { t: "git reset --hard v1.4 and force-push — cleanest possible tree, instantly back to the last state the client confirmed was good, and honestly the fastest path to a calm Friday night for everyone involved.", q: 0, why: "Nukes 5 innocent commits (including a client demo feature) and rewrites shared history. Monday morning: two repos, zero truth." },
      { t: "Edit utils.js back by hand, commit 'fixed it', push.", q: 1, why: "Tree is right, history is wrong — the causal link between culprit and fix is now invisible to future archaeologists." },
      { t: "Checkout v1.4, deploy that, and figure out the rest next week.", q: 0, why: "Rolling back the world to fix one line throws away a week of merged work — and the team still doesn't know the culprit." },
    ]},
    { id: "HYG", label: "COMMIT HYGIENE", options: [
      { t: "Small atomic commits; message explains the WHY ('double-rounding in utils broke totals'), not the what.", q: 2, why: "The why is the only thing future-you can't reconstruct from the diff. It's also what makes bisect and blame trustworthy." },
      { t: "One big commit at the end of the day with everything in it — 'friday updates' — so the team keeps velocity and nobody spends the launch week nitpicking message style instead of shipping.", q: 0, why: "Makes every future bisect land in a mega-commit where the oracle can't isolate anything." },
      { t: "Conventional prefixes and nothing else: 'fix: stuff', 'chore: things'.", q: 1, why: "Prefixes help tooling, but 'stuff' carries zero why. Half the value, feels complete — dangerous." },
      { t: "Detailed messages describing every changed line in prose.", q: 0, why: "The diff already says what changed. Prose that mirrors the diff is noise that ages badly; say why, once." },
    ]},
  ],
  outcomes: {
    good: "18:31 — culprit isolated in 3 bisect steps: a87c3f 'chore: tweak utils' (silent *200 in round2)\n• git revert a87c3f → test.js green → deployed 18:40\n• message on the revert explains the 2× symptom chain\n→ Monday: history tells the whole story; the lying commit got a comment.",
    mid: "19:15 — utils.js hand-edited back to *100, pushed as 'fixed rounding'\n• test green, client calm\n• culprit commit never identified — the 'why' chain is gone\n→ next regression, someone reads 'fix invoice rounding' and goes down the wrong hole again.",
    bad: "21:40 — force-pushed a reset to v1.4 after reverting the wrong commit didn't help\n• client demo feature from Thursday: gone\n• two teammates have diverged repos; nobody trusts origin\n→ production sane, shared memory destroyed. That's the real outage.",
  },
};
