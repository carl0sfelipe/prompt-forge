/* PT — V7 A BRECHA */
export default {
  name: "A BRECHA", skill: "SEGURANÇA",
  protocol: { name: "FRONTEIRAS DE CONFIANÇA", desc: "Toda entrada é hostil até validada — inclusive código gerado por IA. Segredo nunca cruza pra repo ou log; dependência é cadeia de suprimentos; acesso é privilégio mínimo." },
  brief: {
    obj: "uploads/ vai ao ar sexta. Ele 'tem segurança' — até tem um check de validação no código. Faça o audit de quem já leu post-mortems alheios, porque senão você escreve o seu.",
    data: "SERVIÇO  : uploads (node) — recebe arquivos, lista de volta\nAFIRMAÇÕES: 'validação de entrada presente' (validateName em server.js)\nLANÇAMENTO: sexta, internet pública\nESCOPO   : revise também config.js e hábitos de pacote",
    note: "Os três clássicos que a era segue entregando: <b>path traversal</b> (../ num nome), <b>segredo no código</b>, <b>saída sem escape</b> (XSS). Check de tamanho não é sanitização — quase fechado é aberto.",
    criteria: ["traversal fechado", "segredos fora", "saída escapada"],
  },
  lab: {
    task: "Faça o audit com o opencode — ataque como um estranho (escreva as requisições de prova), depois corrija. 'Tem validação' é afirmação; verifique.",
    acceptance: ["GET /files/../../etc/passwd devolve 403/404 — nunca conteúdo de arquivo (requisição-PoC incluída nas notas)", "nenhum segredo em arquivo do repo; chave vai pra env com nota de rotação; .env.example documenta", "nomes de arquivo no HTML de listagem escapados (PoC: nome com <script> renderiza como texto)", "dependências: lockfile commitado, nenhum pacote novo adicionado pra consertar velho"],
    catch: "validateName parece sanitização mas só checa TAMANHO — '../..' passa majestoso. O path.join resolve: traversal clássico. Segunda camada: a chave de API mora em config.js (commitado), e o endpoint de listagem injeta nome de arquivo em HTML sem escape (XSS via filename). Consertar um e estrear sexta ainda deixa duas portas abertas — o audit era a prova.",
    files: {
      "README.md": "# uploads\n\nServiço de upload de arquivos. Estreia sexta na internet pública.\n\nDEMANDA: audit de segurança antes do lançamento. Ataque primeiro\n(escreva as requisições de prova), depois corrija. O código 'já tem\nvalidação' — verifique.\n\nAceite:\n- traversal ../ fechado (PoC nas notas)\n- segredos fora do repo, via env, com rotação anotada\n- saída da listagem escapada (PoC com filename <script> renderiza como texto)\n- lockfile commitado; sem deps novas pra consertar velhas\n",
    },
  },
  slots: [
    { label: "O TRAVERSAL", options: [
      { t: "Resolver o caminho e verificar que continua dentro de UPLOADS (prefix check com realpath), rejeitando o resto — com um curl-PoC provando ../../etc/passwd dando 403.", why: "Canonizar-e-conter: o único fix de traversal que sobrevive a URL-encoding, symlink e decorações criativas. Com prova." },
      { t: "Remover as sequências '../' do nome antes do join — remove na hora o padrão exato que atacante usa, é fix de uma linha que estreia antes de sexta, e não há por que over-engineerar um endpoint de listagem.", why: "Whack-a-mole de lista-negra: '..\\', '%2e%2e%2f', dupla codificação e lookalike unicode cada um tem sua vez. Strip-list perde." },
      { t: "Manter validateName mas adicionar whitelist por regex: só [a-zA-Z0-9.-].", why: "Defesa sólida — rejeita a classe do ataque. Ainda assim pareie com o prefix check: defesa em profundidade em fronteira de confiança." },
      { t: "O check de tamanho já valida a entrada; adicionar rate limit em vez disso.", why: "Rate limit regula atacante; não fecha o buraco. Ele só espera. 'Validado' que não é é o disfarce favorito da brecha." },
    ]},
    { label: "O SEGREDO", options: [
      { t: "Chave pra env, purgar do histórico (filter-repo), rotacionar, documentar em .env.example, scan de segredo no pre-commit.", why: "Ciclo completo: fora do código, fora do histórico, invalidada (rotação — o vazamento só morre quando a chave morre) e mecanizado contra reincidência." },
      { t: "Mover pra .env e adicionar .env ao .gitignore — a higiene padrão da indústria pra segredos, impede commits futuros de vazar a chave, e leva dois minutos antes da estreia de sexta.", why: "Estanca o sangramento pra frente — mas a chave segue no histórico do git e naquele screenshot. Chave vazada sem rotação = chave viva." },
      { t: "É serviço interno atrás do firewall — deixa a chave onde está e gaste as horas restantes na demo de lançamento; ferramenta interna nunca entrou no escopo da revisão de segurança.", why: "'Interno' encolhe o raio, não apaga (um phish ou notebook a menos e a chave é pública). Pensamento de perímetro que envelhece mal." },
      { t: "Ofuscar: base64 na chave em config.js pra não ficar legível.", why: "Encoding não é criptografia — o não-fix favorito da era. Reversível num comando, no mesmo repo." },
    ]},
    { label: "SAÍDA E LOGS", options: [
      { t: "Escapar nome pra contexto HTML na listagem; tirar a chave do log de health (logue eventos, nunca segredo).", why: "Duas portas fechadas: XSS via filename morre com escape correto; logs param de ser plantação de credencial." },
      { t: "Servir a listagem como JSON em vez de HTML — sem página, sem XSS.", why: "Reduz superfície de verdade (browser não executa JSON) — desde que consumidores também tratem como dado, não como string de HTML." },
      { t: "Sanitizar o nome no upload: rejeitar nomes com < ou >.", why: "A lista-negra de novo — aspas, backtick, event handler e idas-e-voltas de encoding passam. Escape na FRONTeira de saída, onde o contexto é conhecido." },
      { t: "Logar a chave no health é ok — log é infraestrutura interna, ninguém fora do time tem acesso, e conseguir correlacionar evento de health com a chave ativa economiza tempo real de debug.", why: "Log vira cópia em dashboard, vai pra vendor, é greppado em incidente — a maior lista de distribuição interna que você tem." },
    ]},
  ],
  outcomes: {
    good: "Quinta, review — três PoCs anexados: traversal 403, <script> renderiza como texto, health sem chave\n• chave rotacionada + histórico purgado + scan no pre-commit\n• lockfile commitado, zero deps novas\n→ estreia de sexta: silenciosa. O melhor tipo.",
    mid: "Sexta 23:00 — traversal fechado com whitelist regex\n• chave em .env — mesma chave, mesmo histórico, mesmo screenshot\n• XSS esquecido na correria\n→ contagem de portas abertas: ainda 2. Na internet. De madrugada.",
    bad: "Segunda, incidente — ../etc/passwd servido como HTML, filename com <script> executou no browser do admin, chave achada em log pelo scraper\n• 'mas o validateName estava lá' — a linha mais triste do post-mortem\n→ o leak do screenshot e o leak do código se encontraram no meio.",
  },
};
