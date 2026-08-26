/* PT — V5 A PROVA */
export default {
  name: "A PROVA", skill: "TESTES",
  protocol: { name: "TESTE É A SPEC", desc: "Na era da IA, a suíte é a única coisa que decide se 'parece certo' É certo. Teste comportamento nos caminhos do dinheiro; verde não significa nada se o teste não testa nada." },
  brief: {
    obj: "Cart v2 entra segunda. Um refactor com IA está na fila pra 'limpar' o módulo. A suíte existente está verde e todo mundo se sente seguro — não devia.",
    data: "MÓDULO   : cart.js (totais, cupons, desconto de volume)\nSUÍTE    : test.js — 3 testes, todos passando\nFILA     : refactor com IA agendado antes do release\nSABIDO   : suporte tem 2 tickets de 'totais estranhos' com cupom",
    note: "Suíte verde não prova nada sobre o que ela <b>não</b> asserta. Teste tautológico (esperar o que o código devolve) é a mentira mais reconfortante da era. Escreva teste que PODE falhar — contra a spec, não contra o código.",
    criteria: ["testes podem falhar", "caminhos do dinheiro cobertos", "gate de refactor"],
  },
  lab: {
    task: "Antes do refactor com IA rodar, torne a suíte confiável: ache o que os testes verdes escondem. Há um bug REAL em cart.js — os tickets de 'totais estranhos' são reais.",
    acceptance: ["novos testes assertam valores de SPEC (calculados à mão), não valores copiados da saída atual", "o bug existente é pego por um teste vermelho, depois corrigido, depois verde", "refactor da IA só entra com suíte verde ANTES e DEPOIS", "testes tautológicos reescritos ou deletados, com nota do porquê"],
    catch: "A suíte verde não testa nada: asserte a própria saída de cart.js contra ela mesma. O bug real: cupom + desconto de volume compõem (10% sobre o preço já descontado) — os 'totais estranhos' do suporte. Se você apontar a IA pra 'refatorar e adicionar testes', ela gera mais tautologias em volta do comportamento quebrado e tudo segue verde enquanto cliente paga errado.",
    files: {
      "README.md": "# cart\n\nCart v2 entra segunda. Refactor com IA na fila.\n\nDEMANDA: torne a suíte confiável ANTES do refactor rodar.\n\nAceite:\n- testes assertam valores de spec calculados à mão (não eco da saída)\n- o bug real dos 2 tickets: pego em vermelho, corrigido, verde\n- refactor só entra com suíte verde antes E depois\n\nVerdade de referência: 3 × 20,00, cupom SAVE10, volume≥3 (10%) →\nsubtotal 60,00 → volume → 54,00 → cupom → 48,60 (NÃO 43,74).\n",
    },
  },
  slots: [
    { label: "O QUE TESTAR", options: [
      { t: "Os caminhos do dinheiro com valores calculados à mão: volume, cupom, combo cupom+volume, zero e casos de rejeição.", why: "Comportamento das regras de negócio, assertado contra números de spec que um humano derivou. O combo é exatamente onde o bug mora." },
      { t: "100% de cobertura de linhas de cart.js — cada branch executada ao menos uma vez, porque cobertura é o número que o QA acompanha e 'totalmente coberto' é a definição de módulo que dá pra refatorar com confiança.", why: "Cobertura mede execução, não asserção. dá pra executar branch sem assertar nada — verde, coberto, errado." },
      { t: "Testes de snapshot: grava a saída atual uma vez, falha em qualquer mudança futura — barato de gerar, trava o comportamento de hoje como referência, e a suíte cresce sozinha conforme o módulo evolui.", why: "Pega drift, mas abençoa o comportamento atual como spec — snapshot de bug é bug cartorizado." },
      { t: "Testes de propriedade: carrinhos aleatórios, total ≤ subtotal sempre.", why: "Elegante e verdade — e cego pro bug de composição exato (43,74 ≤ 54 passa). Aleatoriedade não substitui casos de spec nos caminhos do dinheiro." },
    ]},
    { label: "O GATE DO REFACTOR", options: [
      { t: "Suíte verde antes do refactor, IA refatora, suíte verde depois — e os casos de spec são os mesmos números calculados à mão.", why: "O gate que transforma vibe em engenharia: mesmo comportamento provado por asserções de spec, não por diff bonito." },
      { t: "Deixar a IA regenerar os testes depois de refatorar — testes novos pra código novo, escritos juntos, sempre em sinc, e economiza um dia inteiro do time atualizando expectativas à mão.", why: "Testes reescritos pelo mesmo autor do código se adaptam ao bug. A raposa cuida do galinheiro, verde-mente." },
      { t: "Rodar o refactor numa branch; se o diff ler bem, merge.", why: "Diff legível ≠ mesmo comportamento. Leitura pega alguns, suíte pega todos — esse é o trabalho dela." },
      { t: "Pular o refactor deste ciclo — arriscado demais antes de release.", why: "Defensável como decisão, mas esquiva a habilidade: o gate existe pra refactor poder entrar com segurança, sempre — não nunca." },
    ]},
    { label: "O TESTE FLAKY", options: [
      { t: "Quarentena no mesmo dia, caça à causa raiz (estado oculto, tempo ou ordem), corrige, tira da quarentena com nota.", why: "Flakiness é bug do teste ou do sistema — nos dois casos é informação. Quarentena mantém o sinal honesto enquanto você conserta a causa." },
      { t: "Re-rodar até passar — pipeline verde, ticket anda, e francamente falha intermitente em ambiente de teste é fato da vida que todo sênior aprende a contornar.", why: "Maquiagem: cada re-run ensina o time que vermelho quer dizer 'retry', até o dia em que vermelho quer dizer produção pegando fogo." },
      { t: "Deletar o teste flaky; ele tá atrapalhando a velocidade.", why: "Remover o detector de fumaça porque ele é barulhento. A falha intermitente costuma vigiar um bug intermitente." },
      { t: "Marcar como skipped com um TODO pra depois.", why: "Meio honesto — mas o 'depois' chega depois do incidente, e a suíte passa a não contar o que não roda." },
    ]},
  ],
  outcomes: {
    good: "Segunda 10:00 — v2 no ar\n• testes de spec: 9 casos incluindo o combo (48,60, não 43,74) — vermelho, corrigido, verde\n• tautologias deletadas com nota; refactor da IA entrou pelo gate verde\n• os 2 tickets do suporte: causa raiz = cupom duplicado\n→ buscas de 'totais estranhos' no Slack: zero nesta semana.",
    mid: "Segunda 22:00 — publicado\n• refactor entrou num diff de boa leitura; bug no lugar\n• novos snapshots abençoam a saída errada em 43,74\n→ os tickets continuam, agora com cobertura de teste do bug.",
    bad: "Terça — release travado\n• IA gerou 12 tautologias novas; suíte 15-verde e sem sentido\n• bug de cupom dobrou desconto de cliente; finanças notaram primeiro\n→ a suíte em que todo mundo confiava era o motivo de ninguém conferir nada.",
  },
};
