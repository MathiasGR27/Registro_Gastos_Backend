module.exports = {
    name: "alertas",

    execute(data) {

        const alertas = [];

        // Alerta por gasto alto individual
        data.forEach(gasto => {
            if (Number(gasto.monto) > 100) {
                alertas.push({
                    tipo: "gasto_alto",
                    mensaje: `Gasto alto detectado: $${gasto.monto} en ${gasto.descripcion}`
                });
            }
        });

        // Alerta por total alto
        const total = data.reduce((acc, g) => acc + Number(g.monto), 0);

        if (total > 500) {
            alertas.push({
                tipo: "total_alto",
                mensaje: `Has superado el límite total: $${total}`
            });
        }

        return alertas;
    }
};