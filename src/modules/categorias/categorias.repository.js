const db = require('../../database/connection');

exports.getAll = async () => {
    const res = await db.query('SELECT * FROM categorias');
    return res.rows;
};

exports.create = async (categoria) => {
    const res = await db.query(
        'INSERT INTO categorias(nombre) VALUES($1) RETURNING *',
        [categoria.nombre]
    );

    return res.rows[0];
};

exports.update = async (id, categoria) => {
    const { nombre } = categoria;

    const res = await db.query(
        `
        UPDATE categorias
        SET nombre = $1
        WHERE id = $2
        RETURNING *
        `,
        [nombre, id]
    );

    return res.rows[0];
};

exports.remove = async (id) => {
    const res = await db.query(
        `
        DELETE FROM categorias
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return res.rows[0];
};