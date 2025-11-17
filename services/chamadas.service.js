const prisma = require("../config/db");
const { broadcast } = require("../config/websocket");

exports.criarChamada = async ({ unidade, fila, romaneios }) => {
  if (!unidade || !fila || !romaneios?.length) {
    throw new Error("Dados incompletos. Informe unidade, fila e romaneios.");
  }

  await prisma.caminhoes_chamados.createMany({
    data: romaneios.map((r) => ({
      nr_romaneio: r.nr_romaneio,
      nr_placa_veiculo: r.nr_placa_veiculo,
      nm_motorista: r.nm_motorista,
      unidade,
      fila,
      data_chamado: new Date(),
      telefone_motorista: r.telefone_motorista,
      cultura: r.cultura,
      tipo_romaneio: r.tipo_romaneio,
    })),
  });

  const payload = {
    type: "chamada",
    unidade,
    fila,
    romaneios: romaneios.map((r) => ({ ...r, fila })),
  };

  broadcast(payload);

  return { message: "Chamadas registradas com sucesso." };
};