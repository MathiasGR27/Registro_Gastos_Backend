const repo = require("./usuarios.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await repo.create({
        nombre: data.nombre,
        email: data.email,
        password: hashedPassword,
        rol: "usuario"
    });
};

exports.login = async ({ email, password }) => {
    const user = await repo.findByEmail(email);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        token,
        user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }
    };
};