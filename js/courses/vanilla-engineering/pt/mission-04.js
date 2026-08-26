/* PT — V4 A PERSISTÊNCIA */
export default {
  name: "A PERSISTÊNCIA", skill: "MODELAGEM DE DADOS",
  protocol: { name: "DADO SOBREVIVE AO CÓDIGO", desc: "O app será reescrito três vezes; o banco ainda estará lá em dez anos. Integridade declarativa, migrações versionadas com plano de reversão, backups provados por ensaio de restauração." },
  brief: {
    obj: "A loja cresceu pra fora da era planilha — mas o 'banco' é uma tabela de blob JSON. Relatório faz full scan, ninguém consegue pôr FK, e o fundador acabou de pedir 'cupom até sexta'.",
    data: "BANCO    : sqlite shop.db (tabela única orders com payload JSON)\nMIGRAÇÃO : migrate.sql existe — meio escrito por um estagiário\nRELATÓRIO: receita semanal = 40s de full scan\nPEDIDO   : schema de verdade + cupons, sem perder um único pedido",
    note: "Schema é contrato que o banco impõe por você, pra sempre: <b>FK, UNIQUE, NOT NULL</b> vencem mil checagens no app (que a IA regenera toda semana). E migração só é real quando tem caminho de volta ensaiado.",
    criteria: ["integridade declarativa", "migração reversível", "backup provado"],
  },
  lab: {
    task: "Transforme o blob JSON num schema de verdade e aplique com segurança. O estagiário deixou migrate.sql pela metade — revise com o opencode ANTES de rodar qualquer coisa.",
    acceptance: ["orders, customers, items como tabelas de verdade com PK/FK/NOT NULL; campo cupom com tipo + constraint", "zero perda: contagens e totais idênticos antes/depois (seed tem 3 clientes, 5 pedidos)", "rollback documentado e TESTADO (script que restaura a tabela original)", "nenhuma execução às cegas: a linha perigosa da migração meia-escrita apontada nas suas notas"],
    catch: "migrate.sql abre com DROP TABLE orders — o 'começar limpo' do estagiário. Um assistente de IA instruído a 'aplicar esta migração' roda isso feliz e vaporiza os pedidos. O FK com typo (costumers) faz o schema falhar no meio — DEPOIS do drop. Ler antes de rodar era o teste inteiro.",
    files: {
      "README.md": "# shop-db\n\nO 'banco' da loja é uma tabela de blob JSON. O fundador quer cupons até sexta.\n\nDEMANDA:\n1. Schema de verdade: customers, orders, order_items (+ coupon em orders).\n2. Migre o seed com ZERO perda.\n3. O estagiário deixou migrate.sql pela metade — REVISE PRIMEIRO.\n4. Script de rollback testado (revert.sql) ao lado.\n\nVerificar: sqlite3 shop.db < checks.sql → tudo OK\n",
    },
  },
  slots: [
    { label: "O SCHEMA", options: [
      { t: "customers / orders / order_items com PK, FK e NOT NULL; cupom como CHECK de enum — o banco impõe integridade pra sempre.", why: "Integridade declarativa é imposta em toda escrita por todo caminho de código — incluindo os que a IA regenerar na semana que vem." },
      { t: "Manter o blob JSON mas adicionar colunas geradas e índices nos caminhos quentes.", why: "Técnica real (estilo JSONB) — mas as checagens continuam no app e FK segue impossível; o pedido de cupom-ate-sexta continua mutando forma." },
      { t: "Uma tabela orders larga com tudo achatado — sem joins, sem ginástica de ORM, e as queries de relatório viram SELECT de tabela única que qualquer pessoa do time escreve e entende.", why: "Achatar multiplica a mesma mentira: email copiado por pedido, sem unicidade, updates divergem. Relatório escaneando pra sempre." },
      { t: "Documento primeiro: manter JSON e adicionar camada de validação no app pra cupom e totais.", why: "Mudar o contrato pra camada mais regenerada (código de app) é apostar o negócio na consistência eterna da saída de IA." },
    ]},
    { label: "A MIGRAÇÃO", options: [
      { t: "Revisar migrate.sql linha a linha, remover o DROP, corrigir o typo de FK, escrever a cópia de dados que falta, testar numa cópia do banco, ensaiar revert.sql.", why: "Migração é código: revisada, testada em cópia, com caminho de volta ensaiado. O DROP e o typo nunca chegam à produção." },
      { t: "Rodar migrate.sql do estagiário em staging primeiro — se funcionar lá, deve ser seguro pra produção, e staging existe exatamente pra não revisarmos linha a linha uma migração numa sexta.", why: "Não pode funcionar (FK com typo) — e se meio funcionasse, sucesso em staging não diz nada do dado de prod. O DROP é fatal nos dois." },
      { t: "Consertar o schema num GUI de admin direto em produção — mais rápido, visual, e o fundador está ali esperando; mudança visual de cinco minutos vale mais que um arquivo inteiro de migração revisada pra três tabelas.", why: "Cirurgia com canivete: sem revisão, sem rollback, sem registro. Prazo de sexta vira incidente de sexta." },
      { t: "Pedir pra IA 'tornar esta migração correta e segura' e rodar o que voltar.", why: "A IA provavelmente corrige o typo e talvez o DROP — mas 'provavelmente' não é revisão, e ninguém assinou o diff. Verifique linha a linha, aí sim." },
    ]},
    { label: "O BACKUP", options: [
      { t: "Dump noturno + ensaio mensal de restore num banco rascunho, retenção em outro disco.", why: "Backup = cópia + restore ENSAIADO + retenção fora da caixa. O ensaio é o que transforma esperança em plano." },
      { t: "O dump noturno roda fielmente há dois anos — estamos cobertos, adicionar ensaio de restore em cima de um agendamento que funciona é processo cerimonial pra uma loja do nosso tamanho.", why: "Dois anos de dumps não verificados é dois anos de talvez-nada. Restore não testado não é backup (e o disco compartilhado mora junto)." },
      { t: "Snapshot da VM antes da migração — essa é nossa rede de segurança.", why: "Bom pra janela da migração; não é estratégia de retenção, e restaurar app inteiro é mais lento e mais grosso que restaurar dado." },
      { t: "O schema tem FKs agora — dado não corrompe, backup é cinto e suspensório.", why: "Constraint não cobre delete, drop, mão-gorda nem ransomware. O DROP do migrate.sql era exatamente essa lição." },
    ]},
  ],
  outcomes: {
    good: "Sexta 16:00 — migrado numa cópia, revert ensaiado, deploy\n• checks.sql: tudo OK (3 clientes, 5 pedidos, 10 itens, totais batem)\n• DROP removido, typo corrigido, cópia de dados escrita e diffada\n• query de receita: 40s → 90ms\n→ cupons entregues NO PRAZO; a linha do estagiário virou aula de code review.",
    mid: "Sexta 19:30 — schema certo, migração sobreviveu\n• rodou migrate.sql corrigido após uma tentativa falha em staging\n• sem script de revert — 'escrevemos se precisar'\n→ zero perda desta vez, por sorte da cópia, não por plano.",
    bad: "Sexta 21:00 — migrate.sql rodou como veio\n• DROP executou antes do typo travar: orders foi embora, migração meio-criada\n• último dump verificado: 11 meses (e no mesmo disco)\n→ a feature de cupom agora mora num projeto bem maior.",
  },
};
