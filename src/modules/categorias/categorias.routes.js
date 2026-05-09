const express = require("express");
const router = express.Router();

const auth = require("../../core/auth.middleware");
const requireRole = require("../../core/role.middleware");
const controller = require("./categorias.controller");

router.get("/", auth, controller.getCategorias);

router.post(
    "/",
    auth,
    requireRole("admin"),
    controller.createCategoria
);

router.put(
    "/:id",
    auth,
    requireRole("admin"),
    controller.updateCategoria
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    controller.deleteCategoria
);


module.exports = router;    