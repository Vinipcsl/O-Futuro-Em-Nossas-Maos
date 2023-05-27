const mysql = require('mysql');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'PostgreSQL14',
  password: '123',
  database: 'Doador',
});

// Estabelecer a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }

  console.log('Conexão bem-sucedida ao banco de dados!');
  
  // Aqui você pode executar consultas ou operações no banco de dados

  // Exemplo: Executando uma consulta
  connection.query('SELECT * FROM tabela', (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error.stack);
      return;
    }

    console.log('Resultados da consulta:', results);
  });

  // Fechar a conexão quando terminar de usar o banco de dados
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados: ' + err.stack);
      return;
    }

    console.log('Conexão fechada com o banco de dados.');
  });
});