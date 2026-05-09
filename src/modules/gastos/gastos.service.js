const repo = require("./gastos.repository");
const pluginManager = require("../../core/pluginManager");

exports.getMisGastos = async (usuarioId, inicio, fin) => {
    const gastos = await repo.getByUsuario(usuarioId, inicio, fin);
    const plugins = pluginManager.executeAll(gastos);

    return { gastos, plugins };
};

exports.create = async (data, usuarioId) => {
    return await repo.create(data, usuarioId);
};

exports.update = async (gastoId, data, usuarioId) => {
    return await repo.update(gastoId, data, usuarioId);
};

exports.remove = async (gastoId, usuarioId) => {
    return await repo.remove(gastoId, usuarioId);
};