/* PT — I3 CONFIE, MAS VERIFIQUE */
export default {
  name: "CONFIE, MAS VERIFIQUE", skill: "VERIFICAÇÃO",
  protocol: { name: "CONFIANÇA NÃO É EVIDÊNCIA", desc: "O modelo pode errar com fluência: estatísticas inventadas, fontes falsas plausíveis, nonsense confiante. Todo fato estrutural é verificado por um humano — quem assina o trabalho é você." },
  brief: {
    obj: "A IA acabou de redigir um slide de mercado para o seu diretor: '67% dos usuários preferem cobrança anual — Fonte: Relatório Nielsen 2024.' Soa perfeito. Perfeito demais.",
    data: "AFIRMAÇÃO: 67% preferem cobrança anual\nFONTE    : \"Relatório Nielsen 2024\"\nSLIDE    : deck do board do diretor (segunda)\nVERIFICADO: nada ainda",
    note: "Fluente ≠ verdadeiro. O modelo gera texto <b>plausível</b> — incluindo fabricações plausíveis. Números específicos com fonte nomeada são exatamente o rosto da alucinação.",
    criteria: ["verificar antes do slide", "zero números sem fonte", "matar fontes falsas"],
  },
  slots: [
    { label: "RECEBENDO FATOS", options: [
      { t: "O número é específico e a fonte tem nome — esse nível de detalhe significa que o modelo realmente pesquisou, então é seguro construir o slide sobre ele.", why: "Especificidade é de graça para um gerador de texto. Detalhe é estilo de escrita, não cadeia de custódia." },
      { t: "Citou fonte, então já foi checado.", why: "Citações também são texto gerado. Um relatório nomeado é um padrão que o modelo aprendeu — não prova de existência." },
      { t: "Provavelmente está certo — marco para verificar depois.", why: "Instinto certo, ação adiada. O 'depois' chega após o board ver o slide." },
      { t: "Tratar todo número como não verificado até eu mesma(o) encontrá-lo numa fonte real.", why: "Desconfiança por padrão em fatos estruturais. A régua do slide é 'eu confirmei', não 'soou certo'." },
    ]},
    { label: "LIDANDO COM FONTES", options: [
      { t: "Adicionar uma nota de rodapé creditando o assistente de IA como pesquisador — isso torna a informação oficialmente fontada e totalmente auditável para a apresentação ao board.", why: "'A IA disse' não é fonte. Você estaria lavando uma fabricação direto para o deck do board." },
      { t: "Cole direto no slide a citação que a IA forneceu, para que todos na sala possam ver exatamente de onde veio o número.", why: "Uma citação fabricada, exibida com orgulho. Se alguém checar, o deck morre na segunda." },
      { t: "Pesquisar o tema rapidinho no Google e ver o que aparece.", why: "Melhor que nada — mas uma busca vaga não confirma a estatística exata nem prova que o relatório não existe." },
      { t: "Procurar o relatório em si; se não conseguir confirmar que existe, o número não entra no slide.", why: "Verifique a fonte real. Fonte não achada → número cortado. Essa regra torna impossível entregar fabricação." },
    ]},
  ],
  outcomes: {
    good: "SLIDE DE MERCADO — FINAL\n• \"Relatório Nielsen 2024\": NÃO ENCONTRADO no catálogo da Nielsen → afirmação removida\n• Estatística substituta: 41% dos NOSSOS usuários escolheram anual (dados do financeiro, verificados)\n• Pesquisa de preferência de cobrança agendada para o Q4\n\n→ Uma estatística fabricada capturada antes do board ver.",
    mid: "SLIDE DE MERCADO — RASCUNHO\n• 67% preferem cobrança anual (fonte: conforme gerado pela IA — não verificado)\n\n→ O número ficou, marcado 'checar depois'. Se alguém checar, a segunda fica constrangedora.",
    bad: "SLIDE DE MERCADO — COMO ENVIADO\n• 67% dos usuários preferem cobrança anual — Relatório Nielsen 2024\n\n→ O relatório não existe. O assistente de um membro do board descobre na terça. O diretor descobre logo em seguida.",
  },
};
