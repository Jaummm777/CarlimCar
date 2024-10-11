const bcrypt = require('bcrypt');
const pool = require('./config/db');

const saltRounds = 10;

async function inserirUsuario(nome, email, senha) {
  try {
    const senhaHash = await bcrypt.hash(senha, saltRounds);
    const res = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash, data_criacao) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nome, email, senhaHash]
    );
    console.log('Usuário inserido:', res.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir usuário:', err);
  }
}

inserirUsuario('João', 'joao@email.com', 'senha123');
inserirUsuario('Maria', 'maria@email.com', 'senha456');
