module.exports = {
    name: "reportes",

    execute(data) {

        //  Total por categoría
        const porCategoria = {};

        data.forEach(gasto => {
            const categoria = gasto.categoria_id;

            if (!porCategoria[categoria]) {
                porCategoria[categoria] = 0;
            }

            porCategoria[categoria] += Number(gasto.monto);
        });

        // Convertir a array para frontend
        const categorias = Object.keys(porCategoria).map(cat => ({
            categoria_id: cat,
            total: porCategoria[cat]
        }));

        //  Reporte por fechas (ordenado)
        const porFecha = data
            .map(g => ({
                fecha: g.fecha,
                monto: Number(g.monto)
            }))
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        return {
            porCategoria: categorias,
            porFecha
        };
    }
};