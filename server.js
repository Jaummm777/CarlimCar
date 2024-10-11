const express = require('express');
const pool = require('./src/config/db');
const usuariosRouter = require('./src/rotas/usuarios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/usuarios', usuariosRouter);

pool.connect()
    .then(() => {
        console.log(`Conectado ao banco de dados carlimcar_db`);
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));
