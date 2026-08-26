/* PT-BR OVERRIDES — Vanilla Engineering. Mesmas regras de merge do curso 1:
   sem `q` aqui (correção vem do base EN), opções alinhadas por índice,
   perfis de comprimento decorrelacionados também em PT. */
import v1 from "./mission-01.js";
import v2 from "./mission-02.js";
import v3 from "./mission-03.js";
import v4 from "./mission-04.js";
import v5 from "./mission-05.js";
import v6 from "./mission-06.js";
import v7 from "./mission-07.js";
import vt from "./mission-08.js";

export default {
  subtitle: "A engenharia de software que sobreviveu à era da IA · 8 missões com labs de campo",
  hint: "RUNTIME · GIT · APIS · DADOS · TESTES · ARQUITETURA · SEGURANÇA · O STACK",
  certTitle: "ENGENHEIRO(A) DE SOFTWARE VANILLA",
  certFoot: "CONSTRUA O CHATO · VERIFIQUE TUDO · ENTREGUE COM RESPONSABILIDADE · TODAS AS SAÍDAS AQUI SÃO SINTÉTICAS",
  ranks: [[0, "BIT"], [150, "SCRIPT"], [350, "COMPILADOR"], [600, "KERNEL"], [900, "DISTRIBUÍDO"], [1200, "ENGENHEIRO(A) PRINCIPAL"]],
  missions: { V1: v1, V2: v2, V3: v3, V4: v4, V5: v5, V6: v6, V7: v7, VT: vt },
};
