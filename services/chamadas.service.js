const prisma = require("../config/db");
const { sendToAll } = require("../config/websocket");

exports.criarChamada = async ({ unidade, fila, romaneios }) => {
  if (!unidade || !fila || !romaneios?.length) {
    throw new Error("Dados incompletos. Informe unidade, fila e romaneios.");
  }

  await prisma.caminhoes_chamados.createMany({
    data: romaneios.map((r) => ({
      nr_romaneio: r.nr_romaneio,
      placa: r.placa,
      nome_motorista: r.nome_motorista,
      unidade,
      fila,
      data_chamado: new Date(),
      telefone_motorista: r.telefone_motorista,
      cultura: r.cultura
    })),
  });

  const payload = {
    type: "chamada",
    unidade,
    fila,
    romaneios: romaneios.map((r) => ({ ...r, fila })),
  };

  sendToAll(payload);

  return { message: "Chamadas registradas com sucesso." };
};