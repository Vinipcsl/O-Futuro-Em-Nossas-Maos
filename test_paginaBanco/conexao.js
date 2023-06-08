const { Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  password: '123',
  database: 'Doador',
  host: 'localhost',
  port: 5432
};

// Função para inserir um pedido no banco de dados
async function insertPedido(id_pedido, quantidade, produto) {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    const query = 'INSERT INTO pedidos (id_pedido, quantidade, produto) VALUES ($1, $2, $3)';
    const values = [id_pedido, quantidade, produto];
    await client.query(query, values);
    console.log('Pedido inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir o pedido:', error);
  } finally {
    await client.end();
  }
}

module.exports = {
  insertPedido
};
