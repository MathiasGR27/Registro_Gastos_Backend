const service = require("./presupuestos.service");

exports.getActual = async (req, res) => {
    const data = await service.getActual(req.user.id);
    res.json(data || null);
};

exports.guardar = async (req, res) => {
    const data = await service.upsert(req.user.id, req.body);
    res.json(data);
};