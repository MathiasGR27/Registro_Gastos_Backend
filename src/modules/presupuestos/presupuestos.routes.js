const express = require("express");
const router = express.Router();

const auth = require("../../core/auth.middleware");
const controller = require("./presupuestos.controller");

router.get("/actual", auth, controller.getActual);
router.post("/", auth, controller.guardar);

module.exports = router;