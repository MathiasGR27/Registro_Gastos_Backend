const service = require('./categorias.service');

exports.getCategorias = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.createCategoria = async (req, res) => {
    const data = await service.create(req.body);
    res.json(data);
};

exports.updateCategoria = async (req, res) => {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
};

exports.deleteCategoria = async (req, res) => {
    const data = await service.remove(req.params.id);
    res.json(data);
};