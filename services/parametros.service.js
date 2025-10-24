const prisma = require("../config/db");

exports.getParametros = (unidade) =>
  prisma.parametros.findMany({
    where: { unidade },
    include: { filas: true },
    orderBy: { id: "asc" },
  });

exports.createParametro = (unidade) =>
  prisma.parametros.create({
    data: { unidade, segregacao_fila: false, exibir_fila: false },
  });

exports.createFila = (paramId, nome_fila) => {
  if (!nome_fila) throw new Error("nome_fila obrigatório");
  return prisma.parametro_filas_segregadas.create({
    data: { nome_fila, parametro_id: parseInt(paramId) },
  });
};

exports.deleteFila = (id) =>
  prisma.parametro_filas_segregadas.delete({
    where: { id: parseInt(id) },
  });

exports.updateParametro = (id, data) =>
  prisma.parametros.update({
    where: { id: parseInt(id) },
    data,
  });
