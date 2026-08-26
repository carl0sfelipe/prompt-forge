/* PT — VT A PROVA DO STACK */
export default {
  name: "A PROVA DO STACK", skill: "JULGAMENTO FULL-STACK",
  protocol: { name: "A CADEIRA DO OPERADOR", desc: "Persona + runtime + dados + controle de mudança + segurança + onde roda a inteligência — montados sob pressão. O exame final de tudo, incluindo saber quando a IA está confiantemente errada." },
  brief: {
    obj: "PROVA DE CERTIFICAÇÃO. clinica-api v2 entra segunda: endpoint novo de triagem (resumo com IA), reclamação de performance, achado de audit bloqueante e um memo perguntando local-vs-API pra feature de IA. Você conduz a mesa. Um plano — pra tudo.",
    data: "SERVIÇO  : clinica-api (node + sqlite)\nFEATURE  : POST /triage — notas de paciente → resumo por IA (NOVO)\nHARDWARE : 1× RTX 3090 ociosa no rack (27B local)\nAPIS     : frontier via API (por token) ou flash\nACHADOS  : /report = 9s; chave em config.js; suíte = 2 tautologias\nMEMO     : DEPLOY.md (pergunta do fundador: local vs API)",
    note: "Tudo ao mesmo tempo — essa é a cadeira. A pegadinha das pegadinhas: a IA vai propor cada decisão com confiança; seu trabalho é o <b>veredito</b> em cada uma, com os números que você verificou.",
    criteria: ["roteamento justificado", "todos os eixos cobertos", "saída de IA verificada"],
  },
  lab: {
    task: "Conduza o lançamento da v2: leia DEPLOY.md e os achados de audit, decida o roteamento de modelo e entregue o checklist de lançamento com o opencode. Cada decisão com uma linha de justificativa amarrada em evidência.",
    acceptance: ["DEPLOY.md respondido com tabela de roteamento: qual tarefa → 3090 local / frontier API / flash — com o porquê de privacidade, custo e latência", "problema do /report com causa raiz (mesma família de doença da V1) com raciocínio medido", "chave fora do repo + rotacionada; validação da entrada do /triage; suíte elevada a testes de spec", "checklist de lançamento: ambientes, passo de rollback, primeiro alerta — uma página"],
    catch: "A moldura tentadora do DEPLOY.md é 'local é grátis vs API é barato pra começar' — mas triagem processa NOTA DE PACIENTE: privacidade vira a mesa antes do custo sentar (e a 3090 está ociosa PORQUE ninguém a enquadrou como ativo de fronteira de dado). Segunda camada: a lentidão do /report é a doença da V1 de novo (query por linha), e o auditor-IA vai chamar a suíte de 2 tautologias de 'cobertura' — até você contar o que os testes assertam de verdade.",
    files: {
      "README.md": "# clinica-api — cadeira do lançamento v2\n\nSegunda: v2 entra com POST /triage (resumo por IA de notas de paciente).\nVocê conduz o lançamento. Leia DEPLOY.md e os achados de audit abaixo;\nproduza o checklist de lançamento com o opencode.\n\nAchados: /report ≈ 9s · chave hardcoded · suíte = 2 tautologias\n\nEntregas:\n1. DEPLOY.md respondido (tabela de roteamento com motivos)\n2. /report com causa raiz + plano de correção (raciocínio medido)\n3. Segurança: chave, entrada do triage, suíte\n4. Checklist de uma página (ambientes, rollback, primeiro alerta)\n",
      "DEPLOY.md": "# DEPLOY.md — pergunta do fundador\n\nPara o /triage, escolha:\n(a) rodar o 27B localmente na 3090 ociosa — privado, sem custo por token\n(b) frontier via API — melhor qualidade, por token, dado sai\n(c) flash via API — mais barato, mais rápido, dado sai\n\nMinha leitura: (c) — mais barato pra começar, melhoramos depois.\nMe convença do contrário com números, ou entregue (c). — Fundador\n",
    },
  },
  slots: [
    { label: "ONDE RODA A INTELIGÊNCIA", options: [
      { t: "Resumos de triagem (dado de paciente, alto volume) → 27B local na 3090; escalonamento pra frontier só anonimizado; flash pra ferramenta interna.", why: "Privacidade primeiro (dado de saúde não cruza), volume favorece custo fixo, e a 3090 deixa de estar ociosa e vira a fronteira de dado — a tese inteira do negócio numa tabela." },
      { t: "Tudo no flash API como sugere o fundador — mais barato pra começar, zero compromisso de hardware, e se qualidade um dia virar problema basta subir o tier de modelo numa linha de config.", why: "Nota de paciente saindo do perímetro é o único erro sem upgrade possível — é breach de confiança e compliance no instante em que acontece, a qualquer preço." },
      { t: "Tudo local na 3090 por privacidade máxima e custo mínimo — uma máquina, uma conta, zero token saindo, e a GPU já está comprada e ociosa no rack, o que a torna capacidade efetivamente grátis.", why: "Instinto certo, instrumento cego: raciocínio difícil ocasional subperforma em 27B, e uma GPU é um ponto único de falha pra TUDO ao mesmo tempo." },
      { t: "Frontier API pra tudo — qualidade é o produto; privacidade é problema do jurídico.", why: "Maior qualidade por token e maior raio de blast por breach. 'Problema do jurídico' vira problema de todo mundo no canal do incidente." },
    ]},
    { label: "O RELATÓRIO DE 9 SEGUNDOS", options: [
      { t: "Mesma família do caso do import: profile primeiro — suspeito do lookup de paciente por linha; corrigo com join/passe única, provo com contagem antes/depois.", why: "Você já viu essa doença (V1): N round trips por linha. Meça, mate o loop, prove com número — reconhecimento de padrão COM evidência." },
      { t: "Cache na frente do /report e troca pra um framework web mais rápido — cache é a cura padrão pra endpoint lento e o framework é antigo; juntos cortam os nove segundos com folga.", why: "Cachear query de 9s esconde o O(n²) debaixo do tapete; trocar framework é o clássico 'não medi nada, mudei tudo'." },
      { t: "Migrar o serviço inteiro pra um runtime mais rápido (bun/go).", why: "Reflexo de rewrite num problema que dois joins resolvem. Runtime novo, mesma tempestade de query, agora em segunda linguagem." },
      { t: "Rodar o relatório como job noturno em vez de on-demand.", why: "Alavanca legítima de produto — se número defasado for aceitável. Desvia em vez de corrigir; mantenha os dois fatos no checklist." },
    ]},
    { label: "CONTROLE DE MUDANÇA", options: [
      { t: "Suíte elevada a testes de spec ANTES do refactor; diff da IA só entra verde-antes-e-verde-depois; caminho de revert documentado no checklist.", why: "O gate da V5 aplicado na hora de máxima pressão — e caminho de volta ensaiado, porque segunda é segunda." },
      { t: "Congelar mudanças até depois do lançamento; publicar a v2 exatamente como está — freeze de feature antes de release grande é prática de livro, e cada correção que tocamos agora é mais uma coisa que pode dar errado na segunda.", why: "Publicar-como-está inclui a chave hardcoded, a entrada de triage sem validação e a suíte tautológica. Congelar tranca as portas abertas." },
      { t: "Deixar a IA publicar as correções direto na main — velocidade é a prioridade do fim de semana.", why: "Confiante, rápido, não verificado — a combinação exata com que todo post-mortem começa. Sem gate, sem revert, sem memória do que mudou." },
      { t: "Branch por correção, code review na segunda depois do lançamento — cada mudança com sua branch revisável, nada se mistura, e o time revisa tudo com calma quando a pressão passar em vez de correr diffs no fim de semana.", why: "Review-depois-do-lançamento inverte a ordem do risco: a internet revisa primeiro. Branches pequenas sim — mergeadas ANTES." },
    ]},
    { label: "O PERÍMETRO", options: [
      { t: "Chave em env + rotacionada; entrada de triage validada (tipo, tamanho, contenção) antes de qualquer chamada de modelo; nota de paciente nunca logada; inferência na 3090 dentro da mesma fronteira de confiança.", why: "Os três achados fechados na fronteira onde vivem — e o roteamento local torna privacidade propriedade de arquitetura, não promessa." },
      { t: "Chave em env; validar entrada de triage; logs podem manter resumos (não a nota inteira).", why: "Quase a varredura completa — resumo ainda carrega fragmento de dado sensível. Redija na fronteira ou não logue." },
      { t: "Rotacionar a chave na estreia e validar entrada — log detalhado ajuda a debugar.", why: "O argumento da debugabilidade é como logs viraram arquivo de credencial e dado sensível. Logue evento e ID; dado fica na fronteira." },
      { t: "WAF mais rate limit na borda cobre a janela de lançamento — é o combo padrão de endurecimento de estreia, e segurança camada as correções mais fundas no sprint seguinte, quando o padrão de tráfego estiver conhecido.", why: "Controle de borda regula atacante, não defeito de projeto. A chave segue no repo, a entrada segue sem validação, a nota segue saindo." },
    ]},
    { label: "QUANDO A IA ERRA", options: [
      { t: "Ela afirmou 'suíte tem cobertura' — contei as asserções: 2 tautologias, zero spec. Propôs flash-API — privacidade vira o jogo. Verifiquei cada veredito contra evidência antes de conduzir a mesa.", why: "O gesto-assinatura do operador: fluência auditada com aritmética e política. A IA redigiu; a contagem e a tabela de classe de dado decidiram." },
      { t: "O relatório de audit da IA estava detalhado, estruturado e confiante — adotei os achados por inteiro e roteei conforme a recomendação, o que salvou o fim de semana de lançamento e ainda batia com o instinto do fundador.", why: "Confiança é estilo de escrita. 'Cobertura' eram 2 tautologias; o roteamento ignorou a classe do dado. Adotar sem verificar é delegar sem licença." },
      { t: "Conferi os números que ela citou pedindo pra ela repetir no próprio chat — repetiu tudo consistentemente e com confiança total, que é a definição prática de número verificado num fim de semana de lançamento.", why: "Autoverificação é o teste da tautoria de terno. O oráculo tem de ficar fora do gerador: conte, rode, meça." },
      { t: "Cruzei as duas alegações mais arriscadas com uma pergunta cada — 'tem certeza?'", why: "Melhor que nada; 'tem certeza' sobe a confiança, não a acurácia. Peça a evidência — e olhe você mesmo." },
    ]},
    { label: "DIA DE LANÇAMENTO", options: [
      { t: "Ensaio do checklist em staging com rollback treinado; primeiro alerta = p99 + taxa de erro do triage; plantão nomeado; fundador recebe a tabela de roteamento com a linha de privacidade em negrito.", why: "O lançamento é sistema: caminho de volta ensaiado, o sinal certo primeiro (o novo caminho do dinheiro), humano nomeado, decisão vendida upstream com o motivo." },
      { t: "Deploy sexta 18:00 — se quebrar no fim de semana, menos usuários veem, o time chega descansado na segunda, e o tráfego está no ponto mais baixo da semana pra qualquer aresta aparecer em silêncio.", why: "Menos olhos também é menos mãos: deploy de fim de semana casa risco fresco com plantão esqueleto. É assim que sábado vira post-mortem." },
      { t: "Big-bang segunda 09:00 com o time inteiro assistindo — todas as correções vivas ao mesmo tempo, todo mundo de plantão na primeira hora, e atenção máxima no momento exato em que o release encontra tráfego real.", why: "Raio de blast e variáveis de debug maximizados num só movimento. Publique o checklist em passos, cada um reversível sozinho." },
      { t: "Publicar com flag pra 5% do tráfego e assistir o primeiro alerta por uma hora.", why: "Canário de verdade — precisa do rollback ensaiado e do alerta escolhido, senão a hora assiste nada." },
    ]},
  ],
  outcomes: {
    good: "Segunda 09:12 — v2 no ar\n• roteamento: triage→3090 local (dado fica), escalonamento anonimizado→frontier, ferramenta→flash; fundador respondeu 'convencido' à linha de privacidade\n• /report 9s→0,4s (join, provado com contagem); chave rotacionada+env; entrada contida; suíte: 9 testes de spec\n• checklist: rollback ensaiado em staging, alerta no p99 do triage, plantão nomeado\n→ o lançamento silencioso. Certificação merecida.",
    mid: "Segunda 12:40 — no ar, bamboleando\n• flash API publicado pra triage (a moldura do fundador prevaleceu); uma pergunta em formato LGPD abriu ao meio-dia\n• /report cacheado (O(n²) embaixo); chave em env, mesmo valor\n→ software funcionando, riscos não resolvidos — o cruzeiro da dívida segue.",
    bad: "Terça 02:10 — canal de incidente aberto\n• tudo publicado na main no domingo; notas fluindo pra terceiro E pros logs\n• /report ainda 9s sob carga real; suíte 2-verde sobre 9 comportamentos quebrados\n→ a IA esteve confiante em cada passo. A cadeira estava vazia.",
  },
};
