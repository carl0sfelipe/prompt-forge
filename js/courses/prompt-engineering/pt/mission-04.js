/* PT — M4 O CONTRATO */
export default {
  name: "O CONTRATO", skill: "CONTROLE DE FORMATO",
  protocol: { name: "CONTRATO DE SAÍDA", desc: "Se a saída tem um consumidor, especifique o contrato: formato exato, schema, limites de tamanho e vocabulário permitido. 'Retorne JSON, chaves X/Y/Z, nada além' vence 'seja conciso'." },
  brief: {
    obj: "Engenharia quer tags de sentimento para a nova tela de onboarding — parseável por máquina, zero retrabalho. A spec de intake está abaixo. Honre o contrato.",
    data: "CONSUMIDOR : onboarding-service v2\nESPERA     : JSON, UTF-8\nMÁX. TAGS  : 6\nENUM SENTIMENTO : positive | neutral | negative",
    note: "Formato não é decoração — é <b>interface</b>. Declare a forma, o schema, os tetos e o vocabulário, e exclua prosa explicitamente.",
    criteria: ["JSON válido", "valores do enum", "≤ 6 tags"],
  },
  slots: [
    { label: "FORMATO DE SAÍDA", options: [
      { t: "Formate a saída de modo que pareça limpa, profissional e visualmente atraente, com uma estrutura bonita que qualquer pessoa do time goste de ler.", why: "Estética para humanos, caos para parsers — engenharia recebe prosa e escreve um parser de qualquer jeito." },
      { t: "Formate de um jeito que fique ótimo ao abrir o arquivo — estrutura limpa, apresentação bonita, agradável aos olhos.", why: "Estética para humanos, caos para parsers — o consumidor é um serviço, não uma pessoa." },
      { t: "Me dê a lista das tags.", why: "Quase um formato, mas sem contrato — bullets? vírgulas? prosa misturada?" },
      { t: 'Retorne apenas JSON: {"tags":[{"label":string,"sentiment":enum}]}. Nenhuma prosa antes ou depois.', why: "Schema + cláusula de exclusão. Parseável de primeira." },
    ]},
    { label: "RESTRIÇÕES", options: [
      { t: "Seja tão criativo e expressivo quanto quiser nos nomes das tags — um vocabulário rico e variado torna a saída muito mais útil e interessante para todos.", why: "Criatividade aqui = chaves inconsistentes e filtros quebrados lá na frente." },
      { t: "Seja criativo com os nomes das tags.", why: "Vocabulário criativo = chaves inconsistentes e filtros quebrados downstream." },
      { t: "Mantenha as tags curtas.", why: "'Curta' é um clima, não um limite. O modelo decide por você." },
      { t: "Máx. 6 tags. Labels ≤ 16 chars, minúsculas-com-hífen. Sentimento estritamente um de: positive | neutral | negative.", why: "Toda restrição é numérica ou enumerável — nada fica para 'interpretar'." },
    ]},
  ],
  outcomes: {
    good: '{\n  "tags": [\n    {"label":"quick-setup","sentiment":"positive"},\n    {"label":"clear-pricing","sentiment":"positive"},\n    {"label":"jargon-heavy","sentiment":"negative"},\n    {"label":"slow-demo-video","sentiment":"neutral"}\n  ]\n}\n\n→ parseado limpo pelo onboarding-service · 0 warnings',
    mid: "1. quick-setup (positive)\n2. clear pricing (positive)\n3. Confusing Jargon (meio negative)\n4. demo video?? (neutral)\n\n→ precisa de limpeza humana antes de dar para parsear",
    bad: "Claro! Aqui vão umas tags adoráveis que capturam a vibe do seu onboarding:\n\n✨ frictionless-journey · 🚀 delight-loop · 💎 synergy-first · 🌈 wow-moments\n\nEspero ter ajudado!",
  },
};
