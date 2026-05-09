const plugins = [];

function register(plugin) {
    plugins.push(plugin);
}

function executeAll(data) {
    return plugins.map(p => ({
        plugin: p.name,
        result: p.execute(data)
    }));
}

module.exports = {
    register,
    executeAll
};