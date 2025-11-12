const prisma = require("../config/db");
const apexClient = require("../config/apexClient");
const { DateTime } = require("luxon");
const { toCampoGrandeISO } = require("../utils/timezone");

const APEX_ENDPOINT = "caminhoes_por_unidade";

exports.getChamados = async (unidade) => {
  const data = await prisma.caminhoes_chamados.findMany({ where: { unidade } });
  return data.map((c) => ({
    ...c,
    data_chamado: toCampoGrandeISO(c.data_chamado),
  }));
};

exports.getChamadosHoje = async (unidade) => {
  const now = DateTime.now().setZone("America/Campo_Grande");
  const data = await prisma.caminhoes_chamados.findMany({
    where: {
      unidade,
      data_chamado: {
        gte: now.startOf("day").toJSDate(),
        lt: now.endOf("day").toJSDate(),
      },
    },
  });
  return data.map((c) => ({
    ...c,
    data_chamado: toCampoGrandeISO(c.data_chamado),
  }));
};

exports.getEsperando = async (unidade) => {
  const response = await apexClient.get(APEX_ENDPOINT);
  const data = response.data.items;
  if (!Array.isArray(data)) throw new Error("Formato inesperado do APEX");
  return data.filter((r) => r.unidade === unidade);
};

exports.marcarComoEntrou = async (nr_romaneio) => {
  if (!nr_romaneio) throw new Error("nr_romaneio é obrigatório.");

  const atualizado = await prisma.caminhoes_chamados.updateMany({
    where: { nr_romaneio: String(nr_romaneio) },
    data: { entrou: true },
  });

  if (atualizado.count === 0) {
    throw new Error(`Romaneio ${nr_romaneio} não encontrado ou já marcado como entrou.`);
  }

  return { message: `Romaneio ${nr_romaneio} marcado como entrou.` };
};
