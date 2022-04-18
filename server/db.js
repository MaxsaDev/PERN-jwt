//https://node-postgres.com/api/pool
const Pool = require('pg').Pool

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT_MILLIS,
})

module.exports = pool