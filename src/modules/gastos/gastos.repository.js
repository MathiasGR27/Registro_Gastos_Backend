const db = require("../../database/connection");

exports.getByUsuario = async (usuarioId, inicio, fin) => {
    let query = `
        SELECT g.*, c.nombre AS categoria
        FROM gastos g
        JOIN categorias c ON g.categoria_id = c.id
        WHERE g.usuario_id = $1
    `;

    const values = [usuarioId];

    if (inicio && fin) {
        query += ` AND g.fecha >= $2 AND g.fecha < ($3::date + INTERVAL '1 day')`;
        values.push(inicio, fin);
    }

    query += ` ORDER BY g.fecha DESC`;

    const res = await db.query(query, values);
    return res.rows;
};

exports.create = async (gasto, usuarioId) => {
    const { categoria_id, monto, descripcion } = gasto;

    const res = await db.query(
        `
        INSERT INTO gastos(usuario_id, categoria_id, monto, descripcion, fecha)
        VALUES($1, $2, $3, $4, NOW())
        RETURNING *
        `,
        [usuarioId, categoria_id, monto, descripcion]
    );

    return res.rows[0];
};

exports.update = async (gastoId, gasto, usuarioId) => {
    const { categoria_id, monto, descripcion } = gasto;

    const res = await db.query(
        `
        UPDATE gastos
        SET categoria_id = $1,
            monto = $2,
            descripcion = $3
        WHERE id = $4 AND usuario_id = $5
        RETURNING *
        `,
        [categoria_id, monto, descripcion, gastoId, usuarioId]
    );

    return res.rows[0];
};

exports.remove = async (gastoId, usuarioId) => {
    const res = await db.query(
        `
        DELETE FROM gastos
        WHERE id = $1 AND usuario_id = $2
        RETURNING *
        `,
        [gastoId, usuarioId]
    );

    return res.rows[0];
};