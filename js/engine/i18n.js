/* ============================================================
   I18N — engine UI strings + locale state.
   Course content is translated per-course (see localize.js);
   this dictionary covers every string the ENGINE itself renders.
   Missing key in a locale falls back to English.
   ============================================================ */
const LOCALE_KEY = "forge:locale";

export const LANGS = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

const DICT = {
  en: {
    begin: "Begin Training ▸",
    callsign: "CALLSIGN",
    boot0: "SYS  // FORGE ENGINE v1.0 — training kernel loaded",
    boot1: "USER // > write me something about marketing",
    boot2: "MODEL// Sure! Marketing is a broad and exciting field with many...",
    boot3: "SYS  // output rejected — vagueness detected (97.4%)",
    boot4: "SYS  // initiating OPERATIVE TRAINING PROTOCOL…",
    restored: "PROGRESS RESTORED — WELCOME BACK, ",
    resetConfirm: "CLICK RESET AGAIN TO WIPE PROGRESS",
    codexBtn: "CODEX", codexTitle: "FIELD CODEX", codexClose: "✕ CLOSE",
    sndOn: "SND ON", sndOff: "SND OFF", reset: "RESET",
    certStamp: "✓ CERTIFIED", certXp: "TOTAL XP", certSync: "AVG SYNC", certMiss: "MISSIONS",
    certPending: "✗ NOT YET",
    pendingNote: "Certification requires {need}% average sync on best runs — you are at {avg}%. Retrain and return.",
    retrain: "↻ Retrain weakest mission",
    attemptsLine: "ATTEMPTS: {n} · first-try: {k}/{t}",
    rerun: "↻ Re-run Training", openCodex: "Open Codex",
    footer: "FORGE ENGINE v1.0 · COURSE-AGNOSTIC TRAINING SIM · ALL MODEL OUTPUTS IN THIS SIM ARE SYNTHETIC",
    // mission view
    missionBrief: "MISSION BRIEF", providedData: "PROVIDED DATA", fieldNote: "FIELD NOTE ▸",
    successCriteria: "SUCCESS CRITERIA",
    labTitle: "FIELD LAB", labDownload: "⬇ Download lab", labCatch: "THE CATCH — did you fall for it?",
    labAccept: "ACCEPTANCE CRITERIA",
    labOpencode: "Recommended flow: unzip the lab, open the folder with opencode, let the AI help you work the demand — but YOU decide. The console below tests your judgment on this exact case.",
    console: "PROMPT ASSEMBLY CONSOLE", awaiting: "// awaiting component…",
    shelf: "COMPONENT SHELF", shelfHint: "select a component · click again to replace",
    run: "⚡ Compile & Run Prompt", compiling: "COMPILING…",
    operative: "OPERATIVE: ", skillTrained: "SKILL TRAINED — ",
    incoming: "INCOMING MISSION", skill: "SKILL: ",
    tierGood: "FLAWLESS OUTPUT", tierMid: "PARTIAL SYNC", tierBad: "CHAOS OUTPUT",
    sync: "SYNC", pts: "PTS", best: "best: ",
    attempt: "ATTEMPT",
    recorded: "recorded", notRecorded: "NOT recorded", protocolW: "protocol",
    simResponse: "SIMULATED MODEL RESPONSE", componentVerdict: "COMPONENT VERDICT",
    bAnti: "✗ ANTI-PATTERN", bPass: "△ PASSABLE", bMaster: "✓ MASTER",
    vAnti: "✗ ANTI", vPass: "△ PASS", vMaster: "✓ MASTER",
    xpGood: "XP GRANTED — EXEMPLARY. THAT PROMPT IS PRODUCTION-READY.",
    xpMid: "XP GRANTED — FUNCTIONAL. TIGHTEN EVERY SLOT FOR A FLAWLESS OUTPUT.",
    xpRejected: "OUTPUT REJECTED — 0 XP GRANTED · RE-RUN REQUIRED",
    xpAlready: "+0 XP — ALREADY GRANTED FOR THIS MISSION",
    unlocked: "◆ PROTOCOL UNLOCKED — CODEX UPDATED",
    gate: "⚠ GATE ACTIVE — MISSION NOT CLEARED",
    gateTitle: "The model mirrors your precision.",
    gateBody: "Below half sync: the output is unusable. Study the verdicts, then re-run — the components will be reshuffled.",
    claimCert: "★ Claim Certification", advanceTo: "Advance to ",
    replay: "↻ Re-run for mastery", rerunBtn: "↻ Re-run Mission (components reshuffled)",
    slotsRequired: "⚠ ALL {n} SLOTS REQUIRED — {label} EMPTY",
    rankUp: "RANK UP — ",
    encrypted: "▒▒ ENCRYPTED",
    decrypt: "Complete {code} · {name} to decrypt this protocol.",
    operativeCert: "OPERATIVE · ",
  },
  pt: {
    begin: "Iniciar Treinamento ▸",
    callsign: "CODINOME",
    boot0: "SYS  // FORGE ENGINE v1.0 — núcleo de treinamento carregado",
    boot1: "USER // > escreve umas coisas sobre marketing",
    boot2: "MODEL// Claro! Marketing é uma área ampla e empolgante, com muitas...",
    boot3: "SYS  // saída rejeitada — vagueza detectada (97.4%)",
    boot4: "SYS  // iniciando PROTOCOLO DE TREINAMENTO OPERACIONAL…",
    restored: "PROGRESSO RESTAURADO — BEM-VINDO(A) DE VOLTA, ",
    resetConfirm: "CLIQUE DE NOVO EM RESET PARA APAGAR O PROGRESSO",
    codexBtn: "CODEX", codexTitle: "CODEX DE CAMPO", codexClose: "✕ FECHAR",
    sndOn: "SOM ON", sndOff: "SOM OFF", reset: "RESET",
    certStamp: "✓ CERTIFICADO", certXp: "XP TOTAL", certSync: "SYNC MÉDIO", certMiss: "MISSÕES",
    certPending: "✗ AINDA NÃO",
    pendingNote: "A certificação exige sync médio de {need}% nas melhores runs — você está em {avg}%. Retreine e volte.",
    retrain: "↻ Retreinar missão mais fraca",
    attemptsLine: "TENTATIVAS: {n} · à 1ª: {k}/{t}",
    rerun: "↻ Refazer Treinamento", openCodex: "Abrir Codex",
    footer: "FORGE ENGINE v1.0 · SIMULADOR DE TREINAMENTO AGNÓSTICO A CURSOS · TODAS AS SAÍDAS DE MODELO NESTE SIM SÃO SINTÉTICAS",
    // mission view
    missionBrief: "BRIEFING DA MISSÃO", providedData: "DADOS FORNECIDOS", fieldNote: "NOTA DE CAMPO ▸",
    successCriteria: "CRITÉRIOS DE SUCESSO",
    labTitle: "LAB DE CAMPO", labDownload: "⬇ Baixar o lab", labCatch: "A PEGADINHA — você caiu?",
    labAccept: "CRITÉRIOS DE ACEITE",
    labOpencode: "Fluxo recomendado: descompacte o lab, abra a pasta com o opencode, deixe a IA ajudar a trabalhar a demanda — mas DECIDA você. O console abaixo testa o seu julgamento nesse caso exato.",
    console: "CONSOLE DE MONTAGEM DE PROMPT", awaiting: "// aguardando componente…",
    shelf: "PRATELEIRA DE COMPONENTES", shelfHint: "selecione um componente · clique de novo para substituir",
    run: "⚡ Compilar & Executar Prompt", compiling: "COMPILANDO…",
    operative: "OPERADOR(A): ", skillTrained: "HABILIDADE TREINADA — ",
    incoming: "MISSÃO ENTRANTE", skill: "HABILIDADE: ",
    tierGood: "SAÍDA IMPECCÁVEL", tierMid: "SYNC PARCIAL", tierBad: "SAÍDA CAÓTICA",
    sync: "SYNC", pts: "PTS", best: "melhor: ",
    attempt: "TENTATIVA",
    recorded: "registrado", notRecorded: "NÃO registrado", protocolW: "protocolo",
    simResponse: "RESPOSTA SIMULADA DO MODELO", componentVerdict: "VEREDITO POR COMPONENTE",
    bAnti: "✗ ANTI-PADRÃO", bPass: "△ ACEITÁVEL", bMaster: "✓ MESTRE",
    vAnti: "✗ ANTI", vPass: "△ PARCIAL", vMaster: "✓ MESTRE",
    xpGood: "XP CONCEDIDO — EXEMPLAR. ESSE PROMPT ESTÁ PRONTO PARA PRODUÇÃO.",
    xpMid: "XP CONCEDIDO — FUNCIONAL. AJUSTE TODOS OS SLOTS PARA UMA SAÍDA IMPECCÁVEL.",
    xpRejected: "SAÍDA REJEITADA — 0 XP CONCEDIDO · RE-RUN OBRIGATÓRIO",
    xpAlready: "+0 XP — JÁ CONCEDIDO NESTA MISSÃO",
    unlocked: "◆ PROTOCOLO DESBLOQUEADO — CODEX ATUALIZADO",
    gate: "⚠ GATE ATIVO — MISSÃO NÃO CONCLUÍDA",
    gateTitle: "O modelo espelha a sua precisão.",
    gateBody: "Abaixo da metade do sync: a saída é inutilizável. Estude os vereditos e refaça — os componentes serão reembaralhados.",
    claimCert: "★ Reivindicar Certificação", advanceTo: "Avançar para ",
    replay: "↻ Refazer em busca da maestria", rerunBtn: "↻ Refazer Missão (componentes reembaralhados)",
    slotsRequired: "⚠ TODOS OS {n} SLOTS OBRIGATÓRIOS — {label} VAZIO",
    rankUp: "SUBIU DE RANK — ",
    encrypted: "▒▒ CRIPTOGRAFADO",
    decrypt: "Complete {code} · {name} para descriptografar este protocolo.",
    operativeCert: "OPERADOR(A) · ",
  },
};

let locale = "en";

export function initLocale(){
  try{
    const saved = localStorage.getItem(LOCALE_KEY);
    if(saved && DICT[saved]) locale = saved;
    else if((navigator.language || "").toLowerCase().startsWith("pt")) locale = "pt";
  }catch{}
  return locale;
}
export function getLocale(){ return locale; }
export function setLocale(l){
  if(!DICT[l]) return;
  locale = l;
  try{ localStorage.setItem(LOCALE_KEY, l); }catch{}
}

export function t(key){
  return DICT[locale]?.[key] ?? DICT.en[key] ?? key;
}
export function tf(key, vars){
  let s = t(key);
  for(const [k, v] of Object.entries(vars || {})) s = s.replaceAll("{" + k + "}", v);
  return s;
}
export function sndLabel(on){ return t(on ? "sndOn" : "sndOff"); }

/* Static text baked into index.html — re-applied on language change. */
const STATIC = [
  ["#beginBtn", "textContent", "begin"],
  ["#agent", "placeholder", "callsign"],
  ["#codexBtn", "textContent", "codexBtn"],
  ["#codex h3", "textContent", "codexTitle"],
  ["#codexClose", "textContent", "codexClose"],
  ["#resetBtn", "textContent", "reset"],
  [".cert-stamp", "textContent", "certStamp"],
  ["#cXpL", "textContent", "certXp"],
  ["#cSyncL", "textContent", "certSync"],
  ["#cMissL", "textContent", "certMiss"],
  ["#rerunBtn", "textContent", "rerun"],
  ["#certCodexBtn", "textContent", "openCodex"],
  ["footer", "textContent", "footer"],
];

export function applyStatic(){
  STATIC.forEach(([sel, attr, key]) => {
    const el = document.querySelector(sel);
    if(el) el[attr] = t(key);
  });
}
