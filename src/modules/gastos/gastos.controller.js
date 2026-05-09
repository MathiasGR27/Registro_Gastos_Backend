const service = require("./gastos.service");

exports.getMisGastos = async (req, res) => {
    const { inicio, fin } = req.query;
    const data = await service.getMisGastos(req.user.id, inicio, fin);
    res.json(data);
};

exports.createGasto = async (req, res) => {
    const data = await service.create(req.body, req.user.id);
    res.json(data);
};