/* PT — I2 O LOOP */
export default {
  name: "O LOOP", skill: "ITERAÇÃO",
  protocol: { name: "RASCUNHO ZERO", desc: "A primeira saída é o rascunho zero, não a entrega final. Os follow-ups dirigem: aponte o que está errado e nomeie a correção. Feedback vago gera revisão vaga." },
  brief: {
    obj: "A IA redigiu um post de anúncio do novo modo offline do seu app. São 240 palavras de mush corporativo. Seu público são usuários mobile casuais e você tem espaço para 80 palavras.",
    data: "RASCUNHO : 240 palavras, tom corporativo, sem CTA\nCANAL    : pop-up no app (máx. 80 palavras)\nPÚBLICO  : usuários mobile casuais\nMANTER   : \"funciona com zero internet\"",
    note: "Prompting profissional é um <b>loop</b>: executar → ler → dirigir. Cada follow-up é um volante — mire em defeitos específicos, não na saída inteira.",
    criteria: ["80 palavras", "tom casual", "manter a promessa"],
  },
  slots: [
    { label: "PRIMEIRA REAÇÃO", options: [
      { t: "Aceitar como está — o modelo trabalhou duro nisso, o texto soa profissional, e pedir mudanças pode confundi-lo ou de alguma forma piorar o resultado.", why: "Educação não é revisão. Soar profissional é exatamente o defeito aqui — seu público é casual." },
      { t: "Jogar fora e começar de novo.", why: "Você perde um rascunho zero aproveitável. Ele está ~70% certo — itere sobre o que existe." },
      { t: "Pedir para tentar de novo.", why: "Tentativa sem direção relança os mesmos dados. Ele não advinha o que te incomodou." },
      { t: "Manter os fatos e nomear as correções exatas: cortar para 80 palavras, tom casual, fechar com um toque-no-saiba-mais.", why: "Direção específica: o que sobrevive (fatos) e o que muda (tamanho, tom, CTA). O loop converge." },
    ]},
    { label: "MANOBRA DE AJUSTE", options: [
      { t: "Por favor, melhore todos os aspectos deste texto — a estrutura, o fluxo, o vocabulário, o poder de persuasão, a ressonância emocional, o call to action, absolutamente tudo.", why: "'Tudo' não define prioridade. O modelo vai adivinhar o que 'melhor' significa — normalmente, mais longo e mais rebuscado." },
      { t: "Melhora isso.", why: "Melhor como? Mais curto? Mais divertido? O modelo escolhe a dimensão no aleatório." },
      { t: "Deixa mais curto e mais casual.", why: "Duas dimensões nomeadas — mas sem teto firme e sem CTA: você vai dar mais uma volta no loop." },
      { t: "Reescreva com máx. 80 palavras, tom casual (emoji ok), mantenha \"funciona com zero internet\", termine com \"Toque para ver como\".", why: "Toda correção é verificável: limite de palavras, tom, frase obrigatória, fecho obrigatório. Uma passada acerta." },
    ]},
  ],
  outcomes: {
    good: "O modo offline chegou 📶❌\nSeu app agora funciona com zero internet. Notas, checklists, rascunhos — tudo continua andando no avião, no túnel, na praia.\n\nToque para ver como.",
    mid: "Estamos felizes em anunciar que o modo offline chegou! Agora você pode continuar usando suas notas e checklists sem conexão com a internet em diversas situações. Experimente na próxima vez que estiver offline!",
    bad: "Após extensa deliberação, aprimoramos de forma abrangente o paradigma offline do nosso aplicativo para sinergizar holísticamente com o seu estilo de vida móvel, aproveitando capacidades de ponta para garantir continuidade de experiência em ambientes sem conectividade...",
  },
};
