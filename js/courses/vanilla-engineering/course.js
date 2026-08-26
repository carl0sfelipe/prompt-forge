/* COURSE MANIFEST — Vanilla Engineering (Module 2).
   Every mission ships a FIELD LAB: a downloadable fictional project
   (zip) with a demand + a hidden catch, meant to be worked with
   opencode. The console tests judgment on that exact case. */
import v1 from "./mission-01.js";
import v2 from "./mission-02.js";
import v3 from "./mission-03.js";
import v4 from "./mission-04.js";
import v5 from "./mission-05.js";
import v6 from "./mission-06.js";
import v7 from "./mission-07.js";
import vt from "./mission-08.js";
import pt from "./pt/course.js";

export default {
  id: "vanilla-engineering",
  chip: "VANILLA ENGINEERING",
  title: `VANILLA<span class="sl">//</span>FORGE`,
  subtitle: "The software engineering that survived the AI era · 8 missions with field labs",
  hint: "RUNTIME · GIT · APIS · DATA · TESTS · ARCHITECTURE · SECURITY · THE STACK",
  certTitle: "VANILLA SOFTWARE ENGINEER",
  certFoot: "BUILD BORING · VERIFY EVERYTHING · SHIP RESPONSIBLY · ALL OUTPUTS HERE ARE SYNTHETIC",
  // max XP 1350 (7×150 + 300)
  ranks: [[0, "BIT"], [150, "SCRIPT"], [350, "COMPILER"], [600, "KERNEL"], [900, "DISTRIBUTED"], [1200, "PRINCIPAL ENGINEER"]],
  missions: [v1, v2, v3, v4, v5, v6, v7, vt],
  locales: { pt },
};
