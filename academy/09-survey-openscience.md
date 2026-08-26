# Bibliografia — "Vibe Coding" e IA na Engenharia de Software (2025–2026)

Compilada em 26/08/2026 via pesquisa exclusivamente web (busca de snippets). Revisão de estudos empíricos de 2025–2026 sobre produtividade, segurança, maintainability, avaliação de agentes e confiança dos desenvolvedores em IA para código ("vibe coding").

## Metodologia e critério de ranking

Fontes ordenadas por força de evidência:

1. **RCT** (ensaio controlado randomizado) — mais forte
2. **Longitudinal / benchmark sistemático** — forte, mas observacional
3. **Survey em larga escala** — autorrelatado, n grande
4. **Estudo industrial / qualitativo de n pequeno** — indicativo
5. **Imprensa secundária** — só quando sinalizada como não verificada

Cada entrada traz: título, autores, ano, URL, tipo de evidência e takeaway em 2 linhas (PT-BR).

---

## 1. The Impact of AI Assistance on Experienced Open-Source Developer Productivity (METR RCT)

- **Autores:** Joel Becker, Nate Rush, Beth Barnes, David Rein
- **Ano:** 2025
- **URL:** https://arxiv.org/abs/2507.09089 (blog: https://metr.org/blog/2025-07-10-early-2025-rct-results/)
- **Tipo de evidência:** RCT (ensaio controlado randomizado) — o mais forte da lista
- **Takeaway:** RCT com 16 devs OSS experientes e 246 tarefas reais (fev–jun 2025) usando Cursor Pro + Claude 3.5/3.7 Sonnet: ferramentas de IA deixaram os devs **19% mais lentos**, não mais rápidos.
  Os devs previram +24% de ganho de velocidade e, após o experimento, ainda acreditavam em +20% — a percepção dos desenvolvedores inverte o sinal do efeito real medido.

## 2. METR Uplift Experiment Update (fev 2026)

- **Autores:** Joel Becker et al. (METR)
- **Ano:** 2026
- **URL:** https://metr.org/blog/2026-02-24-uplift-update/
- **Tipo de evidência:** RCT com ressalvas metodológicas graves (efeitos de seleção)
- **Takeaway:** Novo experimento (57 devs, 800+ tarefas, a partir de ago 2025) com estimativas pontuais de **−18% de tempo para devs retornados e −4% para novos** — ou seja, agora favorável à IA.
  Porém a METR declara os resultados **não confiáveis**: devs se recusaram ao braço sem IA e o pagamento caiu de US$ 150 para US$ 50/hora, criando seleção e viés de atrito.

## 3. Veracode 2025 GenAI Code Security Report

- **Autores:** Veracode (equipe de pesquisa)
- **Ano:** 2025
- **URL:** https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/
- **Tipo de evidência:** Bateria de benchmark sistemática (100+ LLMs × 80 tarefas com CWE, 4 linguagens)
- **Takeaway:** **45% das gerações de código por LLM introduzem falha do OWASP Top 10**; Java falha em >70% das tarefas; XSS passa só em 15% e log injection em 12%.
  A taxa de falha de segurança é **flat ao longo do tempo e do tamanho do modelo** — modelos mais novos/maiores não estão ficando mais seguros.

## 4. Veracode Spring 2026 GenAI Code Security Update

- **Autores:** Veracode (equipe de pesquisa)
- **Ano:** 2026
- **URL:** https://www.veracode.com/blog/spring-2026-genai-code-security/
- **Tipo de evidência:** Longitudinal (benchmark repetido, 150+ modelos)
- **Takeaway:** Pass rate estagnado em ~55% (45% de falha); variantes "reasoning" GPT-5.x lideram com 70–72% de aprovação.
  XSS e log injection permanecem inalterados — a evolução dos modelos melhorou o raciocínio, mas não as classes de vulnerabilidade web clássicas.

## 5. AI Copilot Code Quality: 2025 Look Back (GitClear)

- **Autores:** GitClear (equipe de pesquisa)
- **Ano:** 2025
- **URL:** https://www.gitclear.com/ai_assistant_code_quality_2025_research
- **Tipo de evidência:** Longitudinal observacional (211 milhões de linhas alteradas, 2020–2024, repositórios grandes)
- **Takeaway:** Linhas de refatoração ("moved") caíram de **24,8% (2021) para 9,5% (2024)**; copy/paste subiu de 8,3% para 12,3%; blocos duplicados de 5+ linhas cresceram ~8× em 2024 (~10× vs 2022).
  79–80% das mudanças tocam código com menos de 1 mês — padrão consistente com "churn" rápido e dívida técnica crescente, mas **não causal**.

## 6. DORA 2025: State of AI-assisted Software Development

- **Autores:** DORA / Google Cloud
- **Ano:** 2025
- **URL:** https://dora.dev/dora-report-2025/
- **Tipo de evidência:** Survey em larga escala (~5.000 profissionais) + 100+ horas qualitativas (jun–jul 2025)
- **Takeaway:** Pela primeira vez a adoção de IA está **positivamente relacionada a throughput**, mas ainda **aumenta a instabilidade de entrega** — "IA como amplificador" de práticas existentes.
  90% usam IA no trabalho e 30%+ desconfiam do código gerado; o efeito depende da saúde dos processos da equipe.

## 7. Stack Overflow Developer Survey 2025 (módulo IA)

- **Autores:** Stack Overflow
- **Ano:** 2025
- **URL:** https://survey.stackoverflow.co/2025/ai
- **Tipo de evidência:** Survey em larga escala (49k+ devs, 177 países)
- **Takeaway:** 84% usam ou planejam usar IA (vs 76% em 2024), mas **46% desconfiam da acurácia** (31% no ano anterior; só 3% confiam "muito").
  66% são frustrados por respostas "quase certas" e 45% relatam que depurar código de IA leva mais tempo — adoção cresce mais rápido que a confiança.

## 8. AI Code Security Study 2026 (AppSecSanta) ⚠️

- **Autores:** Baris Cankurt (autoria única)
- **Ano:** 2026
- **URL:** https://appsecsanta.com/research/ai-code-security-study-2026
- **Tipo de evidência:** Estudo industrial com validação manual ⚠️ *autoria única, sem revisão por pares*
- **Takeaway:** 6 LLMs (GPT-5.2, Claude Opus 4.6, Gemini 2.5 Pro, DeepSeek V3, Llama 4, Grok 4) × 87 prompts = 522 amostras, avaliadas por 5 ferramentas SAST (incl. CodeQL) com validação de achados: **25,7% de taxa geral de vulnerabilidade**.
  GPT-5.2 foi o melhor (19,5%); três modelos empataram em 29,9%. Broken access control (A01) domina — SSRF (CWE-918): 32 casos; path traversal (CWE-22/23): 30. **Corroboram a Veracode em magnitude, mas com método diferente.**

## 9. Algorithmic vs. Holistic Evaluation of Coding Agents (METR) ⚠️

- **Autores:** David Rein et al. (METR)
- **Ano:** 2025
- **URL:** https://metr.org/blog/2025-08-12-research-update-towards-reconciling-slowdown-with-time-horizons/
- **Tipo de evidência:** Qualitativo de n pequeno (15 PRs revisados manualmente) ⚠️ *achado preliminar*
- **Takeaway:** Revisão manual de 15 PRs gerados por agentes: **nenhum era mergeable sem correção humana**; tempo médio de conserto de ~42 min por PR.
  Sugere que benchmarks algorítmicos (SWE-bench) superestimam a prontidão dos agentes vs. avaliação holística "como se fosse humano" — possível explicação parcial para o desacordo METR vs demais benchmarks.

## 10. Tech Insider Ireland — Veracode 2026 / "Vibe Security Radar" (imprensa) ⚠️ NÃO VERIFICADO

- **Autores:** Tech Insider Ireland (reportagem)
- **Ano:** 2026 (publicada 06/08/2026)
- **URL:** *(reportagem de imprensa; URL não confirmada de forma independente)*
- **Tipo de evidência:** Imprensa secundária ⚠️ **fonte única, nenhuma alegação confirmada de forma independente**
- **Takeaway:** Alega: Veracode 2026 com 56% de pass rate; GPT-5.5 com 68%; e "Georgia Tech Vibe Security Radar" contando **74 CVEs de projetos vibe-coded até mar/2026**.
  **Tratar como não verificado** — nenhum desses números foi confirmado em fonte primária nesta revisão; citar apenas com essa ressalva.

---

## Alegações não verificadas / ressalvas

| Alegação | Fonte | Status |
|---|---|---|
| 19% de slowdown (METR 2025) | arXiv:2507.09089 | ✅ Verificado (RCT) |
| −18%/−4% (METR fev 2026) | metr.org | ✅ Verificado, porém **declared unreliable** pelos próprios autores |
| 45% de falha OWASP (Veracode 2025) | veracode.com | ✅ Verificado (benchmark) |
| 25,7% de vuln (AppSecSanta 2026) | appsecsanta.com | ⚠️ Verificado no site, mas autoria única, sem peer review |
| Veracode 2026: 56% pass / GPT-5.5 68% | Tech Insider Ireland | ❌ Não verificado (fonte única) |
| 74 CVEs vibe-coded (Georgia Tech) | Tech Insider Ireland | ❌ Não verificado (fonte única; existência do "Vibe Security Radar" não confirmada) |
| Refatoração em queda / duplicação em alta (GitClear) | gitclear.com | ✅ Verificado, porém **observacional, não causal** |

## Lacunas de cobertura

Dois tópicos solicitados não puderam ser incluídos com fontes verificadas, pois a busca foi interrompida antes da mineração dos resultados restantes:

1. **Eficácia de prompt engineering em modelos de raciocínio** (CoT/few-shot em modelos classe o1/R1) — nenhuma fonte primária verificada em mãos.
2. **Modelos locais ~27B em GPU de consumo vs APIs frontier** (Gemma 3 27B, Qwen3 ~30B, Devstral 24B em RTX 4090 / SWE-bench) — nenhuma fonte primária verificada em mãos.

Recomendação: tratar estas lacunas como trabalho futuro; não citar números destes tópicos sem verificação prévia.

---

*Fim da bibliografia — 10 fontes (7 verificadas, 1 com ressalva de autoria única, 1 preliminar de n pequeno, 1 de imprensa não verificada).*
