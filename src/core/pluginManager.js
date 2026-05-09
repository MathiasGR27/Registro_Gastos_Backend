const plugins = [];

function register(plugin) {
    plugins.push(plugin);
}

function executeAll(data, context = {}) {
    return plugins.map(p => ({
        plugin: p.name,
        result: p.execute(data, context)
    }));
}

module.exports = {
    register,
    executeAll
};