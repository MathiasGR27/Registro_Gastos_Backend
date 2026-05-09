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

exports.updateGasto = async (req, res) => {
    const gastoId = req.params.id;
    const usuarioId = req.user.id;

    const data = await service.update(gastoId, req.body, usuarioId);

    res.json(data);
};

exports.deleteGasto = async (req, res) => {
    const gastoId = req.params.id;
    const usuarioId = req.user.id;

    const data = await service.remove(gastoId, usuarioId);

    res.json(data);
};