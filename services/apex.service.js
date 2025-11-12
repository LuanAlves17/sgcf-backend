const apexClient = require("../config/apexClient");
const APEX_ENDPOINT = "caminhoes_por_unidade";
const prisma = require("../config/db");

exports.monitorApex = async () => {
  const response = await apexClient.get(APEX_ENDPOINT);
  const data = response.data.items;

  if (!Array.isArray(data)) return null;

  const chamados = await prisma.caminhoes_chamados.findMany({
    where: { entrou: false },
  });

  const chamadosMap = new Map(chamados.map((c) => [c.nr_romaneio, c]));

  for (const item of data) {
    if (item.dt_pesagem_1 && chamadosMap.has(item.nr_romaneio)) {
      const chamado = chamadosMap.get(item.nr_romaneio);

      await prisma.caminhoes_chamados.update({
        where: { id: chamado.id },
        data: { entrou: true },
      });
      
    }
  }

  return JSON.stringify(data);
};