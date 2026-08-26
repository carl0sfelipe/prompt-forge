# 08 — Bibliografia verificada (base científica do programa)

*FORGE ACADEMY · v2.1 · 26/08/2026 · Método: fontes localizadas e verificadas em página primária (fetch direto) + survey executado pelo agente OpenScience (GLM 5.3, cota do coding plan Z.AI) — [saída integral do agente em 09-survey-openscience.md](09-survey-openscience.md). Ranqueadas por força de evidência; não-verificáveis sinalizadas.*

---

## Tier 1 — Evidência experimental forte

### 1. METR — *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*
**Autores/ano:** J. Becker et al., 2025 · **Tipo:** RCT (ensaio randomizado controlado) · **Veia:** [metr.org/blog](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) + [arXiv 2507.09089](https://arxiv.org/abs/2507.09089) (291+ citações)
**Números:** 16 devs experientes, 246 issues reais em repositórios que dominavam. Com IA: **19% mais lentos** (IC 95%: +2% a +39%) — enquanto **se percebiam ~24% mais rápidos**.
**Takeaway PT-BR:** o melhor experimento já feito mede que, para especialistas em código maduro, a IA de 2025 *reduziu* velocidade — e a percepção dos próprios devs era oposta à realidade. Percepção não é medida; medir é trabalho de engenharia.
**Uso no currículo:** justifica o capítulo 17 (prova) e a cultura "verificar não é desconfiança".

### 1b. METR — *Uplift Experiment Update* (fev/2026)
**Tipo:** RCT com ressalvas graves · **Veia:** [metr.org/blog/2026-02-24-uplift-update](https://metr.org/blog/2026-02-24-uplift-update/)
**Números:** 57 devs, 800+ tarefas a partir de ago/2025: estimativas pontuais de **−18% de tempo (devs retornados) e −4% (novos)** — agora favorável. Mas a própria METR declara **não confiável**: devs recusaram o braço sem IA e o pagamento caiu de US$150 para US$50/hora (viés de seleção).
**Takeaway PT-BR:** a resposta está em movimento e os dois sinais convivem — o campo exige leitura crítica de método, não manchete. Guardar como "em disputa".

### 1c. METR — *Algorithmic vs. Holistic Evaluation of Coding Agents* (2025) ⚠️ preliminar
**Tipo:** qualitativo n pequeno (15 PRs) · **Veia:** [metr.org](https://metr.org/blog/2025-08-12-research-update-towards-reconciling-slowdown-with-time-horizons/)
**Números:** nenhum dos 15 PRs gerados por agente era mergeable sem correção humana; ~42 min de conserto por PR.
**Takeaway PT-BR:** benchmark algorítmico superestima prontidão do agente — a avaliação "como um humano usaria" é a régua do mundo real. Alinha com o review adversarial da trilha software house.

## Tier 2 — Dados longitudinais de campo

### 2. GitClear — *AI Copilot Code Quality: 2025 Look Back* (+ *Maintainability Gap* 2026)
**Tipo:** estudo longitudinal de repositórios · **Veia:** [gitclear.com (2025)](https://www.gitclear.com/ai_assistant_code_quality_2025_research) · [2026](https://www.gitclear.com/the_ai_code_quality_maintainability_gap)
**Números (relatório 2025, 211M linhas, 2020–2024):** refatoração ("moved lines") caiu de **24,8% (2021) para 9,5% (2024)**; copy/paste subiu de 8,3% para 12,3%; blocos duplicados de 5+ linhas cresceram **~8–10×**; 79–80% das mudanças tocam código com menos de 1 mês. O relatório 2026 registra a duplicação no maior nível histórico. Observacional — não causal.
**Takeaway PT-BR:** a era da IA está produzindo mais código parecido, mais descartado e menos refactorado — a dívida de manutenção cresce mesmo quando o time *sente* que produz mais. Fronteiras (cap. 18) e testes (cap. 17) são o contraponto.
**Uso no currículo:** âncora do argumento central do Módulo 2 e do cap. 4 da trilha software house.

### 2b. DORA — *State of AI-assisted Software Development* (2025)
**Tipo:** survey em larga escala (~5.000 profissionais) + 100h qualitativas · **Veia:** [dora.dev/dora-report-2025](https://dora.dev/dora-report-2025/)
**Números:** pela 1ª vez a adoção de IA se relaciona **positivamente com throughput**, mas **aumenta a instabilidade de entrega**; 90% usam IA, 30%+ desconfiam do código gerado.
**Takeaway PT-BR:** IA é **amplificador das práticas existentes** — time com processo saudável acelera; time desorganizado acelera o caos. É o argumento empírico para TODO o Módulo 2.

### 2c. Stack Overflow — *Developer Survey 2025* (módulo IA)
**Tipo:** survey (49k+ devs, 177 países) · **Veia:** [survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai)
**Números:** 84% usam ou planejam usar IA (76% em 2024), mas **46% desconfiam da acurácia** (31% antes; só 3% confiam "muito"); 66% frustrados por respostas "quase certas"; 45% relatam que depurar código de IA leva mais tempo.
**Takeaway PT-BR:** adoção cresce mais rápido que confiança — o mercado inteiro está sentindo o custo oculto da fluência. "Quase certo" é o inimigo específico que o cap. 4 (verificação) treina.

## Tier 3 — Avaliações industriais com método explícito

### 3. Veracode — *2025 GenAI Code Security Report*
**Autor/ano:** CTO Jens Wessling, jul/2025 · **Tipo:** avaliação industrial · **Veia:** [veracode.com](https://www.veracode.com/blog/genai-code-security-report/)
**Números:** **>100 modelos** testados (Java, Python, C#, JS). **45% das amostras** falharam testes de segurança (OWASP Top 10). Por linguagem: Java 72% · C# 45% · JS 43% · Python 38%. CWE-80 (XSS): falha em 86% das amostras relevantes.
**Takeaway PT-BR:** o desempenho de segurança ficou **plano** independente de tamanho/sofisticação do modelo — modelo mais novo escreve código mais correto, não mais seguro. Exposição indireta (open source, fornecedores) atinge quem nem usa IA.
**Uso no currículo:** capítulo 4 (verificação) e 19 (brecha).

### 3b. Veracode — *Spring 2026 GenAI Code Security Update*
**Tipo:** longitudinal (benchmark repetido, 150+ modelos) · **Veia:** [veracode.com](https://www.veracode.com/blog/spring-2026-genai-code-security/)
**Números:** pass rate estagnado em ~55%; variantes "reasoning" GPT-5.x lideram com 70–72% de aprovação; XSS e log injection inalterados.
**Takeaway PT-BR:** um ano depois, a evolução melhorou o raciocínio dos modelos — **não as classes de vulnerabilidade web clássicas**. Revisão adversarial continua sendo o gargalo humano.

### 4. AppSecSanta — *AI Code Security Study 2026* ⚠️ autoria única, sem peer review
**Tipo:** avaliação industrial com validação manual · **Veia:** [appsecsanta.com](https://appsecsanta.com/research/ai-code-security-study-2026)
**Números:** 6 LLMs (via OpenRouter, temp 0), 87 prompts, **522 amostras**, 5 ferramentas SAST, achados validados manualmente: **25,7%** com vulnerabilidade confirmada. Dominante: Broken Access Control (65 achados; SSRF 32, path traversal 30). Melhor modelo: 19,5%; piores: 29,9%.
**Takeaway PT-BR:** ~1 em cada 4 amostras de código de IA nas tarefas mais banais (formulário de login, upload) contém falha real confirmada por scanner + revisão humana. O espalho entre modelos (~10 pontos) não muda a ordem de grandeza.
**Uso no currículo:** capítulo 4 e 19.

## Tier 4 — Estudos empíricos/surveys sobre vibe coding

### 5. Fawzy — *Vibe Coding in Practice: Motivations, Challenges, and a Research Agenda*
**Ano:** 2026 · **Tipo:** estudo empírico (ACM) · **Veia:** [dl.acm.org](https://dl.acm.org/doi/10.1145/3786583.3786866) (80+ citações)
**Takeaway PT-BR:** vibe coding derruba barreira e acelera protótipo, mas introduz preocupações sistemáticas de confiabilidade e manutenibilidade — a agenda de pesquisa que este currículo converte em prática de treinamento.

### 6. *How Experience Shapes Vibe Coding Practices*
**Ano:** 2026 · **Tipo:** survey/questionário · **Veia:** [arxiv.org/html/2605.24521v1](https://arxiv.org/html/2605.24521v1)
**Takeaway PT-BR:** a prática de vibe coding varia sistematicamente com a experiência do codificador — o que o programa formaliza: núcleo comum pra todos, profundidade crescente por trilha.

### 7. Gandhi — *Survey On Systemic Security Risks in Vibe Coding and Autonomous Development Workflows*
**Ano:** 2026 · **Tipo:** survey (TechRxiv preprint) · **Veia:** [techrxiv.org](https://www.techrxiv.org/doi/10.36227/techrxiv.176800890.09196406)
**Takeaway PT-BR:** consolida evidências de risco sistêmico em workflows autônomos; base para frameworks de governança (ex.: SHIELD/Unit 42, jan/2026 — separação de deveres, humano-no-loop, validação de I/O).

### 8. Cloud Security Alliance — *AI-Generated Code Vulnerability Surge* (research note)
**Ano:** 2026 · **Tipo:** nota técnica · **Veia:** [labs.cloudsecurityalliance.org](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-vulnerability-surge-2026/)
**Takeaway PT-BR:** ecoa Veracode (45% sem melhora entre ciclos) e conecta ao surgimento de frameworks de governança de vibe coding.

---

## Síntese para o currículo (o que a evidência sustenta)

1. **Percepção ≠ realidade** (METR 2025; SO Survey 2025): ganho com IA não é automático nem uniforme, e os próprios devs erram a autoavaliação em ~40 pontos — medir é parte do trabalho.
2. **Velocidade de escrever sobe, qualidade estrutural cai** (GitClear; DORA 2025): duplicação ~8–10×, refactor em queda mínima histórica, instabilidade de entrega maior — IA é amplificador: processo saudável acelera, pântano afunda mais rápido.
3. **Segurança não melhora sozinha** (Veracode 2025+2026; AppSecSanta): ~26–45% do código gerado contém falha conhecida, plano entre gerações — revisão adversarial é obrigatória e perene.
4. **Agente ≠ mergeable** (METR holístico): 0 de 15 PRs de agente entraram sem correção humana — o humano é o gate de qualidade por excelência.
5. **A prática varia com experiência** (arXiv 2605.24521): currículo estruturado muda outcome — treinamento formal é a variável de controle.

**Lacunas declaradas (honestidade metodológica):** sem fonte primária verificada para (a) benchmarks específicos de Qwen 3.8 27B em RTX 3090 vs Opus 4.8 e (b) evidência experimental pós-2025 sobre efetividade de técnicas de prompt em modelos com raciocínio nativo — o próprio agente de survey declarou não ter verificado esses tópicos e recomendou não citar números sem checagem ([09](09-survey-openscience.md), "Lacunas de cobertura"). No material, estes pontos aparecem como contexto de mercado, não como fato medido.
