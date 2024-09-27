const {Pool} = require('pg')
const {db} = require('./config')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

module.exports = pool;