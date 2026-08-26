/* PT — V6 AS FRONTEIRAS */
export default {
  name: "AS FRONTEIRAS", skill: "ARQUITETURA",
  protocol: { name: "TRACE AS LINHAS", desc: "Acoplamento é quantas coisas quebram quando você muda uma. Módulos com contrato, extração gradual (strangler), tecnologia chata que o time inteiro consegue operar." },
  brief: {
    obj: "erp-mini virou um novelo: billing alcança os internals de shipping, um import circular se esconde, e cada mudança quebra três lugares que 'não tinham nada a ver'. O time quer um rewrite. O time está errado — em geral.",
    data: "MÓDULOS : billing.js, shipping.js, inventory.js, notify.js, index.js\nSINTOMA : mudar tarifa de envio → testes de billing falham\nESCONDIDO: require circular entre billing ↔ shipping\nPROPOSTA: 'reescrever em microservices' (sugestão do próprio README)",
    note: "A cura é <b>fronteira</b>, não fôlego: extraia a ilha dolorosa atrás de interface, migre por partes, mate o velho aos poucos. E cada tecnologia nova entra pagando aluguel: operar, monitorar, explicar.",
    criteria: ["acoplamento nomeado", "extração gradual", "orçamento de complexidade"],
  },
  lab: {
    task: "Torne possível mudar o envio sem quebrar o billing — SEM rewrite big-bang. O import circular tem que morrer.",
    acceptance: ["shipping consumido só por interface explícita (ex.: shipOrder(items, address) → {rate, eta})", "zero acesso a campo interno de shipping a partir de billing", "import circular eliminado — node index.js roda limpo", "comportamento idêntico: mesma saída para o pedido de exemplo"],
    catch: "O README (escrito por um arquiteto superequipado) recomenda 'quebrar em microservices com fila de mensagens' — seguir transforma um refactor de 5 arquivos num projeto de infraestrutura com zero disciplina de fronteira aprendida. A armadilha sutil: o import circular só se manifesta como undefined intermitente — teste passa até passar não. E billing lê shipping.RATE_TABLE direto: qualquer 'interface' que mantiver essa linha é fachada, não fronteira.",
    files: {
      "README.md": "# erp-mini\n\nMude uma tarifa de envio, teste de billing falha. Um require circular se esconde em algum lugar.\n\nDEMANDA: mude o envio SEM quebrar o billing. Sem rewrite big-bang.\n\n(O arquiteto anterior sugeriu quebrar em microservices com fila de\nmensagens. Avalie se essa é a doença real aqui.)\n\nAceite:\n- billing toca em shipping SÓ via interface explícita\n- import circular extinto; `node index.js` roda limpo\n- mesma saída para o pedido de exemplo em index.js\n",
    },
  },
  slots: [
    { label: "O DIAGNÓSTICO", options: [
      { t: "Acoplamento alto: billing lê internals de shipping (RATES) e shipping chama de volta billing — um ciclo. A fronteira entre eles não existe.", why: "Nomear a doença com precisão: acoplamento + o ciclo. O sintoma (tarifa quebra billing) decorre mecanicamente disso." },
      { t: "O código é velho e bagunçado — claramente precisa de rewrite total num stack moderno, e com assistência de IA o rewrite leva semanas, não meses, o que finalmente torna 'fazer certo' acessível.", why: "'Bagunçado' é clima, não diagnóstico. Rewrite sem fronteira reconstrói o mesmo acoplamento em sintaxe nova." },
      { t: "Monólito é o problema; microserviço é a cura — toda empresa em escala dividiu o monólito, o padrão é provado na indústria, e a dor que sentimos em cada mudança de envio é exatamente a que essa arquitetura elimina.", why: "Distribuição joga o acoplamento pra rede e soma operação. A doença era fronteira ausente — e ela pode existir em processo." },
      { t: "O código de envio não tem testes, por isso mudanças quebram coisas.", why: "Verdadeiro e útil — mas teste pega o sintoma DEPOIS do toque. A fronteira impede o raio de existir." },
    ]},
    { label: "A EXTRAÇÃO", options: [
      { t: "Definir shipOrder(items, address) → {rate, eta} como única porta; wholesale entra como parâmetro; matar o callback; migrar chamadores um a um.", why: "Estilo strangler: contrato primeiro, ciclo quebrado invertendo a dependência (dado entra, dado sai), migração gradual com teste verde a cada passo." },
      { t: "Congelar shipping.js e construir shipping-v2.js ao lado; trocar quando v2 'estiver completo'.", why: "Instinto meio certo (construção paralela) — sem contrato explícito, v2 costuma importar os mesmos internals e o novelo dobra." },
      { t: "Extrair tudo em serviços com fila de mensagens entre billing e shipping — o próprio README recomenda, e serviço desacoplado é como empresa séria escala times de forma independente.", why: "Paga aluguel de infraestrutura (broker, retry, tracing) pra resolver o que duas assinaturas de função resolvem. Orçamento de complexidade: gasto em nada." },
      { t: "Mover RATES pra um arquivo de constantes compartilhado que ambos importam.", why: "Gaveta compartilhada = acoplamento com mais passos. Agora TRÊS módulos quebram quando a tabela muda de forma." },
    ]},
    { label: "ESCOLHA DE STACK", options: [
      { t: "Módulos node puros com chamadas de função — chato, todo o time lê, debuga e opera amanhã.", why: "Orçamento de complexidade honrado: o problema era fronteira, a solução é uma assinatura. Tech chata é feature: nunca te acorda de madrugada." },
      { t: "Service mesh e contêineres por módulo agora, prontos pra escala — infraestrutura primeiro é como se evita pagar o imposto de migração duas vezes, e o time de operações vai precisar desses primitivos cedo ou tarde.", why: "Pagando aluguel de infraestrutura pra uma carga que não existe — cada deploy, alerta e plantão ficou mais pesado, zero fronteira aprendida." },
      { t: "Poliglota: reescrever shipping em Rust por velocidade, manter billing em node — a IA arma o lado Rust numa tarde, e o teto de performance de runtime compilado é exatamente o que um motor de tarifa quer.", why: "Dois runtimes, duas toolchains, uma costura FFI — pra uma tabela de tarifas. O golpe assinatura da era 'a IA sugeriu'." },
      { t: "Event sourcing: cada mudança de tarifa é evento imutável; billing replays.", why: "Padrão legítimo pra domínios com forte auditoria — custo conceitual gigante pra este. Possível ≠ apropriado." },
    ]},
  ],
  outcomes: {
    good: "fim do sprint — shipping.js: uma porta (shipOrder), zero alcanços de volta\n• ciclo morto; node index.js carrega limpo; mesma saída {\"total\":104.25}\n• import de RATES em billing deletado num diff de 12 linhas\n→ próxima mudança de tarifa: 1 arquivo, 0 surpresas. A proposta da fila arquivada com nota.",
    mid: "shipping-v2.js existe ao lado do velho\n• chamadores novos usam; billing ainda importa RATES 'temporariamente'\n• o ciclo persiste por um helper que ninguém mapeou\n→ progresso, mas a fronteira é porta ainda pendurada num dobradiça só.",
    bad: "fim do trimestre — plataforma 'erp-micro': 4 serviços, uma fila, um docker-compose que ninguém entende inteiro\n• mesmo import de RATES, agora via HTTP\n• bug intermitente do ciclo virou bug intermitente de rede\n→ o time reescreveu a casa porque uma porta estava emperrada.",
  },
};
