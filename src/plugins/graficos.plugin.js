module.exports = {
    name: "graficos",

    execute(data) {

        // 🔹 Gráfico por categoría (pie chart)
        const porCategoria = {};

        data.forEach(gasto => {
            const cat = gasto.categoria_id;

            if (!porCategoria[cat]) {
                porCategoria[cat] = 0;
            }

            porCategoria[cat] += Number(gasto.monto);
        });

        const pieChart = Object.keys(porCategoria).map(cat => ({
            name: `Categoria ${cat}`,
            value: porCategoria[cat]
        }));

        // 🔹 Gráfico por fecha (line chart)
        const porFecha = {};

        data.forEach(gasto => {
            const fecha = new Date(gasto.fecha).toISOString().split('T')[0];

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