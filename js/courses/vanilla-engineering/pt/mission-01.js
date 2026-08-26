/* PT — V1 A MÁQUINA */
export default {
  name: "A MÁQUINA", skill: "LITERACIA DE RUNTIME",
  protocol: { name: "MEÇA, DEPOIS MUDE", desc: "Software roda numa máquina: RAM, disco, rede. Diagnostique em ordem — reproduza, meça, isole a camada, corrija a causa. Palpite otimizado continua sendo palpite." },
  brief: {
    obj: "Ops reporta que o import noturno de pacientes 'demora uma eternidade'. Pedidos de rewrite se acumulam. Antes de alguém tocar arquitetura, alguém precisa saber ONDE o tempo realmente vai.",
    data: "SERVIÇO  : clinic-sync (python, sem frameworks)\nENTRADA  : patients.csv (~50k linhas em prod, amostra de 200 inclusa)\nSINTOMA  : import completo ≈ 10 min em produção\nSLA      : abaixo de 30s para 50k linhas",
    note: "Literacia de latência: RAM ~100ns, leitura SSD ~100µs, salto de rede ~1–5ms. Uma passada O(n²) desperdiçada anula qualquer escolha de linguagem. Meça antes de acreditar em qualquer história — inclusive a da IA.",
    criteria: ["evidência de profile/timing", "corrigir o custo dominante", "saída idêntica"],
  },
  lab: {
    task: "O import está lento. Trabalhe a demanda com o opencode, ache o custo REAL, corrija — e prove que a saída é idêntica.",
    acceptance: ["import com carga equivalente a 50k em < 30s (raciocinado ou medido)", "saída linha a linha idêntica ao script original", "mudança zero de comportamento: mesmos rejects, mesmas linhas de log"],
    catch: "A fix sedutora é 'reescrever em Go/adicionar threads'. Os dominadores reais: busca em lista dentro do loop (O(n²)) e conexão com o banco reaberta a cada linha. E mais: o README diz 50k, a amostra tem 200 — você testou a hipótese de escala ou só a amostra?",
    files: {
      "README.md": "# clinic-sync\n\nImport noturno de pacientes para o sistema da clínica.\n\nDEMANDA: o import de ~50.000 linhas em produção leva ~10 minutos. Deixe rápido. O negócio sugere 'reescrever numa linguagem mais rápida'.\n\nAceite:\n- < 30s para carga de 50k linhas\n- saída idêntica (imported.txt, rejects.txt)\n- mudança zero de comportamento\n\nAmostra de 200 linhas em data/. O job roda às 02:00.\n",
    },
  },
  slots: [
    { label: "PRIMEIRO INSTRUMENTO", options: [
      { t: "Reescrever import.py em Go — todo mundo sabe que Python é o problema, e o negócio já sugeriu uma linguagem mais rápida.", why: "Sentimento sobre linguagem não é medição. O rewrite mantém o O(n²) e a conexão por linha — agora em Go." },
      { t: "Cronometrar cada etapa com um contador no loop e cProfile na amostra antes de mudar qualquer coisa.", why: "Reproduza e meça primeiro. Dez minutos de profile nomeiam o custo dominante com evidência." },
      { t: "Olhar o uso de CPU do servidor durante o job.", why: "Melhor que adivinhar — mas CPU diz que está ocupado, não ONDE. Profile o caminho do código." },
      { t: "Pedir ao ops o CSV exato de produção pra testar local com o tamanho real.", why: "Dado de produção no notebook quebra o perímetro (cap. 6). Gere um arquivo sintético de 50k." },
    ]},
    { label: "A CORREÇÃO", options: [
      { t: "Trocar a busca em lista por um set (hash) e abrir UMA conexão para a rodada inteira, commitando em lote.", why: "Mata os dois dominadores medidos: O(n²)→O(n) e o overhead de conexão por linha. Mesmo comportamento, ~100× mais rápido." },
      { t: "Adicionar multiprocessing com 8 workers dividindo o CSV — paralelismo é a resposta padrão pra job em lote lento, e o servidor tem cores sobrando na janela noturna de qualquer forma.", why: "Paralelizar um scan O(n²) e conexões por linha multiplica o desperdício — e cria corrida de inserts duplicados." },
      { t: "Mover a busca pro SQL com índice: SELECT ... WHERE mrn=? por linha — o banco tem índice exatamente pra isso, é o lugar convencional da busca, e elimina a lista em memória inteira.", why: "Funciona, mas mantém um round trip por linha — query-por-linha é a mesma doença em outro órgão." },
      { t: "Reescrever em Go com um map para as buscas.", why: "A parte do map está certa — o rewrite é custo não medido, superfície nova de review e zero evidência de que era a linguagem." },
    ]},
    { label: "A VERIFICAÇÃO", options: [
      { t: "Rodar versão velha e nova na mesma entrada, diffar imported.txt e rejects.txt linha a linha, e testar carga com 50k gerado.", why: "Identidade de saída + teste de escala = critérios de aceite provados, não prometidos." },
      { t: "Os testes unitários continuam passando, então o refactor é seguro.", why: "Não havia testes — e suíte verde não prova identidade de saída num refactor de performance." },
      { t: "Rodar uma vez na amostra de 200 — rápido o bastante é feito.", why: "Amostra não prova nada sobre 50k: O(n²) é exatamente o custo que se esconde com n pequeno." },
      { t: "Publicar com flag às 02:00 e assistir os logs ao vivo; reverter se ainda estiver lento — produção é onde o dado real mora, então é onde o teste real pertence, e a flag mantém tudo reversível.", why: "Produção não é o primeiro instrumento. Você debugaria às 2h o que um diff pegaria às 14h." },
    ]},
  ],
  outcomes: {
    good: "02:01 — import em 14s (50k linhas)\n• evidência de profile: 71% scan de lista, 24% churn de conexão\n• fix: set + conexão única + commits em lote\n• diff velho-vs-novo: idêntico (50k imports, 12 rejects)\n→ o ticket 'rewrite em Go' fechado como wontfix, com o profile anexado.",
    mid: "02:01 — import em 6 min\n• lookup SQL por linha adicionado; churn de conexão mantido\n• saídas idênticas, mas o O() continua errado sob crescimento\n→ SLA furado; ninguém sabe dizer por que só melhorou um pouco.",
    bad: "02:00 — go-clinic-sync v0.1 no ar\n• rewrite total numa linguagem nova, mesmo algoritmo dentro\n• 9min40s, um bug novo de insert duplicado, duas semanas de review\n→ a máquina nunca foi o problema; ninguém mediu nada.",
  },
};
