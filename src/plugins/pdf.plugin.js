const PDFDocument = require("pdfkit");

function agruparPorCategoria(gastos) {
    const data = {};

    gastos.forEach(g => {
        const categoria = g.categoria || "Sin categoría";
        data[categoria] = (data[categoria] || 0) + Number(g.monto);
    });

    return Object.entries(data).map(([categoria, total]) => ({
        categoria,
        total
    }));
}

module.exports = {
    name: "pdf",

    execute(gastos, context = {}) {
        return {
            generarPDF(res) {
                const doc = new PDFDocument({
                    margin: 45,
                    size: "A4"
                });

                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=reporte-gastos.pdf");

                doc.pipe(res);

                const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
                const categorias = agruparPorCategoria(gastos);

                // HEADER
                doc
                    .rect(0, 0, 595, 95)
                    .fill("#0f172a");

                doc
                    .fillColor("#00e676")
                    .fontSize(22)
                    .text("Reporte de Gastos", 45, 30);

                doc
                    .fillColor("#cbd5e1")
                    .fontSize(10)
                    .text(`Generado: ${new Date().toLocaleDateString()}`, 45, 60);

                doc
                    .fillColor("#ffffff")
                    .fontSize(12)
                    .text(`Usuario: ${context.usuario?.email || "Usuario"}`, 360, 35);

                // RESUMEN
                doc.moveDown();
                doc
                    .fillColor("#0f172a")
                    .fontSize(16)
                    .text("Resumen", 45, 125);

                doc
                    .roundedRect(45, 155, 150, 70, 10)
                    .fill("#ecfdf5");

                doc
                    .fillColor("#047857")
                    .fontSize(10)
                    .text("TOTAL GASTADO", 65, 172);

                doc
                    .fillColor("#064e3b")
                    .fontSize(22)
                    .text(`$${total.toFixed(2)}`, 65, 190);

                doc
                    .roundedRect(215, 155, 150, 70, 10)
                    .fill("#eff6ff");

                doc
                    .fillColor("#1d4ed8")
                    .fontSize(10)
                    .text("N° DE GASTOS", 235, 172);

                doc
                    .fillColor("#1e3a8a")
                    .fontSize(22)
                    .text(`${gastos.length}`, 235, 190);

                doc
                    .roundedRect(385, 155, 150, 70, 10)
                    .fill("#fff7ed");

                doc
                    .fillColor("#c2410c")
                    .fontSize(10)
                    .text("CATEGORÍAS", 405, 172);

                doc
                    .fillColor("#7c2d12")
                    .fontSize(22)
                    .text(`${categorias.length}`, 405, 190);

                // GRÁFICO DE BARRAS
                doc
                    .fillColor("#0f172a")
                    .fontSize(16)
                    .text("Gastos por categoría", 45, 255);

                const chartX = 55;
                const chartY = 290;
                const maxBarWidth = 330;
                const barHeight = 18;
                const gap = 14;
                const maxTotal = Math.max(...categorias.map(c => c.total), 1);

                categorias.forEach((cat, index) => {
                    const y = chartY + index * (barHeight + gap);
                    const width = (cat.total / maxTotal) * maxBarWidth;

                    doc
                        .fillColor("#334155")
                        .fontSize(10)
                        .text(cat.categoria, chartX, y - 1, { width: 110 });

                    doc
                        .roundedRect(chartX + 120, y, width, barHeight, 6)
                        .fill("#00bfa5");

                    doc
                        .fillColor("#0f172a")
                        .fontSize(10)
                        .text(`$${cat.total.toFixed(2)}`, chartX + 130 + width, y + 3);
                });

                // TABLA
                const tableStartY = chartY + categorias.length * 34 + 40;

                doc
                    .fillColor("#0f172a")
                    .fontSize(16)
                    .text("Detalle de gastos", 45, tableStartY);

                let y = tableStartY + 35;

                doc
                    .rect(45, y, 500, 25)
                    .fill("#0f172a");

                doc
                    .fillColor("#ffffff")
                    .fontSize(10)
                    .text("Descripción", 55, y + 8)
                    .text("Categoría", 230, y + 8)
                    .text("Monto", 350, y + 8)
                    .text("Fecha", 430, y + 8);

                y += 30;

                gastos.forEach((g, index) => {
                    if (y > 740) {
                        doc.addPage();
                        y = 60;
                    }

                    if (index % 2 === 0) {
                        doc
                            .rect(45, y - 5, 500, 25)
                            .fill("#f8fafc");
                    }

                    doc
                        .fillColor("#0f172a")
                        .fontSize(9)
                        .text(g.descripcion || "Sin descripción", 55, y, { width: 160 })
                        .text(g.categoria || "Sin categoría", 230, y, { width: 100 })
                        .text(`$${Number(g.monto).toFixed(2)}`, 350, y)
                        .text(new Date(g.fecha).toLocaleDateString(), 430, y);

                    y += 28;
                });

                doc.end();
            }
        };
    }
};