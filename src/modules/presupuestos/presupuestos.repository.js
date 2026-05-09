const db = require("../../database/connection");

exports.getActual = async (usuarioId) => {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const res = await db.query(
        `
        SELECT *
        FROM presupuestos
        WHERE usuario_id = $1 AND mes = $2 AND anio = $3
        `,
        [usuarioId, mes, anio]
    );

    return res.rows[0];
};

exports.upsert = async (usuarioId, limite_mensual) => {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const res = await db.query(
        `
        INSERT INTO presupuestos(usuario_id, limite_mensual, mes, anio)
        VALUES($1, $2, $3, $4)
        ON CONFLICT(usuario_id, mes, anio)
        DO UPDATE SET limite_mensual = EXCLUDED.limite_mensual
        RETURNING *
        `,
        [usuarioId, limite_mensual, mes, anio]
    );

    return res.rows[0];
};