const service = require('./categorias.service');

exports.getCategorias = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.createCategoria = async (req, res) => {
    const data = await service.create(req.body);
    res.json(data);
};