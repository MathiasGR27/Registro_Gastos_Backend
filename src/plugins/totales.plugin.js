module.exports = {
    name: "totales",

    execute(data) {
        const total = data.reduce((acc, g) => acc + Number(g.monto), 0);
        return { total };
    }
};