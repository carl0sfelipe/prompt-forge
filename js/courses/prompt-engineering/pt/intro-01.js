/* PT — I1 PRIMEIRO CONTATO */
export default {
  name: "PRIMEIRO CONTATO", skill: "FUNDAMENTOS DE IA",
  protocol: { name: "O ESTAGIÁRIO LITERAL", desc: "O modelo é um estagiário brilhante e incansável, com zero contexto sobre você: ele faz exatamente o que você pede — não o que você quis dizer — e não lê sua mente, seus arquivos nem o chat da empresa." },
  brief: {
    obj: "Primeiro dia com o assistente de IA da empresa. O conselho do seu gerente: 'é só falar com ele como se fosse uma pessoa'. Você precisa que ele resuma a reunião de ontem do time antes do seu primeiro 1:1 com a Dana.",
    data: "VOCÊ TEM   : as notas da reunião (um doc no seu notebook)\nA IA TEM   : acesso a nada — nem notebook, nem arquivos, nem chat\nOBJETIVO   : resumo em 5 tópicos para o 1:1",
    note: "O modelo é um <b>estagiário literal</b>: brilhante, incansável e cego para tudo que você não colar. Ele completa suas palavras — não lê sua mente.",
    criteria: ["colar as notas", "5 tópicos", "nada inventado"],
  },
  slots: [
    { label: "MODELO MENTAL", options: [
      { t: "É um oráculo onisciente que já entende nossa empresa, nossos produtos e nossos objetivos, então perguntas curtas e casuais bastam para conseguir ótimas respostas.", why: "Ele não sabe nada sobre a sua empresa até você contar. Tratá-lo como onisciente produz ficção com confiança." },
      { t: "É um buscador que encontra respostas prontas.", why: "Ele não busca — ele gera. Sem os seus dados, ele inventará um resumo plausível de uma reunião que nunca viu." },
      { t: "É um chatbot esperto que conversa como uma pessoa.", why: "Meio certo: ele conversa como pessoa — mas não tem acesso ao seu mundo a não ser que você o forneça." },
      { t: "É um motor de texto: ele completa meu pedido a partir exatamente das palavras e dados que eu dou — e nada mais.", why: "O modelo mental correto: entra entrada, sai completude. O que você quer que seja usado, você precisa fornecer." },
    ]},
    { label: "PRIMEIRO PROMPT", options: [
      { t: "Oi! Sou novo aqui e super animado por entrar no time. Adoraria qualquer ajuda para me atualizar sobre como as coisas funcionam por aqui, muito obrigado!", why: "Simpático, mas sem tarefa, sem dados e sem formato. A IA só consegue devolver a névoa que recebeu." },
      { t: "Resume as notas.", why: "Quais notas? A IA não pode vê-las — você vai receber um resumo inventado." },
      { t: "Resuma minhas notas da reunião.", why: "Mais perto — mas as notas ainda estão no seu notebook. Sem colar, o modelo inventa." },
      { t: "Resuma as notas de reunião coladas abaixo em 5 tópicos, um por decisão.", why: "Tarefa + dados + formato. O estagiário agora tem tudo o que precisa para trabalhar de verdade." },
    ]},
  ],
  outcomes: {
    good: "• Roadmap do Q3 cortado para 3 prioridades: reformulação de pagamentos, beta mobile, SSO enterprise\n• Beta mobile sai em 14/out — responsáveis: Ana + Rafael\n• SSO enterprise travado na jurídica; Dana vai escalonar\n• Contratações: 2 vagas de backend aprovadas, entrevistas começam na próxima semana\n• Ação de retro: cortar 20% das reuniões — piloto começa segunda",
    mid: "• O time discutiu o roadmap e algumas prioridades\n• Houve atualizações sobre recursos mobile e enterprise\n• Algumas coisas estão travadas e serão revisitadas\n• Contratações foram mencionadas",
    bad: "• A reunião foi produtiva e muitos temas foram abordados\n• O time se alinhou na estratégia e nos próximos passos\n• Vários itens de ação foram distribuídos e prazos discutidos\n• Houve ótima energia e comprometimento de todos",
  },
};
