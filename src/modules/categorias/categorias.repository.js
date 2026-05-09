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