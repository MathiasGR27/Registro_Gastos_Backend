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