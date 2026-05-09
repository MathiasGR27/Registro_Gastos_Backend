const db = require("../../database/connection");

exports.create = async (user) => {
    const { nombre, email, password, rol } = user;

    const res = await db.query(
        "INSERT INTO usuarios(nombre, email, password, rol) VALUES($1,$2,$3,$4) RETURNING id, nombre, email, rol",
        [nombre, email, password, rol]
    );

    return res.rows[0];
};

exports.findByEmail = async (email) => {
    const res = await db.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    return res.rows[0];
};