const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'linksAPI',
    password: '',
    port: 5432
})

module.exports = pool
