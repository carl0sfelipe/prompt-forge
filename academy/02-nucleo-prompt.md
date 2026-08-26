# 02 — Núcleo Comum · Módulo 1: A Gramática do Prompt

*FORGE ACADEMY · obrigatório para todas as frentes · jogo: PROMPT//FORGE*

**Objetivos de aprendizagem.** Ao fim deste módulo você deve: (1) operar qualquer IA generativa sabendo o que ela é e o que ela não é; (2) redigir prompts profissionais com as 7 técnicas do jogo; (3) detectar e corrigir os 8 anti-padrões mais comuns — inclusive os seus.

---

## Capítulo 1 — O mundo em que a gente trabalha agora

Até poucos anos, ser "a pessoa que sabe transformar problema em código" era escasso e caro. Em 2026, essa escassez acabou: modelos como **GLM 5.3**, **fable mythos k3** e **deepseekflash** escrevem código, texto e análise a custo de centavos; e o **Qwen 3.8 27B** roda numa RTX 3090 com inteligência que iguala o frontier de duas gerações atrás — hardware que a nossa empresa vende e em breve vai hospedar em racks próprios.

O que isso significa **para você, estagiário de qualquer frente**:

- O valor não está mais em *produzir* (texto, código, planilha) — está em **especificar** (dizer exatamente o que se quer), **verificar** (checar se o que veio está certo) e **responder** (assinar pelo resultado).
- Quem domina esse triângulo comanda uma força de trabalho artificial ilimitada. Quem não domina, compete com ela.
- Nossa vantagem como casa é tripla: sabemos entregar software, sabemos o hardware que roda IA, e vamos operar nossos próprios modelos. Este programa forma você nessa tripla condição.

**Checkpoint 1.1** — Sem olhar o material: escreva em 3 linhas o que mudou no valor profissional em 2026 e 1 consequência prática pro seu papel na frente onde atua.

## Capítulo 2 — O estagiário literal (missão I1)

O modelo de linguagem é o estagiário mais brilhante e incansável que existe — e que **não sabe nada sobre você**: seus arquivos, sua empresa, seu cliente, seu contexto. Ele não lê mentes: **completa texto**. O que você não colou, ele inventa.

Dois erros clássicos de quem começa:
- Tratar como **oráculo** ("a IA sabe") — ela não sabe, ela gera com confiança;
- Tratar como **buscador** ("a IA pesquisa") — ela não pesquisa (a menos que a ferramenta faça isso por trás), ela escreve o que é plausível.

Toda tarefa com IA começa com três perguntas: **o que exatamente quero** (tarefa), **o que ela precisa ter** (dados), **em que forma quero** (formato). Sem as três respondidas, o prompt está incompleto — e o que está incompleto, ela completa com ficção.

**Na revenda:** "faça uma proposta pra clínica" sem colar o orçamento da máquina, o público e o prazo → a IA inventa três números errados com aparência de planilha.
**No datacenter:** "resume os logs" sem colar os logs → resumo de um incidente que não aconteceu.

**Checkpoint 2.1** — Pegue uma tarefa real sua desta semana e responda as 3 perguntas antes de promptar. Anote o antes/depois.

## Capítulo 3 — O loop (missão I2)

A primeira saída é **rascunho zero**. O profissional trata a conversa como loop: executa → lê → aponta defeitos específicos → executa de novo. Duas posturas amadoras: aceitar tudo (por "educação" com a máquina) ou jogar fora e recomeçar (por não saber dirigir).

A manobra certa tem três partes: **o que sobrevive** ("mantenha os fatos"), **o que muda com número** ("80 palavras", não "mais curto"), **o fecho obrigatório** ("termine com chamada pra ação"). Dimensão sem métrica é sugestão; com métrica, é especificação.

Iterar é grátis em 2026 — 10 rodadas custam centavos. Quem aceita a primeira saída joga fora a principal vantagem da era.

**Checkpoint 3.1** — Pegue uma saída medíocre que você aceitou recentemente e reescreva o follow-up no formato sobrevive/muda-número/fecho.

## Capítulo 4 — Confie, mas verifique (missão I3)

O modelo erra com **fluência total** — e isso não é defeito, é a natureza do mecanismo (ele gera o plausível, não o verificado). Número com casa decimal, relatório citado, API com método preciso: tudo pode vir fabricado, com a mesma confiança serena do verdadeiro.

A regra profissional: toda afirmação **carregante** (que sustenta decisão, vai pra cliente, entra em documento) é **não verificada até você verificar**. A régua é "eu confirmei na fonte", nunca "soou certo".

Isso vale dobrado pra código — e não é opinião, é o que a melhor evidência disponível mede: o relatório da **Veracode (2025)** testou **mais de 100 modelos** em 4 linguagens e encontrou falhas OWASP Top 10 em **45% das amostras** (Java: 72%) — com um agravante: o índice ficou **plano entre gerações de modelo**; modelo mais novo escreve código mais correto, não mais seguro. Avaliação independente de 2026 (AppSecSanta, 6 LLMs, 522 amostras, scanners + validação manual) confirmou a ordem de grandeza: **~26%** com vulnerabilidade real mesmo em tarefas banais. Tradução: **verificar não é desconfiança, é o trabalho.** Fontes e números completos: [08-bibliografia.md](08-bibliografia.md).

**Checkpoint 4.1** — Assinale 3 afirmações de uma saída recente sua como "carregante" e verifique cada uma na fonte. Registre o resultado (incluindo as que estavam certas — calibrar confiança também é habilidade).

## Capítulo 5 — O perímetro (missão I4)

Tudo que você cola no chat é **dado saindo do seu controle** — pra um provedor, pra um log, pra um futuro vazamento. As três regras:

1. **Segredos nunca cruzam.** Senha, token, chave, credencial de cliente: jamais, em nenhum "é só pra testar".
2. **Dado de terceiro entra mínimo e anonimizado.** As duas cláusulas necessárias, sem nomes — não o contrato inteiro.
3. **A saída é sua.** O modelo rascunha, você assina. Revisar como se você tivesse escrito — porque foi você.

No nosso contexto de mini datacenter isso vira **argumento comercial**: com modelo rodando em GPU própria, o dado do cliente não sai da infraestrura dele. Quem entende o perímetro consegue vender privacidade com propriedade.

**Checkpoint 5.1** — Classifique 5 itens do seu dia (doc de cliente, orçamento interno, senha de staging, print de Slack, CPF de usuário) em PODE COLAR / ANONIMIZAR / NUNCA.

## Capítulo 6 — S.P.E.C.: matando a névoa (missão M1)

Todo pedido vago entrega uma decisão ao acaso. O protocolo exige quatro elementos antes de qualquer prompt sério:

- **S**ubject — sobre o quê, exatamente?
- **P**urpose — pra quê? o leitor vai fazer o quê com isso?
- **E**xtent — tamanho, formato, limite numérico?
- **C**onstraints — proibido, obrigatório, fixo?

*"E-mail de 120 palavras para clientes atuais anunciando o Launchpad, abrindo com o dado de 45min→90s"* — as quatro letras numa frase. Compare com "escreve umas coisas sobre o lançamento" e decida qual delas um estagiário humano conseguiria executar sem te ligar pra perguntar.

**Checkpoint 6.1** — Aplique S.P.E.C. a um e-mail real que você precisa enviar esta semana. Compare com o que você ia escrever.

## Capítulo 7 — Persona: a lente certa (missão M2)

Persona enviesa vocabulário, prioridade e rigor da resposta. A fórmula: **especialidade + senioridade + postura**. "Atue como especialista brilhante em tudo" é lente que foca em tudo — logo, em nada. "Advogado sênior de contratos, 15 anos em SaaS, avesso a risco" é lente de receita.

Uso comercial direto: persona de **pré-venda técnica** ("arquiteto de infra GPU, cético com benchmark de marketing, focado em TCO") gera proposta que responde às objeções antes do cliente abrir a boca.

**Checkpoint 7.1** — Crie 2 personas recorrentes do seu cargo (ex.: "cliente descontraído que não entende técnico" / "auditor fiscal cético") e teste no mesmo prompt.

## Capítulo 8 — Grounding: a IA não vê o que você não cola (missão M3)

Se o dado precisa entrar na decisão, ele entra **verbatim no prompt, cercado por delimitadores** — `<tickets>…</tickets>`, `<log>…</log>` — seguido de regra dura de escopo: **"use apenas o que está entre as tags; fora disso, escreva UNKNOWN"**.

Por que delimitador + regra e não só "use estes dados": sem fronteira explícita, "foque principalmente nos dados" vira porta aberta — o modelo mistura o seu dado com o conhecimento geral dele e você não consegue distinguir qual número veio de onde. Com fronteira + UNKNOWN, toda invenção fica **visível** (aparece como UNKNOWN em vez de mentira plausível).

**Checkpoint 8.1** — Cole 5 tickets reais (anonimizados) entre tags, exija UNKNOWN fora deles, e confira: alguma linha da saída veio de fora?

## Capítulo 9 — Contrato de saída (missão M4)

Se a saída tem consumidor (sistema, processo, colega), tem **interface** — e interface se especifica: schema exato, enumeração, tetos numéricos, cláusula de exclusão (*"nada além do JSON"*). Regra de ouro: **restrição numérica ou enumerável é verificável por máquina; adjetivo é interpretação.** "Curto", "bonito", "criativo" não são specs.

**Checkpoint 9.1** — Transforme "me dê uma lista de leads qualificados" num contrato verificável (campos, tipo, limite, formato).

## Capítulo 10 — Few-shot: exemplos são a spec (missão M5)

Descrição conta; **demonstração mostra**. 2 a 4 pares limpos entrada→saída travam formato e tom melhor que parágrafos de regra — o modelo espelha padrão melhor do que obedece adjetivo. Depois, prenda com regra de consistência ("siga o formato exato; em dúvida, classe OTHER") pra estabilizar em escala. Vinte exemplos "pra cobrir tudo" é o oposto: queima contexto e introduz contradição.

Onde mais aparece no mundo real: classificadores de suporte, extração de dados de documento, padronização de cadastro — qualquer tarefa repetitiva em volume.

**Checkpoint 10.1** — Monte 3 pares exemplo→saída para uma tarefa repetitiva sua e rode em 10 itens reais. Marque onde o formato desviou.

## Capítulo 11 — Decomposição e autochecagem (missão M6)

Para decisões e análises: (1) **suposições explícitas** primeiro, (2) **evidência pró e contra** encadeada, (3) **fechamento falsificável** — "o que mudaria minha resposta: três dados que inverteriam a recomendação". Confiança sem raciocínio é coin flip de terno; raciocínio sem ponto fraco declarado não pode ser auditado.

**Checkpoint 11.1** — Pegue uma decisão pendente da sua frente (comprar X? priorizar Y?) e rode o protocolo completo. A lista de "o que mudaria" é o seu plano de pesquisa.

## Capítulo 12 — O prompt full-stack (missão MT)

O prompt profissional de produção empilha as camadas num contrato só: **persona + tarefa + dados fundamentados + formato + restrições + forma de raciocínio**. É o que você confia às 3 da manhã. Cada camada ausente é decisão entregue ao acaso — e às 3h o acaso cobra hora dobrada.

A missão final do jogo (o incidente do checkout às 03:42) é o exame do módulo porque mistura tudo sob pressão. Estude o veredito de cada opção errada: são os 12 anti-padrões que este módulo ensinou, um por vez.

**Checkpoint final do módulo** — Escreva 1 prompt full-stack para um caso real da sua frente (entrega de cliente / proposta de GPU / diagnóstico de serving). Traga pra mentoria: é o insumo do checkpoint humano.

---

*Fontes citadas neste módulo: Veracode GenAI Code Security Report 2025 (veracode.com/blog/genai-code-security-report); AppSecSanta AI Code Security Study 2026 (appsecsanta.com/research/ai-code-security-study-2026). As demais técnicas são consenso da literatura de engenharia de prompt (few-shot, chain-of-thought) replicado em produção.*
