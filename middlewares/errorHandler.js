exports.errorHandler = (err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(500).json({ error: err || "Erro interno do servidor" });
};
