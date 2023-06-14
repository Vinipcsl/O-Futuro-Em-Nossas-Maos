const {Pool} = require('pg');

const poll = new Pool({
    user:'postgres',
    password: '123',
    host:'localhost',
    database:'postgress',
    port:5432,
});

module.exports = poll;