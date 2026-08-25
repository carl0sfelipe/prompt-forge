/* PT — M3 A FUNDAMENTAÇÃO */
export default {
  name: "A FUNDAMENTAÇÃO", skill: "CONTEXTO & DADOS",
  protocol: { name: "GROUNDING", desc: "O modelo não enxerga o que você não cola. Passe dados reais dentro de delimitadores e proíba a invenção: 'Use apenas os dados fornecidos; escreva UNKNOWN se estiver faltando.'" },
  brief: {
    obj: "O time de produto quer o digest de feedback de suporte desta semana. Você tem os tickets crus. Seu colega está prestes a promptar com 'você conhece nosso produto, resuma o feedback'… segure ele.",
    data: "TICKET-2214 : \"Exportar CSV trava com >10k linhas.\"\nTICKET-2215 : \"Amei o dark mode novo. Adicionem agendamento.\"\nTICKET-2218 : \"Doc de SSO errada — o passo 4 não existe.\"\nTICKET-2219 : \"Cobrança duplicada em outubro.\"\nTICKET-2221 : \"Rate limits da API sem documentação.\"",
    note: "Nunca faça o modelo 'lembrar' dos seus dados — <b>injete</b>. Cerque com delimitadores (&lt;tickets&gt;…&lt;/tickets&gt;) e defina uma regra dura de escopo, para a alucinação não ter porta.",
    criteria: ["dados verbatim", "delimitadores", "zero invenção"],
  },
  slots: [
    { label: "INJEÇÃO DE DADOS", options: [
      { t: "Resuma nossos tickets de suporte — você conhece nosso produto e como clientes normalmente se sentem sobre ferramentas assim, use esse entendimento.", why: "Ele não conhece seus tickets — permissão para 'usar entendimento' é permissão para inventar." },
      { t: "Resuma os tickets de suporte desta semana — você já conhece nosso produto e nossos usuários bem o bastante para preencher as lacunas.", why: "Ele não conhece seus tickets — 'preencher lacunas' é porta aberta para invenção." },
      { t: "Os usuários reclamaram de exports, docs e cobrança, mais ou menos.", why: "Sua paráfrase é com perdas e enviesada — passe o sinal cru." },
      { t: "Analise os tickets fornecidos abaixo, cercados entre <tickets> e </tickets>.", why: "Dados verbatim, cercados por delimitadores — o modelo trabalha sobre a sua realidade." },
    ]},
    { label: "REGRA DE ESCOPO", options: [
      { t: "Sinta-se à vontade para enriquecer o digest com boas práticas de mercado, benchmarks e qualquer contexto relevante que o torne mais completo e acionável para o time.", why: "Você abriu a porta para ruído externo — o digest vira conselho genérico." },
      { t: "Adicione também boas práticas do setor.", why: "Convida ruído externo; o digest deixa de ser sobre OS SEUS tickets." },
      { t: "Foque principalmente nos tickets.", why: "'Principalmente' é um buraco — a alucinação entra por palavras macias." },
      { t: "Use apenas os tickets fornecidos. Se algo não estiver neles, escreva UNKNOWN.", why: "Fronteira dura + comportamento de fallback. A invenção fica impossível." },
    ]},
  ],
  outcomes: {
    good: "DIGEST — 5 tickets\n\nBUGS (2)     : crash no export CSV >10k linhas [2214] · cobrança duplicada em out [2219]\nDOCS (2)     : passo 4 do guia SSO inválido [2218] · rate limits da API sem doc [2221]\nPOSITIVO (1) : dark mode elogiado; agendamento pedido [2215]\n\nRISCO TOP: integridade de cobrança — crítico para receita, verificar reembolsos.",
    mid: "Usuários relataram alguns bugs de export e cobrança, e um usuário gostou do dark mode. Vale melhorar a documentação.",
    bad: "Seus usuários estão frustrados com lentidão, quedas frequentes e suporte ruim a mobile. Muitos reclamam da UI confusa e pediram um app mobile...",
  },
};
