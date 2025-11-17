const service = require("../services/caminhoes.service");

exports.getChamados = async (req, res, next) => {
  try {
    const data = await service.getChamados(req.params.unidade);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getChamadosHoje = async (req, res, next) => {
  try {
    const data = await service.getChamadosHoje(req.params.unidade);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEsperando = async (req, res, next) => {
  try {
    const data = await service.getEsperando(req.params.unidade);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAguardandoEntrada = async (req, res, next) => {
  try {
    const data = await service.getAguardandoEntrada(req.params.unidade);
    res.json(data);
  } catch (err) {
    next(err);
  }
};