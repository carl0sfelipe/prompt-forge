# 01 — Manual de Aplicação do Programa

*FORGE ACADEMY · documento do coordenador · v2.0 (out/2026)*

---

## 1. Filosofia

Três princípios que sustentam o programa inteiro:

1. **Especificação é o novo código.** Na era dos modelos, o gargalo profissional deslocou-se de *escrever* para *especificar, verificar e responder*. O currículo inteiro treina esses três músculos.
2. **Errar é método, esconder o erro é problema.** A avaliação registra tentativas de propósito. Um estagiário que passa com 6 tentativas aprendeu mais sobre seus pontos cegos do que um que decolou à primeira — o número existe para orientar mentoria, não para punir.
3. **Nenhum conceito sem uso.** Cada capítulo termina com checkpoint aplicado ao negócio real da empresa (um cliente, uma venda, um rack). Teoria sem cenário das nossas frentes foi cortada.

## 2. Formato geral

- **Duração padrão:** 6 semanas, ~6h/semana (4h estudo + 2h jogo/prática). Perfis dev podem acelerar o núcleo; não pular.
- **Ritmo semanal:** 2 sessões de estudo dirigido (2h cada) + jogo correspondente + 1 sessão de mentoria (30min/aluno) revisando os erros registrados no jogo.
- **Ferramentas:** o jogo (browser), o material (estes arquivos), e um chat de IA à escolha (conta da empresa). A partir do Módulo 2, quem tiver acesso à 3090 local usa também modelo local via Ollama.

## 3. Papéis

| Papel | Quem | Responsabilidade |
|---|---|---|
| **Coordenador** | gestor da frente | aplica o programa, acompanha 75%, decide aprovação |
| **Mentor** | dev sênior / técnico sênior da frente | sessão semanal de mentoria sobre os erros do jogo |
| **Estagiário** | — | estudar, jogar, registrar dúvidas, trazer cenário real |

## 4. A avaliação (como funciona na prática)

1. Cada missão do jogo pontua as decisões do aluno de 0 a 100 (**sync**).
2. O **certificado exige sync médio ≥ 75%** nas melhores runs de todas as missões do curso. Abaixo disso, o selo fica "AINDA NÃO" com a % faltante e o botão leva à missão mais fraca.
3. O certificado registra **tentativas** (total + quantas missões passaram à primeira). Uso do número na mentoria:
   - **Passou à primeira:** pronto para acelerar — dar projeto real supervisionado.
   - **2–4 tentativas:** normal — focar mentoria nos anti-padrões repetidos (o veredito do jogo mostra quais).
   - **5+ na mesma missão:** sinal de lacuna de pré-requisito — voltar ao capítulo correspondente antes de insistir no jogo.
4. **Checkpoint humano (obrigatório ao fim de cada módulo):** 30min de conversa aplicada com o mentor — "mostre no nosso contexto" (ex.: especificar um prompt real de cliente, explicar pra venda por que 24GB de VRAM importa). O jogo mede decisão; o checkpoint mede transferência.

**Regra de aprovação do programa:** certificado do Módulo 1 ≥75% **e** checkpoint humano **e** (para frentes técnicas) certificado do Módulo 2 ≥75% + checkpoint. Perfis não-dev: Módulo 2 em nível conceitual (capítulos indicados no próprio material) + trilha comercial.

## 5. Cronograma sugerido (6 semanas)

| Semana | Núcleo | Jogo | Trilha |
|---|---|---|---|
| 1 | cap. 1–6 (era IA + I1–I4) | missões I1–I4 | — |
| 2 | cap. 7–13 (SPEC → full-stack) | M1–M6 + MT | — |
| 3 | checkpoint M1 + cap. 14–17 (máquina, git, interface, dados) | VANILLA//FORGE V1–V4 | — |
| 4 | cap. 18–22 (prova, fronteiras, brecha, operação, julgamento) | V5–V7 + VT | — |
| 5 | capítulos da trilha da frente | — | projeto de trilha |
| 6 | checkpoint final + apresentação do projeto de trilha | — | certificação |

## 6. O que o coordenador não deve fazer

- **Não inflar o 75%.** A régua é o valor do programa; se baixar, o certificado vira impressora.
- **Não pular a mentoria de erros** — é onde o jogo vira aprendizado em vez de tentativa-e-erro cego.
- **Não usar tentativas como demérito público.** O número orienta 1:1, não rankings.

## 7. Administração do jogo

- Roda em https://carl0sfelipe.github.io/prompt-forge/ (ou local: `python3 serve.py`).
- Progresso fica no `localStorage` do navegador por curso; RESET no HUD apaga (dois cliques, confirmado).
- Para aplicar em prova limpa: reset antes de começar, um perfil de navegador por aluno.
- Para mudar questões/dificuldade: editar `js/courses/<curso>/mission-*.js` — o linter da engine acusa no console se alguém quebrar o contrato anti-exploit (resposta certa nunca é a mais longa/curta).
