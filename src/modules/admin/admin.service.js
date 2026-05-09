const repo = require("./admin.repository");
const bcrypt = require("bcrypt");

exports.getGastosPorUsuario = async () => {
    return await repo.getGastosPorUsuario();
};

exports.createAdmin = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await repo.createAdmin({
        nombre: data.nombre,
        email: data.email,
        password: hashedPassword,
        rol: "admin"
    });
};