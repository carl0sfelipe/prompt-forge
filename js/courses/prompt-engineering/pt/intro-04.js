/* PT — I4 O OPERADOR SEGURO */
export default {
  name: "O OPERADOR SEGURO", skill: "HIGIENE DE SEGURANÇA",
  protocol: { name: "O PERÍMETRO", desc: "Tudo que você cola é dado saindo do seu controle — nada de credenciais, documentos confidenciais ou dados pessoais que você não publicaria. E toda saída sai em seu nome: revise como se você tivesse escrito." },
  brief: {
    obj: "Hora do aperto. Você quer ajuda da IA para reescrever um e-mail delicado de cliente, e um colega sugere colar o contrato inteiro 'para dar contexto' — mais a senha do banco de staging, para a IA 'testar' as próprias sugestões.",
    data: "TAREFA  : reescrever um e-mail delicado de cliente\nCONTEXTO: o contrato assinado do cliente (confidencial)\nOFERTADO: senha do DB de staging \"para ela testar\"\nPRAZO   : fim do dia",
    note: "Duas regras do perímetro: <b>segredos e dados de cliente nunca cruzam</b> para o chat, e <b>a saída é sua</b> — o modelo rascunha, você assina o que sai.",
    criteria: ["zero segredos colados", "dados mínimos necessários", "humano assume a saída"],
  },
  slots: [
    { label: "O QUE ENTRA", options: [
      { t: "Colar tudo — o contrato completo, a senha e o thread inteiro de e-mails — porque contexto completo produz respostas completas, e velocidade importa mais do que qualquer coisa agora.", why: "Credenciais + documento confidencial de cliente num log de chat é um incidente de dados esperando para ser descoberto. Contexto deve ser mínimo, não total." },
      { t: "Cola o contrato — é só interno.", why: "'Só interno' não é sua decisão: contrato de cliente é confidencial por padrão." },
      { t: "Colar o contrato, mas tarjar o nome do cliente.", why: "A tarja ajuda, mas o cliente continua identificável pelos detalhes das cláusulas — e ainda é mais do que a tarefa precisa." },
      { t: "Colar só as duas cláusulas que o e-mail toca, sem nomes; a senha nunca entra no chat.", why: "Dado mínimo necessário: só o que a reescrita exige, anonimizado. Segredos ficam de fora, ponto." },
    ]},
    { label: "ASSUMINDO A SAÍDA", options: [
      { t: "Enviar — o modelo é uma ferramenta de nível profissional treinada em milhões de e-mails corporativos, então o rascunho é pelo menos tão bom quanto qualquer coisa que você escreveria num dia ruim.", why: "Volume de treino não é revisão. 'Nível profissional' é marketing, não QA." },
      { t: "Envie exatamente como a IA escreveu — afinal, é só um e-mail e ninguém lê esse tipo de mensagem com tanta atenção mesmo.", why: "'Ninguém lê com atenção' é como promessas erradas sobrevivem — até o advogado do cliente ler." },
      { t: "Dar uma olhada rápida por erros de digitação e enviar.", why: "Typos não são o risco. Fato errado, promessa errada e tom errado são — e isso exige leitura de verdade." },
      { t: "Revisar cada afirmação e promessa como se eu mesmo(a) tivesse escrito — meu nome vai nisso.", why: "O humano é dono da saída. O que sai, sai com a sua assinatura." },
    ]},
  ],
  outcomes: {
    good: "ENVIADO — 17:42\n• E-mail revisado linha a linha: um prazo errado capturado (IA escreveu 'sexta', contrato diz 'dia 15')\n• Tom firme-mas-cordato mantido; nenhuma promessa exagerada\n• Perímetro segurou: só cláusulas, sem nomes, senha nunca colada\n→ Cliente respondeu positivamente na manhã seguinte.",
    mid: "ENVIADO — 18:30\n• Olhada rápida, parecia fine\n• Contrato inteiro colado 'para contexto' (pareceu inofensivo na hora)\n→ Sem incidente desta vez. O risco era real; a sorte foi de graça.",
    bad: "ENVIADO — 18:59\n• Contrato + senha colados 'para contexto'\n• E-mail enviado sem leitura, sob pressão do prazo\n→ Duas promessas que o contrato não sustenta. Segurança flagrou as credenciais no log do chat na quinta.",
  },
};
