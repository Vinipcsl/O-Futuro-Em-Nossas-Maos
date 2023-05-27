const express = require('express');
const { Pool } = require('pg');

const app = express();

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'seu_usuario',
  password: 'sua_senha',
  host: 'localhost',
  port: 5432,
  database: 'seu_banco_de_dados',
});

// Middleware para processar dados no formato JSON
app.use(express.json());

// Rota para obter todos os produtos/kit
app.get('/produtos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM produtos');
    const produtos = result.rows;
    client.release();
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota para adicionar um novo produto/kit
app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, preco]
    );
    const produto = result.rows[0];
    client.release();
    res.status(201).json(produto);
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

// Rota para atualizar um produto/kit existente
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE produtos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4 RETURNING *',
      [nome, descricao, preco, id]
    );
    const produto = result.rows[0];
    client.release();
    res.json(produto);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Rota para excluir um produto/kit
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM produtos WHERE id = $1', [id]);
    client.release();
    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
