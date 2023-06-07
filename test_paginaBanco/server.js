const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'PostgreSQL14',
  password: '123',
  database: 'Doador',
  host: 'localhost',
  port: 5432
});

app.post('/checkout', async (req, res) => {
  const client = await pool.connect();
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao finalizar a compra:', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
