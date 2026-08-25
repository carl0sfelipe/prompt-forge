/* PT — MT PROVA MESTRA */
export default {
  name: "PROVA MESTRA", skill: "PROMPT FULL-STACK",
  protocol: { name: "O PROMPT FULL-STACK", desc: "Persona + tarefa + dados fundamentados + formato + restrições + raciocínio — montados como um contrato só. É isso que engenharia de prompt profissional parece em produção." },
  brief: {
    obj: "PROVA DE CERTIFICAÇÃO. 03:42 da manhã: o checkout caiu. O CTO quer (1) um resumo do incidente em 4 frases para executivos e (2) uma lista numerada de correções para engenharia — um prompt só, construído a partir do log abaixo.",
    data: "03:41:02 ERROR payment-gw timeout após 30s (stripe-api)\n03:41:07 WARN  fila de retry em 1.204\n03:42:11 ERROR pico de 502 em /checkout (p99 29.8s)\n03:43:40 INFO  deploy #4471 por j.alves — payments-service v2.3.1\n03:44:02 ERROR circuit-breaker OPEN em payments-service\n03:47:19 INFO  rollback iniciado pelo plantonista",
    note: "Tudo de uma vez: <b>persona, tarefa, grounding, formato, restrições, raciocínio</b>. Escreva o prompt em que você confiaria às 3 da manhã.",
    criteria: ["2 entregáveis", "timestamps citados", "especulação não vira fato"],
  },
  slots: [
    { label: "PERSONA", options: [
      { t: "Atue como um engenheiro full-stack brilhante e líder técnico, com expertise profunda em todo o stack, da infraestrutura cloud à estratégia de produto.", why: "Currículo impressionante, vaga errada. Sem disciplina de incidente nem noção de audiência." },
      { t: "Atue como um desenvolvedor.", why: "Sem especialidade, sem postura — você recebe conversa genérica de debug." },
      { t: "Atue como um engenheiro bom em explicar coisas.", why: "Simpático, mas vago — sem disciplina de incidente, sem noção de audiência." },
      { t: "Atue como SRE sênior conduzindo resposta a incidente: factual, orientado a timeline, sem culpar ninguém.", why: "Exatamente a expertise e a postura profissional que este entregável exige." },
    ]},
    { label: "NÚCLEO DA TAREFA", options: [
      { t: "Investigue tudo sobre este incidente com profundidade — causa raiz, fatores contribuintes, impacto ao cliente, implicações de negócio e estratégia de prevenção de longo prazo.", why: "Soa minucioso, não define entregável — o modelo escolhe a própria forma e profundidade." },
      { t: "Examine tudo o que aconteceu neste incidente, do início ao fim, e me relate absolutamente tudo sobre ele, com todos os detalhes.", why: "Sem entregável definido — um 'tudo' sem limites deixa o modelo escolher a própria forma." },
      { t: "Explique a queda.", why: "Um entregável embaçado; executivos e engenheiros precisam de coisas diferentes." },
      { t: "Dois entregáveis: (a) resumo do incidente em 4 frases para executivos; (b) lista numerada de correções para engenharia.", why: "Duas saídas nomeadas, duas audiências nomeadas. Nada para adivinhar." },
    ]},
    { label: "CONTEXTO", options: [
      { t: "Use seu conhecimento sobre sistemas de pagamento em produção, comportamento de gateways e modos de falha típicos para reconstruir o que provavelmente aconteceu aqui.", why: "Convida fabricação a partir de priors — uma história confiante sobre a queda de outra pessoa." },
      { t: "Os logs estão no Grafana, se precisar.", why: "O modelo não tem navegador nem Grafana. Vai fabricar." },
      { t: "Vou colar as linhas importantes logo depois desta frase.", why: "Bom instinto, cerca fraca — 'importantes' é o seu filtro, não uma fronteira verbatim." },
      { t: "Use apenas o log fornecido abaixo, cercado entre <log> e </log>. Cite o timestamp de cada afirmação.", why: "Fundamentado, cercado, e cada afirmação vira verificável." },
    ]},
    { label: "FORMATO", options: [
      { t: "Estruture a resposta de forma bela — seções claras, títulos e hierarquia visual — para ficar fácil de escanear de executivos a plantonistas.", why: "Decoração para todas as audiências não serve a nenhuma; engenharia segue sem conseguir consumir." },
      { t: "Do jeito que ficar mais claro.", why: "Delegar formato é delegar a interface. O caos vem." },
      { t: "Use bullet points.", why: "Uma forma, não um contrato — tamanho, jargão e estrutura continuam soltos." },
      { t: "Resumo: prosa simples, sem jargão, máx. 4 frases. Correções: numeradas, cada item = AÇÃO + EVIDÊNCIA DO LOG.", why: "Cada saída tem um contrato explícito e verificável." },
    ]},
    { label: "RESTRIÇÕES", options: [
      { t: "Inclua cada detalhe e observação que conseguir extrair do log, por menor que seja — num incidente, informação completa importa mais do que brevidade.", why: "Às 3h da manhã, ruído custa horas. Tudo = nada priorizado." },
      { t: "Mencione tudo, só por garantia.", why: "Volume sem prioridade — o CTO lê dez linhas para achar um fato." },
      { t: "Seja curto.", why: "Limite relativo não é limite — curto comparado com quê?" },
      { t: "Afirme apenas o que o log prova. Marque qualquer especulação explicitamente como HYPOTHESIS.", why: "Fato e especulação ficam separáveis — seguro de encaminhar ao CTO." },
    ]},
    { label: "RACIOCÍNIO", options: [
      { t: "Analise como um detetive — siga cada pista e palpite até a conclusão antes de responder, com total confiança nas conclusões finais.", why: "Caça a palpites com confiança obrigatória — o oposto de uma cadeia auditável de incidente." },
      { t: "Só me dê o seu palpite de imediato — o que você acha que aconteceu aqui e qual seria a primeira coisa que deveríamos tentar fazer?", why: "Palpites às 3h da manhã começam guerras em post-mortem." },
      { t: "Pense com cuidado sobre isso.", why: "Esforço invisível — você não audita 'com cuidado'." },
      { t: "Reconstrua a timeline primeiro, depois identifique o evento-gatilho, depois proponha correções ordenadas por impacto.", why: "Uma cadeia auditável: timeline → gatilho → correções. A ordem implica prioridade." },
    ]},
  ],
  outcomes: {
    good: "RESUMO EXECUTIVO\nO checkout ficou fora do ar das 03:41 às ~03:47 por timeouts do payment-service alcançando o gateway. O gatilho correlaciona com o deploy #4471 (payments-service v2.3.1) às 03:43:40. O rollback do plantonista restaurou o serviço às 03:47. Sem evidência no log de impacto a dados de clientes.\n\nLISTA DE CORREÇÕES (ENGENHARIA)\n1. Gate deploys do payments-service atrás de canário + teste de rollback automático — ev. 03:43:40, 03:47:19\n2. Reduzir timeout do payment-gw abaixo de 30s e alertar fila de retry > 500 — ev. 03:41:02, 03:41:07\n3. Adicionar alerta de SLO p99 do checkout antes dos picos de 502 — ev. 03:42:11\n\nHYPOTHESIS: v2.3.1 introduziu uma chamada bloqueante — verificar no diff do release.",
    mid: "A queda provavelmente foi causada por um deploy. O rollback resolveu. Engenharia deve checar o payments service e talvez ter mais cuidado na próxima. Executivos: está tudo bem agora.",
    bad: "Parece que seus servidores estão sobrecarregados! Recomendo reiniciar tudo e checar a página de status do seu provedor de cloud. Também pode ser DNS, um firewall mal configurado, ou possivelmente um ciberataque. Boa sorte!",
  },
};
