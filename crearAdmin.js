const bcrypt = require("bcrypt");
const db = require("./src/database/connection");

async function crearAdmin() {
    const passwordPlano = "1234";
    const passwordHash = await bcrypt.hash(passwordPlano, 10);

    await db.query(
        `
        INSERT INTO usuarios(nombre, email, password, rol)
        VALUES($1, $2, $3, $4)
        `,
        ["Administrador", "admin@test.com", passwordHash, "admin"]
    );

    console.log("Admin creado correctamente");
    process.exit();
}

crearAdmin();