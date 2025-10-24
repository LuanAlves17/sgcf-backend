const express = require("express");
const router = express.Router();
const controller = require("../controllers/parametros.controller");

router.get("/:unidade", controller.getAll);
router.post("/", controller.create);
router.post("/:paramId/filas", controller.createFila);
router.delete("/filas/:id", controller.deleteFila);
router.patch("/:id", controller.update);

module.exports = router;