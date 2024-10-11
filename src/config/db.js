const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'carlimcar_db',
  password: '0777',
  port: 5432,   
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados', err.stack);
  }
  console.log('Conectado ao banco de dados carlimcar_db');
});

module.exports = pool;
