/* PT — M6 O LABIRINTO */
export default {
  name: "O LABIRINTO", skill: "DECOMPOSIÇÃO",
  protocol: { name: "DECOMPOR & AUTOCHECAR", desc: "'Pense passo a passo' compra memória de trabalho para o modelo. Force as suposições virem à superfície primeiro, encadeie o raciocínio e feche todo prompt de análise com uma autochecagem visível." },
  brief: {
    obj: "A liderança pergunta: 'Devemos abrir escritório no Brasil no Q3?' O modelo quer soltar um sim ou não confiante. Compre pra ele um caminho para pensar.",
    data: "CONHECIDO : 18% dos signups já são LATAM · suporte PT-BR só via tradução\n            2 concorrentes sediados em São Paulo\nDESCONHECIDO: tolerância de preço · custo de contratação · estrutura tributária",
    note: "Confiança não é correção. Exija <b>suposições → evidências → conclusão</b> e force o modelo a expor o que mudaria a resposta dele.",
    criteria: ["raciocínio visível", "suposições listadas", "fechamento falsificável"],
  },
  slots: [
    { label: "FORMATO DO RACIOCÍNIO", options: [
      { t: "Considere todos os fatores possíveis — mercado, cultura, impostos, contratação, competição, fusos, câmbio, marca — e cubra todos de forma abrangente.", why: "Amplitude não é raciocínio. Um survey sem estrutura de tudo não força conclusão nenhuma." },
      { t: "Responda rápido e com confiança.", why: "Velocidade primeiro = vibe primeiro. Confiança sem raciocínio é cara-ou-coroa de terno." },
      { t: "Me dê prós e contras.", why: "Estrutura, mas uma lista chapada esconde dependências e não força conclusão." },
      { t: "Pense passo a passo: liste suposições → pondere evidências pró e contra → conclua com recomendação e nível de confiança.", why: "Cadeia de raciocínio com pouso obrigatório — raciocínio que dá para auditar." },
    ]},
    { label: "AUTOCHECAGEM", options: [
      { t: "Revise sua resposta final com muito cuidado, várias vezes, e só envie quando tiver certeza absoluta de que é a melhor resposta possível.", why: "Teatro de esforço — invisível, inverificável, e não muda a estrutura da saída." },
      { t: "Mantenha alto nível e bem conciso — lembre que a liderança é extremamente ocupada e não tem paciência para documentos longos.", why: "Concisão é ok, mas resposta errada entregue brevemente continua errada." },
      { t: "Revise sua resposta antes de responder.", why: "Instrução invisível — você não vê se ele checou algo de verdade." },
      { t: 'Termine com "O que mudaria minha resposta": três dados que poderiam inverter a recomendação.', why: "Autochecagem visível: expõe as juntas fracas da conclusão em vez de escondê-las." },
    ]},
  ],
  outcomes: {
    good: "PASSO 1 — SUPOSIÇÕES: signups LATAM são sinal de demanda; suporte só por tradução está tolerando por ora.\nPASSO 2 — EVIDÊNCIAS: 18% de demanda orgânica (pró) vs. dois concorrentes consolidados em SP + zero dados locais de preço (contra).\nPASSO 3 — RECOMENDAÇÃO: pilotar um pod remoto de suporte PT-BR no Q3; adiar escritório físico até dados de contratação/tributos. Confiança: MÉDIA.\n\nO QUE MUDARIA MINHA RESPOSTA:\n1) resultado da pesquisa de tolerância de preço  2) salários de cargos seniores em SP  3) definição tributária",
    mid: "Prós: mais signups da região. Contras: competição. No geral parece uma boa ideia expandir, se feito com cuidado.",
    bad: "Sim! O Brasil é um mercado enorme e abrir um escritório lá seria muito empolgante para crescimento, cultura e moral do time. Me avise se quiser um plano!",
  },
};
