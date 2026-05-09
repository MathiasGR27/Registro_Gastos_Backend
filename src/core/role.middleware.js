module.exports = function requireRole(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "No autorizado" });
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ error: "No tienes permisos" });
        }

        next();
    };
};