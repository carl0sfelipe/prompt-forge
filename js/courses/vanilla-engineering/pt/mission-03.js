/* PT — V3 A INTERFACE */
export default {
  name: "A INTERFACE", skill: "DESIGN DE API",
  protocol: { name: "CONTRATOS ENTRE ESTRANHOS", desc: "Sua API é lida por consumidores que nunca leram seu código — incluindo seu app de 6 meses atrás. Status com semântica, idempotência em todo verbo de dinheiro, evolução sem quebra." },
  brief: {
    obj: "O time mobile reporta cobranças duplicadas quando o app retenta em rede instável. A API de pagamentos já tem 'uma checagem' — supostamente. Jurídico fazendo perguntas.",
    data: "ENDPOINT : POST /charges (node http puro)\nSINTOMA  : mesma cobrança duas vezes quando mobile retenta\nEXISTENTE: checagem if (req.body.sameCard) em server.js\nCONSUMIDOR: app mobile v2.4 (auto-retry 1× após timeout)",
    note: "Rede reenvia. Não é bug, é física — então verbos de dinheiro têm de ser <b>idempotentes</b>: o consumidor fornece uma chave, o servidor devolve o resultado ORIGINAL na repetição. Dedup-por-conteúdo (mesmo cartão, mesmo valor) quebra o caso dos dois cafés.",
    criteria: ["retry seguro", "semântica de status", "sem breaking change"],
  },
  lab: {
    task: "Torne POST /charges seguro sob retry sem quebrar o formato de resposta atual. A checagem de 'dedup' existente é suspeita — investigue com o opencode antes de confiar.",
    acceptance: ["2º POST com a mesma Idempotency-Key devolve a MESMA cobrança (mesmo id), não uma nova", "duas cobranças legítimas idênticas (chaves diferentes) passam — o caso dos dois cafés", "shape do body 201 inalterado para cobranças novas; erros com status de verdade (4xx/5xx), nunca 200"],
    catch: "A checagem sameCard existente PARECE dedup e bloqueia silenciosamente o caso dos dois cafés (dois cafés idênticos minutos depois = um bloqueado). E a 'correção' tentadora — devolver 200 com {error:...} — envenena o tratamento de erro de todo cliente. E mais: o servidor loga número de cartão inteiro; consertar retry deixando o log assim é fechar uma brecha pra deixar outra aberta.",
    files: {
      "README.md": "# payments-api\n\nDEMANDA (do time mobile): 'recebemos cobranças duplicadas quando retentamos após timeout.'\n\nTorne POST /charges seguro sob retry SEM quebrar o formato usado pelo mobile v2.4.\n\nAceite:\n- mesma Idempotency-Key → mesmo id de cobrança, sem segunda captura\n- chaves diferentes, mesmo cartão+valor → AMAS passam\n- cobranças novas continuam 201 com o body atual\n- erros: status de verdade (nunca 200-com-error)\n\nTeste: curl -H 'Idempotency-Key: abc' -d '{...}' localhost:3000/charges\n",
    },
  },
  slots: [
    { label: "O BUG DE RETRY", options: [
      { t: "Aceitar header Idempotency-Key: cobrança guardada por chave; repetição devolve a cobrança original com o status original.", why: "Idempotência por chave do consumidor: determinística sob qualquer padrão de retry, e o caso dos dois cafés funciona (chaves diferentes)." },
      { t: "Ampliar a checagem existente: bloquear mesmo cartão E valor dentro de 10 minutos — constrói em cima de código que já existe, é mudança de duas linhas, e mira direto na janela de retry que o mobile descreveu.", why: "Dedup-por-conteúdo é heurística com vítimas — o café do aeroporto, o parquímetro, as duas assinaturas. Janela de tempo adivinha; chave sabe." },
      { t: "Devolver 409 Conflict na suspeita de duplicado — 409 é a resposta semanticamente correta de 'estado conflitante', nunca cobra duas vezes, e consumidores sofisticados tratam conflito direito.", why: "Não duplica, mas o cliente não distingue 'já pago' de 'conflito' — tickets de suporte com comprovante anexado." },
      { t: "Fazer o app mobile parar de retentar pagamentos.", why: "Você não corrige a física (nem todo consumidor já escrito). O servidor tem de ser seguro sob retry por contrato." },
    ]},
    { label: "SEMÂNTICA DE STATUS", options: [
      { t: "201 criou (cobrança nova), 200 (replay idempotente), 400 malformado, 401/403 auth, 500 falha de captura — o código É o contrato de erro.", why: "Semântica de status permite que todo cliente, proxy e monitor interprete erro sem ler sua mente." },
      { t: "Sempre 200 com {error: '...'} no body — um único caminho de parse pro mobile, código de cliente mais simples, e sinceramente a maioria das APIs internas que eles já usaram funcionava exatamente assim.", why: "O crime clássico de interface: sucesso no HTTP, falha no negócio. Retry, monitor e cache todos se comportam mal." },
      { t: "Usar 400 pra tudo errado, com um campo reason.", why: "Melhor que 200-com-error, mas achata auth vs validação vs falha de servidor — cliente não consegue reagir direito." },
      { t: "Espelhar o que os endpoints v1 antigos faziam, por consistência.", why: "Consistência com contrato quebrado multiplica a quebra. Corrija o contrato, versione a mudança." },
    ]},
    { label: "EVOLUÇÃO", options: [
      { t: "Chave como aditivo opcional: clientes antigos intactos, retry seguro pra quem adotar o header, docs deprecando a checagem por conteúdo.", why: "Evolução aditiva — nenhum consumidor quebra, migração por pull. Os estranhos (incluindo builds antigos) ficam seguros." },
      { t: "Exigir Idempotency-Key imediatamente em todos os clientes — correção vem primeiro, o mobile embarca o header num patch de emergência, e adoção parcial já corta metade das duplicatas.", why: "Todo celular v2.4 em campo falha ao mesmo tempo. Correção entregue brutalmente é outage." },
      { t: "Versionar o endpoint: /v2/charges com chave desde o dia um, deprecar /charges com sunset header no próximo trimestre — versionar é o caminho de livro-texto pra introduzir requisito quebrador sem traumatizar a base instalada.", why: "Defensável pra mudanças semânticas maiores; aqui um header opcional alcança o mesmo sem trabalho de consumidor." },
      { t: "Renomear o campo pra retryKey já que vai mexer — nome mais claro, API mais limpa.", why: "Renomear é quebrar. 'Mais limpo' pra você é crash loop pra todo consumidor deployado." },
    ]},
  ],
  outcomes: {
    good: "cobrança com key=abc retentada 3× → uma captura, um id, replays devolvem 200 com o body original\n• dois cafés, chaves diferentes: ambos 201\n• números de cartão fora dos logs (só last4)\n→ mobile embarca o header no próximo release; jurídico fecha o ticket com o transcript.",
    mid: "janela de retry ampliada pra 10 min + 409 na suspeita\n• duplicadas quase sumiram; o café do aeroporto bloqueado uma vez por semana\n• clientes não distinguem replay de conflito — suporte absorve a ambiguidade",
    bad: "200-com-{error} publicado 'pra facilitar o parse'\n• todo monitor verde enquanto capturas falham em silêncio; retry agora erra duas vezes\n• cartão inteiro nos logs — a brecha original, aberta, mais um contrato pra desmontar",
  },
};
