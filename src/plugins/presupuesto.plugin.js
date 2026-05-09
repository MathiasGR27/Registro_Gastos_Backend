module.exports = {
    name: "presupuesto",

    execute(gastos, context = {}) {
        const presupuesto = context.presupuesto;

        if (!presupuesto) {
            return {
                configurado: false,
                mensaje: "No tienes presupuesto configurado este mes"
            };
        }
        
        const total = gastos.reduce(
            (acc, g) => acc + Number(g.monto),
            0
        );

        const limite = Number(presupuesto.limite_mensual);
        const porcentaje = limite > 0 ? (total / limite) * 100 : 0;

        return {
            configurado: true,
            limite,
            total,
            porcentaje: Number(porcentaje.toFixed(2)),
            superado: total > limite,
            mensaje: total > limite
                ? "Has superado tu presupuesto mensual"
                : "Tu presupuesto mensual está bajo control"
        };
    }
};