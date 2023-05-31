const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "PostgreSQL14",
    "password" : "123",
    "database" : "Doador",
    "host" : "localhost",
    "port" : 5432

});

exports.pool = pool;