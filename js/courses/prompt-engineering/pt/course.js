/* PT-BR OVERRIDES — Prompt Engineering.
   Structure: missions are keyed by mission CODE; slots and options
   merge by INDEX with the English base (see js/engine/localize.js).
   Rules:
   - options here carry NO `q` — correctness comes only from the
     English base, so a translation can never change the right answer;
   - option arrays must have the same length as the English ones
     (the course linter checks this);
   - length decorrelation must hold here too: keep the verbose traps
     longer than the master option. */
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

export default {
  subtitle: "Do zero absoluto a engenheiro(a) de prompts profissional · 11 missões",
  hint: "FUNDAMENTOS · ITERAÇÃO · VERIFICAÇÃO · SEGURANÇA · ESPECIFICIDADE · PERSONA · GROUNDING · FORMATO · FEW-SHOT · DECOMPOSIÇÃO · CERTIFICAÇÃO",
  certTitle: "ENGENHEIRO(A) DE PROMPTS PROFISSIONAL",
  certFoot: "VÁ E PROMUTE COM PODER · TODAS AS SAÍDAS DE MODELO NESTE SIM FORAM SINTÉTICAS",
  ranks: [[0, "NOVICE"], [140, "APRENDIZ"], [320, "OPERADOR"], [540, "ARTESÃO"], [800, "ARQUITETO"], [1100, "MESTRE DO PROMPT"]],
  missions: { I1: i1, I2: i2, I3: i3, I4: i4, M1: m1, M2: m2, M3: m3, M4: m4, M5: m5, M6: m6, MT: mt },
};
