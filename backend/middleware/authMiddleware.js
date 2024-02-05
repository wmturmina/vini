const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'Token não fornecido. Acesso não autorizado.' });
    }

    try {
        const decoded = jwt.verify(token, 'JWT');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token inválido. Acesso não autorizado.' });
    }
};

module.exports = { authenticate };