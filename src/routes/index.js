const express = require("express");
const router = express.Router();

const gastosRoutes = require("../modules/gastos/gastos.routes");
const usuariosRoutes = require("../modules/usuarios/usuarios.routes");
const categoriasRoutes = require("../modules/categorias/categorias.routes");
const adminRoutes = require("../modules/admin/admin.routes");

router.use("/gastos", gastosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/admin", adminRoutes);

module.exports = router;