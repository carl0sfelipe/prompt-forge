# PROMPT // FORGE — Training Sim

Jogo/simulador de treinamento em **prompt engineering**, bilíngue (EN/PT-BR). O jogador monta prompts por componentes (task, persona, grounding, formato, constraints, reasoning), compila e vê a saída simulada do "modelo" — boa, medíocre ou caótica, dependendo da qualidade das escolhas.

A progressão leva um **iniciante absoluto** ao nível profissional: I1–I4 (fundamentos, iteração, verificação, segurança) → M1–M6 (técnicas profissionais) → MT (prova final). Total: 11 missões, 1300 XP.

A engine é **course-agnostic**: o mesmo motor roda qualquer curso que siga o schema de dados. Criar um curso novo = criar uma pasta de dados, sem tocar na engine.

## Rodar

```bash
cd prompt-forge
python3 serve.py          # recomendado: envia Cache-Control no-store (recarrega sempre fresco)
# ou: python3 -m http.server 8080  (funciona, mas o browser pode cachear módulos ES entre edições)
# ou: npx serve .
```

Abra `http://127.0.0.1:8137` (serve.py) ou a porta correspondente. (No VS Code, a extensão *Live Server* também serve.)

## Estrutura

```
index.html        # só o esqueleto do DOM (zero lógica)
css/main.css      # todo o visual (tema cyberpunk, tokens em :root)
js/
  main.js           # bootstrap: boot screen, idioma + seletor de cursos, HUD
  engine/           # ENGINE — não conhece nenhum curso específico
    state.js        # estado persistente (localStorage), por curso (com versionamento)
    scoring.js      # funções puras: scoreRun, rankFor, gate
    mission.js      # render da missão, console de montagem, compile, resultado
    ui.js           # helpers de DOM, HUD, codex, certificado, toast
    i18n.js         # dicionário de strings da ENGINE (en/pt) + locale
    localize.js     # merge puro: curso base + overrides de tradução
    audio.js        # synth WebAudio (sem assets)
    fx.js           # canvas: chuva de glyphs + bursts de partículas
    validate.js     # linter de cursos — detecta exploits de autoria
  courses/
    registry.js     # O ÚNICO ponto para registrar um curso novo
    prompt-engineering/
      course.js     # manifest: id, título, ranks, lista de missões, locales
      intro-*.js    # missões I1–I4 (iniciante absoluto)
      mission-*.js  # missões M1–MT (nível profissional)
      pt/           # tradução PT-BR: 1 arquivo por missão + manifest
```

**Regra de ouro para vibe coding:** conteúdo mora em `js/courses/**`, comportamento mora em `js/engine/**`. Quer mudar uma pergunta? Edite `mission-*.js`. Quer mudar pontuação/XP? Edite `scoring.js`. Nada de caçar lógica dentro de HTML.

## Idiomas (i18n)

- Seletor **EN / PT** na tela de boot; detecta `navigator.language` e persiste em `localStorage`.
- **Strings da engine** (HUD, vereditos, botões, certificado): dicionário em `js/engine/i18n.js`.
- **Conteúdo do curso**: overrides em `js/courses/<curso>/pt/` — 1 arquivo por missão, keyed by code no `pt/course.js`.
- O merge (`localize.js`) copia `q` **apenas** do curso-base inglês: tradução nunca muda qual opção é a correta (opções alinham por índice).
- Progresso é **compartilhado entre idiomas** (mesmo course id).
- Para adicionar um idioma: crie a pasta (`es/`, …), adicione o dicionário em `i18n.js` e a entrada em `LANGS`.

## Como criar um curso novo

1. Copie a pasta `js/courses/prompt-engineering/` para `js/courses/<seu-curso>/`.
2. Edite `course.js` (id, títulos, ranks) e os `mission-*.js`.
3. Registre em `js/courses/registry.js`. Com 2+ cursos, a tela de boot vira um seletor automaticamente.

### Schema de uma missão

```js
export default {
  code: "M1",              // único no curso, aparece nos pips
  name: "THE FOG",
  skill: "SPECIFICITY",    // etiqueta da habilidade
  protocol: { name: "S.P.E.C. PROTOCOL", desc: "..." },  // desbloqueia no Codex
  brief: {
    obj: "...",            // objetivo narrativo
    data: "...",           // bloco de dados fornecido ao jogador
    note: "...",           // field note (aceita <b>)
    criteria: ["...", "..."],
  },
  slots: [                 // 2–6 slots por missão
    { id: "TASK", label: "TASK CORE", options: [
      { t: "texto da opção", q: 2, why: "explicação exibida no veredito" },
      // q: 2 = master · 1 = passável · 0 = armadilha
    ]},
  ],
  outcomes: { good: "...", mid: "...", bad: "..." },  // saída simulada por tier
};
```

## Contrato de dificuldade (leia antes de escrever opções)

O bug nº 1 deste gênero de jogo: **a resposta certa ser sempre a mais longa**. O jogador aprende em 2 missões que "clica na maior" e zera o jogo. Regras:

1. **4 opções por slot**: exatamente 1 master (`q:2`), 1 passável (`q:1`), 2 armadilhas (`q:0`).
2. **Comprimento não é pista**: em todo slot, pelo menos uma armadilha deve ser **mais longa** que a master. A armadilha longa ideal é verbosa, confiante e "profissional" — mas contém um anti-padrão (vagueza, porta pra alucinação, formato delegado). A lição embutida: *precisão é informação, não word count*.
3. **Nem sempre a mesma posição**: o perfil de comprimento da master (2ª mais longa, 3ª mais longa…) deve **variar entre slots** — se a master é sempre a 2ª maior, "clica na segunda maior" vira estratégia.
4. **Posição nunca é pista**: a engine embaralha as opções a cada render (já automático).
5. **Por que errar ensina**: toda opção tem `why` — o veredito explica o anti-padrão.
6. **A regra vale por idioma**: as traduções herdaram perfis próprios, verificáveis pelo mesmo linter.

O linter (`validate.js`) roda no boot (base + todos os locales) e acusa no console do navegador violações de 1, 2, 3 e desalinhamento de índice nas traduções — procure por `COURSE LINT`. Lint limpo = sem exploits de comprimento.

## Mecânica de jogo (engine)

- **Gate**: resultado `CHAOS` (menos da metade dos pontos) **não libera a próxima missão** — re-run obrigatório com opções reembaralhadas.
- **XP**: 25 × pontos, concedido **uma única vez** por missão (no primeiro run aprovado). Replay para masteria dá +0 XP, mas melhora o sync.
- **AVG SYNC do certificado**: melhor sync por missão.
- **Progresso**: salvo por curso em `localStorage` (`forge:save:<courseId>`); RESET no HUD (2 cliques) apaga.

## Roadmap

Ver [ROADMAP.md](ROADMAP.md) — brainstorm priorizado de evolução (modos de dificuldade, free-text grading, i18n, testes, novos cursos).
