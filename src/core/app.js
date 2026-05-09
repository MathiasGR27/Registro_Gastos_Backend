require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Rutas
const routes = require('../routes');
const pluginManager = require('./pluginManager');
const totalesPlugin = require('../plugins/totales.plugin');
const alertasPlugin = require('../plugins/alertas.plugin');
const reportesPlugin = require('../plugins/reportes.plugin');
const graficosPlugin = require('../plugins/graficos.plugin');
const presupuestoPlugin = require("../plugins/presupuesto.plugin");
const pdfPlugin = require("../plugins/pdf.plugin");

pluginManager.register(totalesPlugin);
pluginManager.register(alertasPlugin);
pluginManager.register(reportesPlugin);
pluginManager.register(graficosPlugin);
pluginManager.register(presupuestoPlugin);
pluginManager.register(pdfPlugin);

app.use('/api', routes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});