const db = require("../../database/connection");

exports.getGastosPorUsuario = async () => {
    const res = await db.query(`
        SELECT 
            u.id AS usuario_id,
            u.nombre AS usuario,
            u.email,
            g.id AS gasto_id,
            g.monto,
            g.descripcion,
            g.fecha,
            c.nombre AS categoria
        FROM usuarios u
        LEFT JOIN gastos g ON g.usuario_id = u.id
        LEFT JOIN categorias c ON g.categoria_id = c.id
        WHERE u.rol = 'usuario'
        ORDER BY u.id, g.fecha DESC
    `);

    return res.rows;
};

exports.createAdmin = async (admin) => {
    const { nombre, email, password, rol } = admin;

    const res = await db.query(
        `
        INSERT INTO usuarios(nombre, email, password, rol)
        VALUES($1, $2, $3, $4)
        RETURNING id, nombre, email, rol
        `,
        [nombre, email, password, rol]
    );

    return res.rows[0];
};