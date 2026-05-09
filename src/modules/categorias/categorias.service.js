const repo = require('./categorias.repository');

exports.getAll = async () => {
    return await repo.getAll();
};

exports.create = async (data) => {
    return await repo.create(data);
};