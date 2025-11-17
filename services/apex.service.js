async function carregarStatus(unidade) {
  const response = await apexClient.get(APEX_ENDPOINT);
  const apexData = response.data.items || [];

  const chamados = await prisma.caminhoes_chamados.findMany({
    where: { unidade },
    orderBy: { data_chamado: "desc" }
  });

  const apexMap = new Map(apexData.map((r) => [String(r.nr_romaneio), r]));
  const chamadosMap = new Map(chamados.map((c) => [String(c.nr_romaneio), c]));

  const aguardando = []; // Caminhões na fila (APEX) que NÃO foram chamados
  const aguardandoEntrada = []; // Caminhões chamados mas ainda não entraram
  const entraram = []; // Caminhões que já entraram

  // Caminhões no APEX que NÃO foram chamados = aguardando na fila
  for (const rom of apexData) {
    if (!chamadosMap.has(String(rom.nr_romaneio))) {
      aguardando.push(rom);
    }
  }

  // Processar caminhões chamados
  for (const chamado of chamados) {
    const rom = apexMap.get(String(chamado.nr_romaneio));

    if (rom) {
      // Caminhão ainda está no APEX
      if (!chamado.entrou) {
        aguardandoEntrada.push({ ...chamado, ...rom }); // Chamado mas não entrou
      } else {
        entraram.push(chamado); // Já marcado como entrou (caso raro)
      }
    } else {
      // Caminhão NÃO está mais no APEX = entrou
      entraram.push(chamado);
      
      if (!chamado.entrou) {
        await prisma.caminhoes_chamados.update({
          where: { id: chamado.id },
          data: { entrou: true },
        });
      }
    }
  }

  return {
    tipo: "atualizacao",
    aguardando, 
    aguardandoEntrada, 
    entraram, 
    snapshot: apexData
  };
}