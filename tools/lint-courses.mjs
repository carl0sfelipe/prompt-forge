// lint-courses.mjs — runs the browser course linter (js/engine/validate.js) from the CLI.
// Usage: node tools/lint-courses.mjs   → exit 0 when every course and locale is CLEAN.
import { COURSES } from "../js/courses/registry.js";
import { validateCourse, validateLocalization } from "../js/engine/validate.js";

let problems = 0;
for (const course of COURSES) {
  for (const [kind, fn] of [["base", validateCourse], ["locales", validateLocalization]]) {
    const out = fn(course);
    const list = Array.isArray(out) ? out : out?.issues ?? out?.warnings ?? (out ? [out] : []);
    const real = list.filter((x) => x && (typeof x !== "object" || Object.keys(x).length));
    problems += real.length;
    console.log(`${course.id} ${kind}: ${real.length ? real.length + " issue(s)" : "CLEAN"}`);
    for (const p of real) console.log("  -", typeof p === "string" ? p : JSON.stringify(p));
  }
}
process.exit(problems ? 1 : 0);
