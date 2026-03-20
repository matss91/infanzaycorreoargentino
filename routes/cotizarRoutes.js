const express = require("express");
const router = express.Router();
const { cotizarEnvio } = require("../controllers/cotizar");

router.post("/", cotizarEnvio);

module.exports = router;