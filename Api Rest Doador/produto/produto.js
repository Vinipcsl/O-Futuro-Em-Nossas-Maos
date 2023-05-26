const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota GET para buscar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Rota GET para buscar um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// Rota POST para adicionar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, preco]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

// Rota PUT para atualizar um produto existente
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE produtos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4 RETURNING *',
      [nome, descricao, preco, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Rota DELETE para remover um produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.status(204).json({ message: 'Produto removido com sucesso' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});