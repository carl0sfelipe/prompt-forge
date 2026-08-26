# 07 — Avaliação, certificação e glossário

*FORGE ACADEMY · v2.0*

---

## Parte A — Matriz de avaliação do programa

| Componente | Instrumento | Critério | Quem aplica |
|---|---|---|---|
| Módulo 1 (todos) | jogo PROMPT//FORGE | sync médio ≥ **75%** + checkpoint humano | coordenador + mentor |
| Módulo 2 (técnicos; não-devs: capítulos conceituais) | jogo VANILLA//FORGE (em construção; interinamente: avaliação escrita do mentor) | sync médio ≥ **75%** | coordenador + mentor |
| Trilha | projeto final com evidências | rubrica abaixo | banca (mentor + 1 par) |

**Como ler as tentativas** (o jogo registra): à 1ª = acelerar; 2–4 = normal, mentoria nos anti-padrões repetidos; 5+ na mesma missão = voltar ao capítulo antes de insistir. Tentativa é dado de mentoria, não punição.

**Rubrica do projeto final (0–2 por linha, aprovado ≥ 70% do máximo):**

1. **Especificação** — o escopo/contrato é verificável (entrada, saída, aceite)?
2. **Fundamentação** — decisões citam o dado certo (medição/spec/catalogo) e distinguem o que é medição nossa?
3. **Verificação** — há evidência de teste/revisão adversarial/ensino do runbook conforme a trilha?
4. **Perímetro** — nenhum segredo/dado sensível vazou no processo? Anonimização aplicada?
5. **Comunicação** — um leigo entenderia a apresentação final? Um técnico acharia os números?
6. **Honestidade** — incertezas e lacunas declaradas em vez de maquiadas?

## Parte B — Certificação

- **Certificado FORGE ACADEMY** emitido por curso do jogo quando sync médio ≥75% — registra XP total, sync, missões e **tentativas** (total e à primeira).
- Recertificação/anual: jogo com missões reembaralhadas + checkpoint humano atualizado.
- O certificado é do aluno, não da sessão: vale RESET + perfil limpo em banco de avaliação.

## Parte C — Glossário da casa (o que todo estagiário deve saber dizer com as próprias palavras)

**token** — pedaço de texto (~3/4 de palavra) em que a IA pensa e cobra; a unidade de custo e de contexto.
**contexto (janela de)** — quanto texto o modelo consegue considerar de uma vez; cabe o problema inteiro?
**alucinação** — resposta fluente e falsa gerada por natureza estatística; não é bug, é risco a gerenciar.
**prompt full-stack** — persona+tarefa+dados+formato+restrições+raciocínio num contrato só (cap. 12 núcleo 1).
**grounding** — colar o dado verbatim com delimitadores e proibir invenção (UNKNOWN).
**idempotência** — a mesma operação repetida produz o mesmo efeito; o antídoto do retry duplicado.
**migração** — mudança versionada de schema com plano de reversão; nunca edição direta em produção.
**restore drill** — ensaio periódico de restauração de backup; backup não testado não é backup.
**CI/CD** — esteira: push roda teste, merge verde gera artefato, deploy é reversível.
**churn de código** — código reescrito/apagado em pouco tempo; subiu de 3,3% para 7,1% na era IA (GitClear) — sinal de geração descartável.
**post-mortem sem culpa** — análise de incidente focada em "o que o sistema permitiu", com ação que vira teste+alerta.
**runbook** — receita documentada de operação (rollback, escalada); só vale ensaiado.
**VRAM** — memória da GPU; o recurso escasso que define qual modelo cabe na máquina.
**quantização** — modelo comprimido (ex. Q4) para caber em menos VRAM com perda pequena e mensurável.
**tokens/s (throughput)** — palavras por segundo da GPU; converte hardware em capacidade de atendimento.
**TCO** — custo total de propriedade (hardware+energia+operação vs pago-por-token); a conta local vs API.
**inference vs fine-tuning** — usar o modelo vs ajustá-lo (LoRA); 24GB faz a primeira bem e a segunda em escala de experimento.
**RAG** — o modelo responde com base nos documentos colados/indexados, com citação; privacidade + "não sei" possível.
**perímetro** — a fronteira do que pode cruzar para a IA (segredo nunca; dado de terceiro mínimo e anonimizado).
**vibe coding** — construir software descrevendo intenções para IA; funciona com os travões deste programa: especificação, verificação, fronteiras.

---

*Material FORGE ACADEMY v2.0 · base científica em [08-bibliografia.md](08-bibliografia.md) · avaliação aplicada via PROMPT//FORGE e VANILLA//FORGE.*
