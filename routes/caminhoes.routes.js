const express = require("express");
const router = express.Router();
const controller = require("../controllers/caminhoes.controller");

router.get("/chamados/:unidade", controller.getChamados);
router.get("/chamados-hoje/:unidade", controller.getChamadosHoje);
router.get("/esperando/:unidade", controller.getEsperando);

router.put("/chamados/entrou/:nr_romaneio", controller.marcarEntrada);

module.exports = router;
