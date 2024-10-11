const bcrypt = require('bcrypt');
const pool = require('../config/db');

const saltRounds = 10;

async function registrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
  
    if (!senha) {
      return res.status(400).json({ error: 'Senha é obrigatória' });
    }
  
    const senhaHash = await bcrypt.hash(senha, saltRounds);
  
    try {
      const result = await pool.query(
        'INSERT INTO usuarios (nome, email, senha_hash, data_criacao) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [nome, email, senhaHash]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
}
async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    res.status(200).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, tipo_usuario: usuario.tipo_usuario });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = { registrarUsuario, loginUsuario };
