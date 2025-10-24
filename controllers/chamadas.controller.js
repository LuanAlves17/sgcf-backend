const service = require("../services/chamadas.service");

exports.createChamada = async (req, res, next) => {
  try {
    const result = await service.criarChamada(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
