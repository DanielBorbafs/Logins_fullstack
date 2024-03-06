const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const cors = require('cors')


app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1578',
    database: 'REDESOCIAL',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connection = pool.promise();


// Configure o diretório 'public' como o diretório raiz para servir arquivos estáticos
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Rota para servir o arquivo HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/endpoint-de-login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const [results, fields] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (results.length > 0) {
            console.log('Usuário encontrado no banco de dados.');
            res.json({ message: 'Usuário autenticado com sucesso!' });
        } else {
            console.log('Usuário não encontrado no banco de dados.');
            res.status(401).json({ message: 'Usuário não autenticado.' });
        }
    } catch (err) {
        console.error('Erro ao verificar usuário no banco de dados:', err);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


