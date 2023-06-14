const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os produtos
router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) =>{
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});

//insere um produto
router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, quant) VALUES (?,?)',
            [req.body.nome, req.body.quant],
            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error: error})}
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });

});

//retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) =>{
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });

    
});

//altera um produto
router.patch('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(

            'UPDATE produtos SET nome = ?, quant = ? WHERE id_produto = ?',

            [   req.body.nome, 
                req.body.quant, 
                req.body.id_produto
            ],

            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'
                });
            }
        )
    });
});

//exclui um produto
router.delete('/', (req, res, next) =>{
    
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(

            'DELETE FROM produtos WHERE id_produto = ?',

            [   req.body.nome, 
                req.body.quant, 
                req.body.id_produto
            ],

            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Produto removido com sucesso'
                });
            }
        )
    });

});

module.exports = router;