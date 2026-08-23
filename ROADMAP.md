# ROADMAP — brainstorm de desenvolvimento

Priorizado por valor ÷ esforço. Marcos curtos de preferência: cada item deve caber numa sessão de vibe coding.

## ✅ Feito na refatoração inicial (v1.0)

- [x] Engine separada do conteúdo (cursos = dados puros, registry plug-in)
- [x] Fim do exploit "a maior é sempre a correta": 4 opções por slot, armadilha longa > master, linter automático
- [x] Gate de dificuldade: CHAOS não avança; re-run reembaralha
- [x] XP único por missão; sync = melhor por missão; replay para masteria
- [x] Persistência de progresso (localStorage) + RESET no HUD
- [x] Fix de render: textos de opções agora escapam HTML (`<tickets>` sumia da tela no esboço original)

## 🎯 Curto prazo — dificuldade e profundidade (próximas 2–3 sessões)

1. **Modos de dificuldade** (RECRUIT / OPERATIVE / PHANTOM)
   - OPERATIVE = regra atual; RECRUIT sem gate; PHANTOM com timer por missão (bonus XP) e XP decay por re-run.
   - Guardar modo no save; chip no HUD.
2. **Timer soft com bônus** — sem punição (não é jogo de reflexo), mas run "under X min" multiplica XP ×1.5. Barra fina no HUD da missão.
3. **Slot "TRAP CHECK" ocasional** — 1 em cada N missões traz um slot onde TODAS as opções são ruins e a resposta certa é "nenhuma das anteriores" (ensina a rejeitar escolha forçada).
4. **Heatmap de erros** — guardar por slot-id quantas vezes o jogador caiu em cada armadilha; mostrar no certificado ("seus 3 anti-padrões mais recorrentes").

## 🧩 Médio prazo — conteúdo e retenção

5. **i18n PT-BR** — campo `lang` no manifest + missões traduzidas; seletor na boot screen junto ao seletor de cursos.
6. **Segundo curso piloto (3–4 missões)** para provar a modularidade — candidatos: *Git interativo*, *Regex*, *Higiene de segurança digital* (phishing, senhas, 2FA).
7. **Free-text grading (rascunho)** — missão final do curso: jogador ESCREVE o prompt num textarea; rubrica heurística local (keywords obrigatórias, proibidas, comprimento) dá o score. Difere do múltipla escolha e é o maior salto de dificuldade possível. LLM-judge opcional fica para quando houver backend.
8. **Missões bônus desbloqueáveis** — 1 missão extra por curso, liberada só com avg sync ≥ 90%.
9. **Compartilhar certificado** — renderizar o certificado em canvas → PNG para download.

## 🛠️ Infra — qualidade de vida para vibe coding

10. **Testes unitários da engine** (vitest): `scoring.js` e `validate.js` são puros — cobre gate, XP único, detecção de length-bias. CI via GitHub Actions.
11. **Lint de cursos como CLI** (`node js/tools/lint-courses.mjs`) para rodar no pre-commit, sem abrir o navegador.
12. **Template de curso** — `js/courses/_template/` com missão de exemplo comentada + snippet de registro.

## 🚀 Longo prazo — ideias grandes

13. **Prompt budget**: o prompt montado tem limite de "tokens"; opção longa custa mais — força trade-off entre completude e concisão (reforça a lição anti-length-bias).
14. **Boss rush**: sequência aleatória de slots de todas as missões, sem brief, contra o clock.
15. **Backend opcional** (suspiro): leaderboards, LLM-judge de free-text, certificados verificáveis. Só quando o jogo local estiver maduro.

## Decisões abertas

- Nome/brand da engine se ela virar multi-curso ("FORGE"? "SKILLFORGE"?) — hoje o repo é `prompt-forge` e a engine é genérica por dentro.
- License (hoje: nenhum arquivo de licença).
- PT-BR como idioma padrão dos cursos futuros vs EN.
