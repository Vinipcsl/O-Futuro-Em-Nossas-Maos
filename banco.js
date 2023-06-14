const {Pool} = require('pg');

const poll = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Doador',
    password: '123',
    port:5432,
});

module.exports = poll;