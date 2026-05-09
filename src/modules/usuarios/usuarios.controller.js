const service = require('./usuarios.service');

exports.register = async (req, res) => {
    try {
        const user = await service.register(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const data = await service.login(req.body);
        res.json(data);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};