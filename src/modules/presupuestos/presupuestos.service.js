const repo = require("./presupuestos.repository");

exports.getActual = async (usuarioId) => {
    return await repo.getActual(usuarioId);
};

exports.upsert = async (usuarioId, data) => {
    return await repo.upsert(usuarioId, data.limite_mensual);
};