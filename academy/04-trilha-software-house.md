# 04 — Trilha Software House · Entrega a cliente na era da IA

*FORGE ACADEMY · trilha técnica · pré-requisito: núcleos 1 e 2 (certificados ≥75%)*

**Objetivos.** Ao fim da trilha você deve: (1) conduzir um ciclo completo de entrega com IA — escopo, build, review, deploy, pós; (2) aplicar os 8 eixos do Módulo 2 num projeto real; (3) se proteger (e ao cliente) dos riscos medidos na literatura (segurança ~26–45%, duplicação +81%, percepção ≠ realidade).

---

## Cap. 1 — O escopo é o produto

Na software house, o que a IA barateou foi *escrever* — não *decidir o que escrever*. Escopo mal definido hoje custa mais caro que em 2020, porque a IA transforma ambiguidade em código funcional-errado a velocidade de máquina: o cliente vê demo rápido, aprova, e a dívida nasce aprovada.

Regra da casa: **todo item de escopo é um contrato verificável** — entrada, saída, critério de aceite testável. "Sistema de login" não é escopo; "login com email+senha e Google, sessão de 7 dias, rate limit de 5 tentativas/min, 2FA opcional" é. Ferramenta: S.P.E.C. do Módulo 1 aplicada ao backlog inteiro, e a IA ajudando a *extrair* o que falta ("quais critérios de aceite este épico não define?").

**Checkpoint** — pegue um épico real de cliente e converta 5 itens em contratos verificáveis.

## Cap. 2 — O pipeline de entrega com IA

O ciclo padrão da casa, cada fase com seu uso de IA e sua trava humana:

1. **Especificação** — prompt full-stack por feature; IA crita lacunas. *Trava: você escreve o contrato.*
2. **Geração** — IA implementa por módulo respeitando fronteiras (cap. 18 do núcleo). *Trava: um módulo por vez, nunca "refaz tudo".*
3. **Verificação** — suíte de testes roda; IA gera casos de borda que tentam quebrar a implementação. *Trava: verde é condição, os caminhos de dinheiro têm teste de integração.*
4. **Review adversarial** — outro prompt ataca o código (injeção, XSS, permissão, N+1, segredo hardcoded). Os números do núcleo valem aqui: 1 em cada 4 trechos gerados contém falha conhecida — review não é cerimônia, é onde a falha morre.
5. **Integração** — PR pequeno, CI verde, mensagem de commit com o porquê. *Trava: nada de merge sem revert-planejado.*
6. **Pós** — deploy reversível, log estruturado com request_id, runbook de rollback. Post-mortem sem culpa quando quebrar.

## Cap. 3 — Git como memória da entrega

Aprofundando o cap. 14 do núcleo para o contexto de cliente: quando o cliente pergunta "o que mudou que quebrou o faturamento?", o time que tem **histórico limpo** responde com `bisect` em minutos; o time que fez squash gigante de "v2.3 features" responde com arqueologia. Regras da casa: commit atômico; branch por contrato de escopo; PR revisado por humano **lendo** (a IA escreveu, alguém precisa ter lido — inclusive os testes); `force push` em branch compartilhada é incidente, não atalho.

## Cap. 4 — Dívida técnica na era GitClear

O dado longitudinal (duplicação +81% desde 2023, churn dobrado, refactor em queda) é o risco nº 1 do modelo de negócio de software house com IA: **entregamos mais rápido um código que custa mais para manter**. Contramedidas práticas:

- **Orçamento de refactor por sprint** (a house reserva 20% da capacidade para pagar dívida — é margem, não custo perdido);
- **Gate de duplicação no CI** (ferramenta acusa bloco duplicado acima do limiar);
- **Fronteiras de módulo no repositório** (a IA só vê o módulo da tarefa no contexto, não o repo inteiro — contexto curado é arquitetura);
- **Métrica de churn no dashboard do projeto** (código reescrito < 2 semanas é sinal de geração descartável).

## Cap. 5 — O cliente na mesa

Expectativa calibrada é parte da entrega: "a IA acelera a construção; verificação, segurança e manutenção continuam sendo engenharia — é aí que o valor cobrado mora". Nunca vender "IA = metade do preço"; vender **tempo-para-valor menor com qualidade medida** (testes, SLA, post-mortem transparente). No perímetro (cap. 6 do núcleo): dado de cliente em modelo só anonimizado, ou em instância dedicada — e isso entra no contrato como cláusula de processamento de dados.

**Projeto final da trilha** — conduzir uma feature real (ou simulada com sandbox) ponta a ponta pelas 6 fases do cap. 2, com evidências: contrato de escopo, suíte de testes verde, relatório de review adversarial, runbook. Apresentar na semana 6.
