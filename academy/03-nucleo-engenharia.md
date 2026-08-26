# 03 — Núcleo Comum · Módulo 2: A Engenharia Que Sobrou

*FORGE ACADEMY · obrigatório para todas as frentes (devs aprofundam nas trilhas) · jogo: VANILLA//FORGE*

**Objetivos de aprendizagem.** Ao fim deste módulo você deve: (1) explicar como software roda, quebra e é recuperado — em linguagem que leigo entende; (2) reconhecer os 8 eixos de engenharia que a IA não absorveu; (3) decidir com critério entre modelo local e API; (4) auditar (e não só aceitar) trabalho produzido por IA.

> **Para perfis não-dev:** este módulo é o seu vocabulário de mesa. Você não vai implementar migração de banco — mas vai vender o projeto que tem uma, e explicar pro cliente por que ela custa o que custa. Os capítulos marcam onde parar.

---

## Capítulo 13 — A máquina viva (jogo: V1)

Software não flutua: roda num **processo**, com **memória**, **disco** e **rede** — dentro de uma máquina física com GPU e kWh. Números que todo mundo da casa deveria sentir na espinha:

| Operação | Ordem de grandeza |
|---|---|
| Acesso à RAM | ~100 **nano**segundos |
| Leitura de SSD | ~100 **micro**segundos |
| Rede no mesmo datacenter | ~500 µs |
| Rede na mesma cidade | 1–5 ms |
| Roundtrip de API pública | 50–300 ms |
| **Uma geração de LLM frontier (API)** | **1–20 segundos** |

Consequências: uma chamada de rede custa milhares de acessos a RAM ("remover chamada em loop" resolve mais lentidão que qualquer framework); e uma geração de modelo custa **milhões** de vezes um acesso a RAM — por isso o custo de tokens domina a conta de qualquer produto com IA em 2026, e por que fazer a tarefa certa rodar no modelo certo (cap. 22) é decisão financeira, não técnica.

Diagnóstico profissional tem ordem: **reproduza → meça → isole a camada → corrija a causa**. Palpite otimizado sem medição é adivinhação com confiança — o anti-padrão que a missão V1 treina.

*(Não-dev: até aqui, completo.)*

## Capítulo 14 — A fonte da verdade (jogo: V2)

O Git não é backup: é a **memória auditável** de por que o sistema é como é — quem mudou o quê, quando, e por quê. Três hábitos profissionais:

1. **Commits pequenos** com mensagem que explica o *porquê* ("evita dupla cobrança quando app reenvia"), não o óbvio ("mudou User.java").
2. **`git bisect`** — busca binária no tempo pra achar o commit que introduziu o bug.
3. **Reverter com `git revert`** — nunca reescrever histórico compartilhado (`force push` apaga a memória do time).

Por que todos da casa devem entender: quando um cliente liga "o que vocês mudaram que parou de faturar?", a diferença entre "bisect e encontramos em 20 minutos" e "vamos ver se achamos" é a diferença entre engenharia e improviso — e é cobrada em SLA.

*(Não-dev: conceito. Dev: trilha software house, cap. 3.)*

## Capítulo 15 — A interface (jogo: V3)

API é **contrato entre estranhos com memória**: quem consome não lê seu código, lê seu contrato — e "estranhos" inclui seu próprio app de 6 meses atrás. Fundamentos eternos:

- **Semântica HTTP**: `GET` não muda nada; `201` criou; `400`/`401`/`403`/`409` dizem exatamente o tipo de erro; `200` com `{"erro":...}` destrói a debugabilidade do ecossistema inteiro.
- **Idempotência**: rede reenvia. Celular em elevador retransmite o POST de cobrança. Consumidor gera `Idempotency-Key`; servidor devolve o resultado original na segunda tentativa. Sem isso, todo retry é aposta — e o bug de cobrança duplicada é o clássico absoluto.
- **Evolução sem quebra**: adicione campos, nunca remova/renomeie; mudança de semântica = versão nova. "Os clientes atualizam" é mentira com prazo.

## Capítulo 16 — A persistência (jogo: V4)

**Dado vive mais que código** — o app será reescrito 3 vezes; o banco daqui a 10 anos ainda estará lá. Três regras:

1. **Esquema com integridade declarativa**: foreign key, `UNIQUE`, `NOT NULL`. A tentação da era ("tabela única de JSON flexível") empurra integridade pro código — que a IA regenera toda semana — e consulta pro full-scan.
2. **Migração versionada com plano de reversão** pensado antes de executar. Editar produção "rapidinho no adminer" é cirurgia com canivete.
3. **Backup não testado não é backup.** `dump` rodando há 2 anos não significa nada até o **restore drill mensal**. Backup = cópia + restauração ensaiada + retenção fora do mesmo disco.

*(Não-dev: guarde "restore drill" — é pergunta de due diligence que vale fazer pra qualquer fornecedor, inclusive nós.)*

## Capítulo 17 — A prova (jogo: V5)

A pesquisa da era é unânime e desconfortável — e os dois achados centrais merecem número:

- **Código de IA compila bonito e contém buraco.** Veracode 2025: >100 modelos, 45% das amostras com falha OWASP (Java 72%), índice **plano entre gerações** — mais novo ≠ mais seguro. AppSecSanta 2026: 25,7% das 522 amostras com vulnerabilidade confirmada manualmente, Broken Access Control dominando.
- **Velocidade percebida ≠ velocidade real, e a dívida cresce.** No RCT da **METR (2025)** — 16 devs experientes, 246 issues reais, randomizado — usar IA deixou os devs **19% mais lentos** enquanto eles **se achavam 24% mais rápidos**; o follow-up de fev/2026 sinaliza reversão (−18% para devs retornados), mas a própria METR o declara não confiável (viés de seleção) — campo em disputa, leitura de método obrigatória. E o dado longitudinal da **GitClear** (211M de linhas, 2020–2024): refatoração caiu de 24,8% para 9,5% das mudanças, blocos duplicados cresceram ~8–10×, e 79–80% das alterações tocam código com menos de 1 mês. A **DORA 2025** fecha o quadro: IA amplifica throughput **e** instabilidade de entrega.

A ferramenta da verificação deliberada é o teste:

- **Unitários** (base): rápidos, testam **comportamento**, não implementação. Testar getter é decorativo.
- **Integração** (meio): módulo conversa com banco/fila de verdade.
- **E2E** (topo): pouquíssimos — o caminho do dinheiro (login → carrinho → pagamento).

Regras: flaky (falha "às vezes") é bug — quarentena e corrija a causa; re-rodar até passar é maquiagem. Refactor de IA só entra com suíte verde antes e depois. **A IA escreve o código; os testes decidem se ele existe.** Cobertura é termômetro, não meta.

*(Não-dev: completo — este capítulo é cultura. Dev: trilha software house aprofunda.)*

## Capítulo 18 — As fronteiras (jogo: V6)

Sintoma do sistema doente: mudar uma linha quebra três lugares "sem relação". Diagnóstico: **acoplamento alto, coesão baixa**. O remédio: módulos com contrato — dentro do módulo o que quiser, entre módulos só interface (`faturamento` não alcança internals de `envio`; chama `envio.agendar(itens)`).

Migração gradual (strangler): extrair a ilha mais dolorosa atrás de interface, migrar por partes, matar o velho. Big-bang rewrite é o cassino da arquitetura.

**Orçamento de complexidade**: cada tecnologia nova entra com custo fixo (operar, monitorar, explicar) — boring tech que o time inteiro entende ganha de stack brilhante que só o autor entende. Na era IA há uma versão nova dessa armadilha: "só a IA entende" também conta como proprietário único.

Por que a IA tornou isso MAIS importante: barateou escrever código novo — sem fronteiras, cada geração de código colide com a anterior e o sistema vira pântano. **Arquitetura é o que permite 10 gerações de IA passarem sem se atropelar.**

*(Não-dev: a metáfora do prédio — paredes que podem mudar por dentro vs. paredes que sustentam.)*

## Capítulo 19 — A brecha (jogo: V7)

Segurança prática, no que realmente acontece:

1. **Segredos**: chave em `.env` commitado ("repo é privado" — até não ser), token impresso em log. Correto: secret manager, **escopo mínimo** (token que só lê uma coleção, não admin "por comodidade"), rotação quando exposto.
2. **Cadeia de suprimentos**: sua app é 80% dependência de terceiros. Lockfile travado, mínimo de pacotes, revisão ao atualizar, cuidado com typosquatting. O combo da era: IA sugerindo 40 pacotes pra poupar 10 linhas — cada pacote é uma porta com manutenção de estranho.
3. **As clássicas que a IA ainda injeta com carinho**: SQL por concatenação, HTML sem escape, `eval` em entrada do usuário, upload com nome original. A geração de código é hoje a maior fábrica de vulnerabilidade do mundo — por produtividade, não malícia (por isso frameworks tipo SHIELD/Unit 42 de governança de vibe coding nasceram em 2026).

Regra das fronteiras de confiança: **toda entrada é hostil até validada — inclusive a gerada por IA.**

*(Não-dev: a pergunta de venda — "onde ficam as chaves de vocês?" — é diferencial comercial.)*

## Capítulo 20 — A operação (jogo: V7/VT)

Código fora do ar é intenção. A trincheira:

- **Ambientes**: dev → staging → produção. "Testar em produção só dessa vez" antecede os melhores post-mortems.
- **CI/CD**: push roda teste; merge verde gera artefato versionado; deploy **reversível** — rollback desenhado junto com o deploy.
- **Contêiner**: a unidade de "funciona na minha máquina" resolvida.
- **Observabilidade**: log estruturado (com request_id), métricas (p99, taxa de erro), alerta antes do cliente reclamar. Incidente sem log estruturado é arqueologia.
- **Post-mortem sem culpa**: "o que no sistema permitiu isto" — e a ação vira teste + alerta.

## Capítulo 21 — O julgamento: onde roda a inteligência (jogo: VT)

A pergunta nova da era, e ela é **comercial tanto quanto técnica**:

| Opção | Quando | Por quê |
|---|---|---|
| **Local** (27B na 3090) | dado sensível, volume alto, tarefas 90% (resumo, classificação, extração, rascunho) | custo marginal ~zero, dado não sai, latência baixa |
| **Frontier API** (k3, GLM 5.3) | raciocínio difícil, contexto enorme, one-off | sem CAPEX, paga por tarefa |
| **Flash/instantâneo** (deepseekflash) | copiloto ambiente, digitação, varredura | barato pra deixar ligado o dia todo |

A decisão pesa **privacidade × custo × dificuldade × latência** — e é literalmente o nosso negócio: a empresa que sabe especificar, verificar e **hospedar** a inteligência certa pra cada tarefa. O mini datacenter existe porque essa tabela tem uma primeira linha inteira esperando GPU.

E a regra final do programa: **a IA está confiantemente errada com regularidade estatística.** O ciclo profissional fecha sempre igual: especifica (Módulo 1) → gera → **verifica com teste e execução** → integra → responde. O certificado dos 75% existe porque cada ponto de sync é um desses músculos comprovado em uso.

---

## Fontes do módulo (verificadas — detalhes e ranking em [08-bibliografia.md](08-bibliografia.md))

- METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* (RCT, 2025) — [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) · [arXiv 2507.09089](https://arxiv.org/abs/2507.09089)
- GitClear, *The Maintainability Gap: AI Code Quality in 2026* (longitudinal) — [gitclear.com](https://www.gitclear.com/the_ai_code_quality_maintainability_gap)
- Veracode, *GenAI Code Security Report* (2025) — [veracode.com](https://www.veracode.com/blog/genai-code-security-report/)
- AppSecSanta, *AI Code Security Study* (2026) — [appsecsanta.com](https://appsecsanta.com/research/ai-code-security-study-2026)
- Fawzy, *Vibe Coding in Practice* (ACM, 2026) — [dl.acm.org](https://dl.acm.org/doi/10.1145/3786583.3786866)
- Gandhi, *Survey On Systemic Security Risks in Vibe Coding* (TechRxiv, 2026) — [techrxiv.org](https://www.techrxiv.org/doi/10.36227/techrxiv.176800890.09196406)
- Estudo de experiência em vibe coding (arXiv, 2026) — [arxiv.org/html/2605.24521v1](https://arxiv.org/html/2605.24521v1)
- Cloud Security Alliance, research note (2026) — [labs.cloudsecurityalliance.org](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-vulnerability-surge-2026/)
