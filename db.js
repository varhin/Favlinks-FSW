const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'linksAPI',
    password: 'pass',
    port: 5432
})

module.exports = pool
