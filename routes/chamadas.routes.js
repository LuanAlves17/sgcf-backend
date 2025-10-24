const express = require("express");
const router = express.Router();
const controller = require("../controllers/chamadas.controller");

router.post("/", controller.createChamada);

module.exports = router;
