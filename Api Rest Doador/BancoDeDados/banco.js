const {Pool} = require('pg');

const poll = new Pool({
    user:'PostgreSQL14',
    password: '123',
    host:'localhost',
    database:'Doador',
    port:5432,
});

module.exports = poll;