const express = require("express");
const router = express.Router();

router.use("/parametros", require("./parametros.routes"));
router.use("/chamadas", require("./chamadas.routes"));
router.use("/caminhoes", require("./caminhoes.routes"));

module.exports = router;
