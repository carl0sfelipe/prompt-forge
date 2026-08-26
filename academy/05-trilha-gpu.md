# 05 — Trilha Revenda de GPU · Hardware para IA no balcão

*FORGE ACADEMY · trilha comercial-técnica · pré-requisito: núcleos 1 e 2 (não-devs: nível conceitual do núcleo 2)*

**Objetivos.** Ao fim da trilha você deve: (1) qualificar a necessidade do cliente e especificar a máquina certa para carga de IA; (2) explicar com propriedade VRAM, tokens/s, quantização e TCO local vs API; (3) usar IA para gerar propostas técnicas sem inventar número — e saber quando o número é do catálogo e quando é medição.

---

## Cap. 1 — O que o cliente está realmente comprando

Ninguém compra "uma 3090"; compra **capacidade de rodar modelos com privacidade, custo marginal baixo e disponibilidade própria**. O mapa de conversa de balcão:

- **Privacidade** — dado sensível que não pode cruzar fronteira (saúde, jurídico, financeiro): local é requisito, não opção.
- **Volume** — tarefa repetitiva em escala (classificação, extração, atendimento): local transforma custo variável em custo fixo já amortizado.
- **Latência/autonomia** — copiloto ambiente, esteira offline, edge: local resolve o que API não alcança.
- **Raciocínio pesado eventual** — um caso por mês de raciocínio frontier: API resolve; não justifica GPU.

A pergunta de qualificação que abre tudo: **"que tarefa, com que dado, quantas vezes por dia, e quem não pode ver esse dado?"**

## Cap. 2 — O vocabulário técnico que vende (porque é verdadeiro)

- **VRAM é o recurso escasso.** O modelo carrega os pesos na memória da GPU; 24GB (uma 3090) comportam modelos da classe ~27B quantizados com folga operacional — a faixa que em 2026 entrega qualidade frontier-de-dois-anos-atrás, suficiente para ~90% das tarefas comerciais. Regra de balcão: o cliente descreve a tarefa, você converte em classe de modelo, a classe em VRAM, a VRAM na máquina. Nada de "quanto mais GB melhor" — VRAM sem caso de uso é dinheiro parado.
- **Quantização** — versão comprimida do modelo (ex.: Q4) que cabe em menos VRAM com perda pequena e mensurável de qualidade. Explicar ao cliente: "o mesmo cérebro, anotações comprimidas".
- **Tokens/s (throughput)** — quantas palavras por segundo a máquina gera; define quantos usuários simultâneos uma GPU atende. É o número que transforma hardware em proposta de capacidade.
- **Contexto** — quanto texto o modelo lê de uma vez (200k, 1M): define quais documentos cabem na tarefa.
- **Batch/fila** — atendimento simultâneo de requisições; é o que diferencia "GPU de trabalho" de "GPU de serviço".

## Cap. 3 — TCO local vs API (a conta que fecha venda)

Argumento estrutural da casa, feito com honestidade — porque cliente refaz a conta:

| | API (frontier) | Local (3090-class) |
|---|---|---|
| Custo | por token, cresce com uso | fixo (hardware + kWh), marginal ~0 |
| Privacidade | dado sai | dado fica |
| Qualidade pico | frontier de hoje | frontier-de-2-anos |
| Disponibilidade | SLA de terceiro | a sua |
| Pico de raciocínio | ideal | limitado |

A conta de balcão: estimar tokens/mês do cliente (tarefa × volume × tamanho médio), multiplicar pelo preço API, comparar com o custo amortizado da máquina (24–36 meses) + energia. **Quando o cruzamento acontece antes de ~18 meses, local vence** — e a revenda vira datacenter (trilha 06). A IA da sua estação monta a tabela com você; os preços vêm do catálogo do dia — colar, não inventar (cap. 5 do núcleo: número carregante se verifica).

## Cap. 4 — Proposta técnica com IA sem alucinar

Fluxo da casa: persona de **pré-venda técnica cética** (cap. 7 do núcleo) + S.P.E.C. + os dados reais da máquina colados verbatim (spec sheet) + contrato de saída (tabela com colunas fixas). Regra inegociável: **todo benchmark citado tem fonte e data**; se for medição nossa, dizer como foi medida. A proposta que "esquece" a fonte perde na due diligence e queima a casa.

**Checkpoint** — gere uma proposta para o caso "clínica, 400 atendimentos/dia, transcrição e sumarização, dado sensível": qual classe de modelo? Quantas GPUs? Onde está o número de tokens/dia?

## Cap. 5 — Objeções e respostas honestas

- *"A IA vai dobrar de capacidade todo ano, não compro algo obsoleto"* — a máquina é CAPEX de 24–36 meses; o ganho anual de software (modelos novos rodando no MESMO hardware via quantização melhor) historicamente valoriza a GPU, não desvaloriza.
- *"Por que não só API?" — cap. 3, a conta na mesa.
- *"Serve para treinar também?"* — 24GB treina com fine-tuning (LoRA) de modelos pequenos/médios e faz experimento; treinar do zero é outro patamar de máquina — ser honesto define credibilidade.
- *"Quantas pessoas atendem simultâneas?"* — tokens/s ÷ consumo por requisição: número de proposta, não de marketing.

**Projeto final da trilha** — pacote completo para um cliente real (ou perfil realista): qualificação, especificação, TCO, proposta com fontes, roteiro de objeções. Apresentar na semana 6.
