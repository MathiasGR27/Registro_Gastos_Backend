const service = require("./admin.service");

exports.getGastosPorUsuario = async (req, res) => {
    const data = await service.getGastosPorUsuario();
    res.json(data);
};

exports.createAdmin = async (req, res) => {
    const data = await service.createAdmin(req.body);
    res.json(data);
};