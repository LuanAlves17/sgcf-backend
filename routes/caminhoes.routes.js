const express = require("express");
const router = express.Router();
const controller = require("../controllers/caminhoes.controller");

router.get("/chamados/:unidade", controller.getChamados);
router.get("/chamados", controller.getChamados);
router.get("/chamados-hoje/:unidade", controller.getChamadosHoje);
router.get("/esperando/:unidade", controller.getEsperando);
router.get("/aguardando-entrada/:unidade", controller.getAguardandoEntrada);

module.exports = router;
