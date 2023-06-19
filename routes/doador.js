const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb',
});

// Retorna todos os doadores
router.get('/', (req, res) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query('SELECT * FROM doadores', (error, resultado, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            return res.status(200).send({ response: resultado });
        });
    });
});

// Insere um novo doador
router.post('/', (req, res) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const id = generateRandomId();
        conn.query(
            'INSERT INTO doadores (id, nome, sobrenome, telefone) VALUES (?, ?, ?, ?)',
            [id, req.body.nome, req.body.sobrenome, req.body.telefone],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                return res
                    .status(201)
                    .send({ mensagem: 'Doador inserido com sucesso' });
            }
        );
    });
});

// Retorna um doador pelo ID
router.get('/:id', (req, res) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            'SELECT * FROM doadores WHERE id = ?',
            [req.params.id],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                if (resultado.length === 0) {
                    return res.status(404).send({ mensagem: 'Doador não encontrado' });
                }
                return res.status(200).send({ response: resultado[0] });
            }
        );
    });
});

// Altera um doador
router.patch('/:id', (req, res) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            'UPDATE doadores SET nome = ?, sobrenome = ?, telefone = ? WHERE id = ?',
            [req.body.nome, req.body.sobrenome, req.body.telefone, req.params.id],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(200).send({ mensagem: 'Doador alterado com sucesso' });
            }
        );
    });
});

// Exclui um doador
router.delete('/:id', (req, res) => {
    pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            'DELETE FROM doadores WHERE id = ?',
            [req.params.id],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(200).send({ mensagem: 'Doador excluído com sucesso' });
            }
        );
    });
});

// Função para gerar um ID aleatório como número inteiro
function generateRandomId() {
    const min = 1;
    const max = 100000;
    return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = router;
