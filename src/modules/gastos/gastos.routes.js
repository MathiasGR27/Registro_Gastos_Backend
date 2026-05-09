const express = require("express");
const router = express.Router();

const auth = require("../../core/auth.middleware");
const controller = require("./gastos.controller");

router.get("/mis-gastos", auth, controller.getMisGastos);
router.post("/", auth, controller.createGasto);
router.put("/:id", auth, controller.updateGasto);
router.delete("/:id", auth, controller.deleteGasto);
router.get("/export/pdf",auth,controller.exportPDF);

module.exports = router;