const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.create({
            username,
            password,
        });

        res.json({ user, msg: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro interno do servidor.' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ msg: 'Credenciais inválidas.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Credenciais inválidas.' });
        }

        // Gerar token JWT
        const token = jwt.sign({ userId: user._id }, 'JWT', { expiresIn: '1h' });

        res.json({ token, msg: 'Login bem-sucedido!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro interno do servidor.' });
    }
};

module.exports = { signup, login };