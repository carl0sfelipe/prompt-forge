/* PT — V2 A FONTE DA VERDADE */
export default {
  name: "A FONTE DA VERDADE", skill: "CONTROLE DE VERSÃO",
  protocol: { name: "HISTÓRICO É FERRAMENTA", desc: "O Git é a memória auditável de por que o sistema é o que é. Bisect pra achar o culpado, revert sem reescrever histórico compartilhado, commits que explicam o porquê." },
  brief: {
    obj: "Sexta 18:07. Cliente liga: totais de nota errados desde o deploy da manhã. O repo tem ~8 commits desde a última tag verde. Alguém tem que achar o commit culpado e devolver a sanidade à produção — rápido.",
    data: "REPO     : billing-web (node, http puro)\nÚLTIMO OK: tag v1.4 (confirmada pela tarde do cliente)\nSINTOMA  : total dobrado (2×) em alguns itens\nPRESSÃO  : cliente assistindo, correção antes de segunda",
    note: "Mensagem de commit é afirmação, não evidência — uma delas mente. A ferramenta que não mente é a <b>busca binária no histórico</b>: `git bisect` entre a última tag boa e o HEAD, com um teste de oráculo.",
    criteria: ["culpado achado por bisect", "histórico preservado", "teste como oráculo"],
  },
  lab: {
    task: "O zip contém o repo COM o histórico .git. Ache o commit que quebrou o total da nota, reverta direito e preserve o histórico.",
    acceptance: ["node test.js passa na árvore final", "commit culpado identificado e nomeado (hash + mensagem)", "histórico preservado: reverts/fixes são commits NOVOS, sem force-push nem rebase do trabalho compartilhado"],
    catch: "Um commit diz literalmente 'fix invoice rounding' — e é inocente. O culpado real é uma mudança silenciosa enterrada num commit com nome de outra coisa ('chore: tweak utils'). Se você confiou nas mensagens (ou deu blame na linha errada), reverteu a coisa errada. E se 'consertou' editando o arquivo direto, o histórico agora mente sobre o que aconteceu.",
    files: {
      "README.md": "# billing-web\n\nDEMANDA: totais de nota errados desde a manhã. Último bom conhecido: tag v1.4.\n\n1. Ache o commit culpado (~8 desde v1.4).\n2. Devolva a sanidade — SEM reescrever histórico compartilhado.\n3. `node test.js` deve passar no final.\n\nDica: `git bisect start v1.4 HEAD` — deixe o teste ser o oráculo.\n",
    },
  },
  slots: [
    { label: "A CAÇADA", options: [
      { t: "git bisect entre v1.4 e HEAD rodando test.js a cada passo — o teste decide bom/ruim, não eu.", why: "Busca binária no histórico com oráculo de máquina: ~3 passos até o culpado, imune a mensagens mentirosas." },
      { t: "Ler o commit que diz 'fix invoice rounding' e reverter aquele — a mensagem bate com o sintoma.", why: "Mensagens são afirmações. Essa mente. Você reverteria um inocente e manteria o bug." },
      { t: "git blame na linha alterada de billing.js pra ver quem tocou por último — blame dá autoria com data, e quem mexeu na linha do dinheiro logo antes do sintoma começar é onde toda investigação sensata começa.", why: "Bom instinto, linha errada — o culpado mora em utils.js. Blame acha autoria, não causalidade entre arquivos." },
      { t: "Diffar todo commit manualmente desde v1.4 até algo parecer estranho.", why: "Funciona eventualmente, não escala, e 'parecer estranho' é exatamente o que culpados silenciosos evitam. Automatize o oráculo." },
    ]},
    { label: "A RECUPERAÇÃO", options: [
      { t: "git revert <culpado> na branch atual, rodar a suíte, publicar o commit de revert.", why: "Commit novo que cancela o ruim: produção sã, histórico honesto, reversível por si." },
      { t: "git reset --hard v1.4 e force-push — árvore a mais limpa possível, instantaneamente de volta ao último estado que o cliente confirmou bom, e francamente o caminho mais rápido pra uma sexta tranquila.", why: "Detona 5 commits inocentes (incluindo uma feature de demo) e reescreve histórico compartilhado. Segunda de manhã: dois repos, zero verdade." },
      { t: "Editar utils.js de volta na mão, commitar 'fixed it', pushar.", why: "Árvore certa, histórico errado — o vínculo causal entre culpado e correção ficou invisível pra futura arqueologia." },
      { t: "Checkout v1.4, publicar aquilo, e resolver o resto na semana que vem.", why: "Voltar o mundo inteiro pra consertar uma linha joga fora uma semana de merges — e o time segue sem saber o culpado." },
    ]},
    { label: "HIGIENE DE COMMIT", options: [
      { t: "Commits pequenos e atômicos; mensagem explica o PORQUÊ ('double-rounding em utils quebrou totais'), não o quê.", why: "O porquê é a única coisa que o futuro-você não reconstrói do diff. E é o que torna bisect e blame confiáveis." },
      { t: "Um commit grandão no fim do dia com tudo dentro — 'friday updates' — o time mantém velocidade e ninguém gasta a semana de lançamento catando estilo de mensagem em vez de entregar.", why: "Faz todo bisect futuro cair num mega-commit onde o oráculo não isola nada." },
      { t: "Prefixos convencionais e nada mais: 'fix: stuff', 'chore: things'.", why: "Prefixos ajudam ferramenta, mas 'stuff' carrega zero porquê. Metade do valor com cara de completo — perigoso." },
      { t: "Mensagens detalhadas descrevendo cada linha mudada em prosa.", why: "O diff já diz o que mudou. Prosa que espelha o diff é ruído que envelhece mal; diga o porquê, uma vez." },
    ]},
  ],
  outcomes: {
    good: "18:31 — culpado isolado em 3 passos de bisect: a87c3f 'chore: tweak utils' (*200 silencioso em round2)\n• git revert a87c3f → test.js verde → deploy 18:40\n• mensagem do revert explica a cadeia do sintoma 2×\n→ segunda: o histórico conta a história inteira; o commit mentiroso ganhou um comentário.",
    mid: "19:15 — utils.js editado à mão de volta pra *100, pushado como 'fixed rounding'\n• teste verde, cliente calmo\n• commit culpado nunca identificado — a cadeia do 'porquê' se perdeu\n→ na próxima regressão, alguém lê 'fix invoice rounding' e cai no buraco errado de novo.",
    bad: "21:40 — force-push de um reset pra v1.4 depois de reverter o commit errado sem efeito\n• feature de demo de quinta: evaporou\n• dois colegas com repos divergentes; ninguém confia na origin\n→ produção sã, memória coletiva destruída. Esse é o outage real.",
  },
};
