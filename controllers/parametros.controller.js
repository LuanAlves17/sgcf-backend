const service = require("../services/parametros.service");

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getParametros(req.params.unidade);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const novo = await service.createParametro(req.body.unidade);
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
};

exports.createFila = async (req, res, next) => {
  try {
    const fila = await service.createFila(req.params.paramId, req.body.nome_fila);
    res.status(201).json(fila);
  } catch (err) {
    next(err);
  }
};

exports.deleteFila = async (req, res, next) => {
  try {
    await service.deleteFila(req.params.id);
    res.json({ message: "Fila removida" });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const atualizado = await service.updateParametro(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
};
