/* PT — M2 A MÁSCARA */
export default {
  name: "A MÁSCARA", skill: "PERSONA / PAPEL",
  protocol: { name: "INJEÇÃO DE PERSONA", desc: "Um papel é uma lente: enviesa o modelo para o vocabulário, as prioridades e o rigor de um especialista. Nomeie a especialidade, a senioridade e o estilo de trabalho — não apenas 'seja um especialista'." },
  brief: {
    obj: "Revisão jurídica necessária antes de assinar o contrato de fornecedor 'NimbusOps MSA'. Você precisa de uma análise de risco boa o bastante para entrar numa negociação com ela.",
    data: "DOCUMENTO: NimbusOps Master Service Agreement\n§4.2  fornecedor pode reajustar preços com 15 dias de aviso\n§7.1  responsabilidade limitada a 3 meses de taxas pagas\n§9.3  renova automática salvo cancelamento 90 dias antes\n§12   disputas resolvidas na jurisdição de origem do fornecedor",
    note: "Persona funciona como óptica: <b>especialidade + senioridade + postura</b> focam a saída. 'Ajude como advogado' é lente embaçada; expertise nomeada é lente de receita.",
    criteria: ["riscos ranqueados", "cláusulas citadas", "redlines propostos"],
  },
  slots: [
    { label: "PERSONA", options: [
      { t: "Ajude como um especialista brilhante e aclamado, com conhecimento profundo em direito, negócios e tecnologia, e com uma personalidade prestativa e simpática.", why: "Elogio não é especialidade. Uma lente que foca em tudo não foca em nada." },
      { t: "Ajude como um assistente amigável, brilhante e genérico, com conhecimento profundo sobre tudo e sempre pronto para ajudar em qualquer tarefa.", why: "Persona padrão: educada, rasa, zero lente de domínio." },
      { t: "Ajude como advogado.", why: "Área certa, sem especialidade — você recebe generalidades, não insights contratuais." },
      { t: "Atue como advogado sênior de contratos: 15 anos negociando acordos de fornecedores SaaS, avesso a risco e obcecado por detalhes.", why: "Especialidade + senioridade + postura. A lente fica esmerilhada sob medida." },
    ]},
    { label: "DIRETRIZ", options: [
      { t: "Revise o contrato de todos os ângulos possíveis e me diga tudo o que conseguir encontrar sobre ele, incluindo considerações gerais que se apliquem a acordos desse tipo.", why: "Escopo sem limites convite a um despejo sem ordem — volume vestido de minúcia." },
      { t: "Me diz se esse contrato é bom.", why: "'Bom' é indefinido — pergunta sem resposta convida a um de ombros." },
      { t: "Passe pelo contrato com bastante cuidado e resuma todos os riscos que conseguir encontrar nele.", why: "Entrega riscos, mas sem ranking e sem evidência — inutilizável numa negociação." },
      { t: "Ranqueie os riscos por severidade. Cite cada cláusula. Proponha um redline por risco.", why: "Ranqueado, citado, acionável — o formato de um entregável, não de uma vibe." },
    ]},
  ],
  outcomes: {
    good: "REVISÃO DE RISCO — NimbusOps MSA\n\nALTO · §7.1 — responsabilidade limitada a 3 meses de taxas. Catastrófico num incidente de dados. Redline: teto de 12 meses, exceções para confidencialidade & PI.\nALTO · §12 — disputas na jurisdição do fornecedor. Redline: arbitragem neutra.\nMÉDIO· §4.2 — reajustes com 15 dias de aviso. Redline: 60 dias + direito de saída.\nMÉDIO· §9.3 — janela de renovação de 90 dias. Redline: 30 dias + lembrete de renovação.",
    mid: "Esse contrato tem algumas cláusulas arriscadas. A responsabilidade é limitada (§7.1) e eles podem mudar os preços (§4.2). Vale negociar isso antes de assinar.",
    bad: "Contratos são documentos jurídicos importantes! De modo geral, leia todos os termos com atenção e considere consultar um profissional. Me avise se quiser ajuda com algo mais! 😊",
  },
};
