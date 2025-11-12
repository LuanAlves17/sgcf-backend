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

exports.marcarEntrada = async (req, res, next) => {
  try {
    const { nr_romaneio } = req.params;
    const result = await service.marcarComoEntrou(nr_romaneio);
    res.json(result);
  } catch (error) {
    next(error);
  }

}