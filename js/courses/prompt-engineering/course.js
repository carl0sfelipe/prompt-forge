/* COURSE MANIFEST — Prompt Engineering.
   To create a new course: copy this folder, edit this file and the
   mission-*.js files, then register it in ../registry.js.
   Nothing else in the codebase needs to change. */
import m1 from "./mission-01.js";
import m2 from "./mission-02.js";
import m3 from "./mission-03.js";
import m4 from "./mission-04.js";
import m5 from "./mission-05.js";
import m6 from "./mission-06.js";
import mt from "./mission-07.js";

export default {
  id: "prompt-engineering",        // unique slug — also the localStorage save key
  chip: "PROMPT ENGINEERING",      // label shown in the boot course picker
  title: `PROMPT<span class="sl">//</span>FORGE`,
  subtitle: "Turn any human into a professional prompt engineer · 7 missions",
  hint: "SPECIFICITY · PERSONA · GROUNDING · FORMAT · FEW-SHOT · DECOMPOSITION · CERTIFICATION",
  certTitle: "PROFESSIONAL PROMPT ENGINEER",
  certFoot: "GO FORTH AND PROMPT · ALL MODEL OUTPUTS IN THIS SIM WERE SYNTHETIC",
  ranks: [[0, "NOVICE"], [120, "APPRENTICE"], [300, "ARTISAN"], [520, "ARCHITECT"], [800, "PROMPT MASTER"]],
  missions: [m1, m2, m3, m4, m5, m6, mt],
};
