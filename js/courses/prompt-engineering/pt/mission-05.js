/* PT — M5 O ESPELHO */
export default {
  name: "O ESPELHO", skill: "EXEMPLOS FEW-SHOT",
  protocol: { name: "DEMONSTRAÇÃO FEW-SHOT", desc: "Descrições contam; exemplos mostram. Dois a quatro pares entrada→saída travam estilo, forma e tom mais rápido que parágrafos de regras. Seus exemplos são a spec." },
  brief: {
    obj: "O bot de triagem precisa rotular todo ticket que chega com uma de quatro labels mais uma razão de uma linha — mesma forma, todo dia, 400 tickets por dia.",
    data: "LABELS    : BILLING | BUG | FEATURE | OTHER\nVOLUME    : ~400 tickets/dia\nREVISORES : humanos leem toda saída",
    note: "Few-shot vence over-explaining: <b>2–4 pares limpos entrada→saída</b> ensinam formato e tom por demonstração. Depois prenda com uma regra de consistência para o modelo espelhar em vez de improvisar.",
    criteria: ["forma exata", "labels fixas", "estável em escala"],
  },
  slots: [
    { label: "DEMONSTRAÇÕES", options: [
      { t: "Inclua vinte exemplos detalhados cobrindo todo caso-limite e variação concebível, para o modelo ter cobertura completa de todas as entradas que possa encontrar.", why: "Exagero: queima o orçamento de contexto e arrisca contradições. 2–4 pares limpos vencem." },
      { t: "Apenas instrua o modelo a rotular todos os tickets de forma correta e consistente, sem errar.", why: "'Corretamente' é o resultado desejado, não a instrução que leva até ele." },
      { t: "Um parágrafo descrevendo o que cada label significa.", why: "Definições ajudam, mas forma e tom continuam imaginados — a saída deriva." },
      { t: 'Três pares entrada→saída, ex.: "Não consigo exportar CSV" → BUG · export falha em escala.', why: "Few-shot: o modelo espelha sua estrutura, brevidade e tom com exatidão." },
    ]},
    { label: "REGRA DE CONSISTÊNCIA", options: [
      { t: "Melhore os exemplos sempre que vir oportunidade de ser mais esperto ou mais útil — use seu julgamento para deixar cada label ainda melhor do que a mostrada.", why: "Convida deriva — cada 'melhoria' é um formato novo que humanos precisam reaprender." },
      { t: "Melhore os exemplos onde puder.", why: "Mesma armadilha: 'melhoria' a 400 tickets/dia = 400 formatos diferentes." },
      { t: "Use os exemplos como orientação.", why: "'Orientação' dá licença para improvisar nos casos chatos." },
      { t: "Siga o formato dos exemplos exatamente. Se ficar incerto, produza OTHER.", why: "Regra de espelhamento + fallback seguro = pipeline estável a 400/dia." },
    ]},
  ],
  outcomes: {
    good: "T-2214 → BUG     · export CSV trava acima de 10k linhas\nT-2215 → FEATURE · agendamento pedido; dark mode elogiado\nT-2219 → BILLING · cobrança duplicada em outubro\nT-2221 → OTHER   · lacuna de documentação, não defeito\n\n→ forma idêntica nos 400 tickets · revisores leem em velocidade máxima",
    mid: "T-2214: bug (export).\nT-2215: feature request talvez?\nT-2219: Billing Issue\n\n→ casing e forma inconsistentes — revisores fazem careta",
    bad: "O ticket 2214 parece técnico. O 2215 é feedback positivo sobre o dark mode e também um desejo de agendamento — pode ser OTHER ou FEATURE dependendo de como você define, sinceramente...",
  },
};
