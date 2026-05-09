const express = require("express");
const router = express.Router();

const auth = require("../../core/auth.middleware");
const requireRole = require("../../core/role.middleware");
const controller = require("./admin.controller");

router.get("/gastos", auth, requireRole("admin"), controller.getGastosPorUsuario);
router.post("/usuarios/admin", auth, requireRole("admin"), controller.createAdmin);

module.exports = router;