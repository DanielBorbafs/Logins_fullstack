const express = require("express");
const router = express.Router();
const path = require('path');

// Importe a conexão com o banco de dados aqui
const connection = require('./models/connection');

module.exports = (publicPath) => {
    router.get('/login', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });

    router.post('/endpoint-de-login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const [results, fields] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

            if (results.length > 0) {
                console.log('Usuário encontrado no banco de dados.. estou redirecionando para a página principal!');
                res.json({ success: true, redirect: 'teste.html' });
            } else {
                console.log('Usuário não encontrado no banco de dados.');
                res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
            }
        } catch (err) {
            console.error('Erro ao verificar usuário no banco de dados:', err);
            res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
        }
    });

    return router;
};
