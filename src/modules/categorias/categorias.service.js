const repo = require('./categorias.repository');

exports.getAll = async () => {
    return await repo.getAll();
};

exports.create = async (data) => {
    return await repo.create(data);
};

exports.update = async (id, data) => {
    return await repo.update(id, data);
};

exports.remove = async (id) => {
    return await repo.remove(id);
};