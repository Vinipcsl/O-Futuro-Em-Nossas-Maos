const express = require('express');
const router = express.Router();
const pool = require('../postgres').pool;

// Retorna todos os produtos
router.get('/', (req, res, next) => {
    pool.connect((error, client, done) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        client.query('SELECT * FROM produtos;', (error, resultado) => {
            done();
            if (error) {
                return res.status(500).send({ error: error });
            }
            return res.status(200).send({ response: resultado.rows });
        });
    });
});

// Insere um produto
router.post('/', (req, res, next) => {
    pool.connect((error, client, done) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = 'INSERT INTO pedidos (id_pedido, quantidade, produto) VALUES ($1, $2, $3)';
        const values = [id_pedido, quantidade, produto];
        client.query(query, values, (error, resultado) => {
            done();
            if (error) {
                return res.status(500).send({ error: error });
            }
            res.status(201).send({
                mensagem: 'Produto inserido com sucesso',
                id_produto: resultado.rows[0].id_produto
            });
        });
    });
});

// Retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    pool.connect((error, client, done) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = 'SELECT * FROM produtos WHERE id_produto = $1';
        const values = [req.params.id_produto];
        client.query(query, values, (error, resultado) => {
            done();
            if (error) {
                return res.status(500).send({ error: error });
            }
            return res.status(200).send({ response: resultado.rows });
        });
    });
});

// Altera um produto
router.patch('/', (req, res, next) => {
    pool.connect((error, client, done) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = 'UPDATE produtos SET nome = $1, quant = $2 WHERE id_produto = $3';
        const values = [req.body.nome, req.body.quant, req.body.id_produto];
        client.query(query, values, (error, resultado) => {
            done();
            if (error) {
                return res.status(500).send({ error: error });
            }
            res.status(202).send({ mensagem: 'Produto alterado com sucesso' });
        });
    });
});

// Exclui um produto
router.delete('/', (req, res, next) => {
    pool.connect((error, client, done) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = 'DELETE FROM produtos WHERE id_produto = $1';
        const values = [req.body.id_produto];
        client.query(query, values, (error, resultado) => {
            done();
            if (error) {
                return res.status(500).send({ error: error });
            }
            res.status(202).send({ mensagem: 'Produto removido com sucesso' });
        });
    });
});

module.exports = router;