const express = require('express');
const router = express.Router();

//retorna todos os pedido
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});

//insere um pedido
router.post('/', (req, res, next) =>{

    const pedido = {
        id_pedido: req.body.produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensagem: 'O pedido foi criado',
        pedidoCriado: pedido 
    });
});

//retorna os dados de um pedido
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
        res.status(200).send({
            mensagem: 'Detalhes do pedido',
            id: id
        }); 
});

//exclui um pedido
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Pedido excluido'
    });
});

module.exports = router;