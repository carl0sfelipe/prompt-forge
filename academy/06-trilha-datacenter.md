# 06 — Trilha Mini Datacenter · Operar modelos em produção

*FORGE ACADEMY · trilha de operação · pré-requisito: núcleos 1 e 2 + trilha 05 (vocabulário de hardware)*

**Objetivos.** Ao fim da trilha você deve: (1) subir e operar um serviço de inferência local (Ollama/vLLM) com observabilidade; (2) dimensionar fila/throughput/energia de um rack pequeno; (3) tratar o perímetro de dados como produto vendável; (4) escrever e ensaiar runbooks.

---

## Cap. 1 — A pilha de serving local

O que roda num mini datacenter nosso, de baixo pra cima:

1. **Hardware** — GPU(s) 24GB-class, NVMe (modelos carregam rápido), rede gigabit+.
2. **Runtime de inferência** — **Ollama** (operação simples, API OpenAI-compatível em `localhost:11434`) ou **vLLM** (throughput serioso, batch contínuo, para servir vários usuários). Regra: Ollama para estações e pilotos; vLLM quando existe fila de clientes.
3. **Gateway** — autenticação, rate limit, log de requisição (quem, quanto, quando) na frente do runtime. O mesmo gateway serve modelos locais E APIs externas — o consumidor não sabe (nem precisa) onde rodou cada tarefa.
4. **Observabilidade** — tokens/s por endpoint, tamanho de fila, VRAM ocupada, temperatura, kWh. O painel do cap. 20 do núcleo, aplicado a GPU.

Comando de sobrevivência (a mesma lógica vale em qualquer runtime): subir o serviço → puxar o modelo → medir tokens/s → registrar no catálogo interno. **Todo modelo no catálogo tem número medido nosso, com prompt de referência** — é isso que separa especificação de folclore.

## Cap. 2 — Dimensionamento sem achismo

A conta de capacidade que converte business em rack:

```
usuários simultâneos ≈ tokens/s da GPU ÷ tokens/s médios por requisição
carga diária          ≈ requisições/dia × tokens médios por requisição
GPU necessária        ≈ carga no pico ÷ tokens/s sustentável da placa
```

E os custos que o spreadshet esquece: **energia** (GPU ~350W sob carga + overhead → kWh/hora de pico no preço local), **refrigeração** (cada kW de equipamento vira kW de calor), **NVMe e rede** (carga de modelo e contexto), **redundância** (uma GPU só = SLA de uma GPU só — vender honesto).

**Checkpoint** — dimensione: 3 clientes, 50k tokens/dia cada, pico de 20 req simultâneas, modelo 27B Q4. Quantas GPUs? Qual o kWh/mês estimado?

## Cap. 3 — Roteamento: a decisão que é nosso produto

A tabela do cap. 21 do núcleo, agora como **política operacional do gateway**: tarefa sensível/volumosa → local; raciocínio pesado eventual → API frontier; copiloto ambiente → modelo flash. O gateway implementa a política; a política é revisada por trimestre (o mercado de modelos muda — o processo de revisão não).

Padrão que dá produtividade segura: **RAG local** — documentos do cliente indexados em casa, o modelo local responde com citação de página; nada sai, e "não sei" é uma resposta válida (a regra UNKNOWN do cap. 8 do núcleo, agora em produção).

## Cap. 4 — O perímetro como produto

Cada cláusula do cap. 6 do núcleo vira linha de proposta: dado processado em infraestrutura dedicada; log com retenção configurável; nenhuma telemetria de conteúdo; isolated por cliente quando contratado. E do lado de dentro: **as chaves de API que o datacenter usa** (sim, vamos usar APIs também) moram em secret manager com escopo mínimo e rotação — um mini datacenter com credencial vazada é um incidente com N clientes dentro.

## Cap. 5 — Operação de verdade: runbook e ensaio

O mínimo documentado por serviço (e **ensaiado em jogo de fogo mensal**, não só escrito):

- **Rollback de modelo** — voltar para a versão anterior em < 5 min quando um update regredir qualidade (sim, modelo também tem "deploy" e "release");
- **GPU travada/fonte de calor** — detecção (alerta de temperatura/fila), mitigação (drenar para outra GPU/API fallback), comunicação ao cliente afetado;
- **Restauro de índice RAG** — backup + restore drill (a lição do cap. 16: backup não testado não é backup);
- **Escalada** — quem decide o quê às 3h da manhã, com número de quem acorda.

Post-mortem sem culpa igual ao núcleo: quando cair (vai cair), a pergunta é "o que no sistema permitiu isto", e a ação vira alerta + item de runbook.

**Projeto final da trilha** — subir um serviço real (modelo 27B via Ollama atrás de gateway com log), medir tokens/s, escrever o runbook de rollback e **ensaiar o ensaio** na frente da banca na semana 6.
