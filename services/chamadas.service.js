const prisma = require("../config/db");
const { sendToAll } = require("../config/websocket");
const { getEsperando } = require("./caminhoes.service");

exports.criarChamada = async ({ unidade, fila, romaneios }) => {
  if (!unidade || !fila || !romaneios?.length) {
    throw new Error("Dados incompletos. Informe unidade, fila e romaneios.");
  }

  let caminhoesEsperando = await getEsperando(unidade);

  const tipos = [...new Set(romaneios.map(r => r.tipo_romaneio))];

  const romaneiosEsperando = caminhoesEsperando.map(c => c.nr_romaneio);

  const romaneiosInvalidos = romaneios.filter(r => !romaneiosEsperando.includes(r.nr_romaneio));

  if (romaneiosInvalidos.length > 0) {
    throw new Error(
      `Os seguintes romaneios não estão aguardando na unidade: ${romaneiosInvalidos
        .map(r => r.nr_romaneio)
        .join(", ")}`
    );
  }
  if (tipos.length > 1) {
    throw new Error(
      `Não é permitido chamar romaneios de tipos diferentes na mesma chamada. Tipos encontrados: ${tipos.join(", ")}`
    );
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

  sendToAll(payload);

  return { message: "Chamadas registradas com sucesso." };
};
