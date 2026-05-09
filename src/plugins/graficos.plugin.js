module.exports = {
    name: "graficos",

    execute(data) {

        // Gráfico por categoría
        const porCategoria = {};

        data.forEach(gasto => {
            const cat = gasto.categoria || "Sin categoría";

            if (!porCategoria[cat]) {
                porCategoria[cat] = 0;
            }

            porCategoria[cat] += Number(gasto.monto);
        });

        const pieChart = Object.keys(porCategoria).map(cat => ({
            name: cat,
            value: porCategoria[cat]
        }));

        // Gráfico por fecha
        const porFecha = {};

        data.forEach(gasto => {
            const fecha = new Date(gasto.fecha).toISOString().split("T")[0];

            if (!porFecha[fecha]) {
                porFecha[fecha] = 0;
            }

            porFecha[fecha] += Number(gasto.monto);
        });

        const lineChart = Object.keys(porFecha).map(fecha => ({
            fecha,
            total: porFecha[fecha]
        }));

        return {
            pieChart,
            lineChart
        };
    }
};