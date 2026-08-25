/* COURSE MANIFEST — Prompt Engineering.
   Progression: I1–I4 take an absolute beginner from "what is a prompt"
   to safe, verified, iterative usage. M1–MT build the professional
   techniques on top. To create a new course: copy this folder, edit
   this file and the mission files, register in ../registry.js.
   Translations live in ./pt/ — see pt/course.js. */
import i1 from "./intro-01.js";
import i2 from "./intro-02.js";
import i3 from "./intro-03.js";
import i4 from "./intro-04.js";
import m1 from "./mission-01.js";
import m2 from "./mission-02.js";
import m3 from "./mission-03.js";
import m4 from "./mission-04.js";
import m5 from "./mission-05.js";
import m6 from "./mission-06.js";
import mt from "./mission-07.js";
import pt from "./pt/course.js";

export default {
  id: "prompt-engineering",        // unique slug — also the localStorage save key
  chip: "PROMPT ENGINEERING",      // label shown in the boot course picker
  title: `PROMPT<span class="sl">//</span>FORGE`,
  subtitle: "From absolute zero to professional prompt engineer · 11 missions",
  hint: "FUNDAMENTALS · ITERATION · VERIFICATION · SAFETY · SPECIFICITY · PERSONA · GROUNDING · FORMAT · FEW-SHOT · DECOMPOSITION · CERTIFICATION",
  certTitle: "PROFESSIONAL PROMPT ENGINEER",
  certFoot: "GO FORTH AND PROMPT · ALL MODEL OUTPUTS IN THIS SIM WERE SYNTHETIC",
  // max XP 1300 (4×100 + 6×100 + 300) — PROMPT MASTER demands ~85%
  ranks: [[0, "NOVICE"], [140, "APPRENTICE"], [320, "OPERATOR"], [540, "ARTISAN"], [800, "ARCHITECT"], [1100, "PROMPT MASTER"]],
  missions: [i1, i2, i3, i4, m1, m2, m3, m4, m5, m6, mt],
  locales: { pt },
};
