const express = require("express");
const router = express.Router();

const auth = require("../../core/auth.middleware");
const controller = require("./gastos.controller");

router.get("/mis-gastos", auth, controller.getMisGastos);
router.post("/", auth, controller.createGasto);
router.put("/:id", auth, controller.updateGasto);
router.delete("/:id", auth, controller.deleteGasto);

module.exports = router;