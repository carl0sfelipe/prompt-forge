/* PT — M1 A NÉVOA */
export default {
  name: "A NÉVOA", skill: "ESPECIFICIDADE",
  protocol: { name: "PROTOCOLO S.P.E.C.", desc: "Nunca envie um pedido vago. Especifique Sujeito, Propósito, Extensão e Constraints — o modelo otimiza exatamente o que você diz, não o que você quis dizer." },
  brief: {
    obj: "Seu lead quer um e-mail anunciando o 'Launchpad', o novo recurso de deploy em um clique do time, para os clientes atuais. A última tentativa voltou mush genérico. Mate a névoa.",
    data: "PRODUTO : Launchpad\nO QUÊ   : deploy em um clique para qualquer cloud\nPARA    : clientes atuais (times de SaaS)\nBENEFÍCIO: deploy de 45 min → 90 segundos\nLANÇAMENTO: 12/nov\nCTA     : \"Teste no seu próximo release\"",
    note: "A vagueza colapsa quando você declara <b>Sujeito · Propósito · Extensão · Constraints</b>. Cada detalhe omitido é uma decisão entregue ao acaso.",
    criteria: ["120 palavras", "formato e-mail", "usa os fatos", "ângulo de tempo economizado"],
  },
  slots: [
    { label: "NÚCLEO DA TAREFA", options: [
      { t: "Escreva algo verdadeiramente impactante e de alto impacto sobre o Launchpad que mostre bem o quão inovador e revolucionário ele é para os nossos clientes.", why: "Buzzword empilhada em buzzword — muita energia, zero informação. O modelo devolve a sua vagueza com entusiasmo." },
      { t: "Escreve alguma coisa legal sobre o Launchpad.", why: "Sem sujeito, sem propósito — o modelo adivinha, e adivinha genérico." },
      { t: "Escreva um comunicado sobre nosso novo recurso de deploy.", why: "Direção certa, mas público, tamanho e ângulo continuam entregues à sorte." },
      { t: "Escreva um e-mail de anúncio de 120 palavras para clientes atuais apresentando o Launchpad, abrindo com o dado de 45min → 90s.", why: "Sujeito + propósito + extensão + ângulo. Zero espaço para adivinhação." },
    ]},
    { label: "PÚBLICO + OBJETIVO", options: [
      { t: "Escreva para absolutamente todos — clientes, prospects, parceiros e o mundo inteiro — mantenha divertido, leve e super casual.", why: "'Todos' é ninguém. Um prompt mirando em todas as audiências produz mush para todas." },
      { t: "Escreva para absolutamente todos — clientes, prospects, parceiros e o mundo inteiro — mantenha divertido, leve e super casual.", why: "'Todos' é ninguém. Um prompt mirando em todas as audiências produz mush para todas." },
      { t: "Escreva para times técnicos.", why: "Público nomeado, mas sem resultado desejado — o que devem fazer depois de ler?" },
      { t: "Público: líderes de engenharia SaaS afogados em release. Objetivo: testar o Launchpad no próximo release.", why: "Público + comportamento desejado. Agora o prompt consegue mirar de verdade." },
    ]},
  ],
  outcomes: {
    good: "Assunto: Ship em 90 segundos — o Launchpad chegou\n\nVocês fazem deploy com a gente faz tempo, então seremos diretos: deploys que levavam 45 minutos agora levam 90 segundos.\n\nLaunchpad — nosso novo deploy em um clique — vai ao ar em 12/nov. Mesmo pipeline, zero YAML, um botão.\n\n→ Teste no seu próximo release.",
    mid: "Apresentando o Launchpad!\n\nEstamos animados para anunciar nosso novo recurso de deploy. Ele ajuda os times a entregar mais rápido e melhora seu fluxo de trabalho de várias formas. O Launchpad é fácil de usar e poderoso.\n\nExperimente hoje!",
    bad: "Claro! Aqui vai algo sobre o Launchpad:\n\nLaunchpad é uma solução inovadora de nova geração que aproveita sinergias cloud-native para capacitar stakeholders por todo o paradigma de deploy. No cenário digital acelerado de hoje, o Launchpad revoluciona a jornada...",
  },
};
