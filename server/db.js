const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'find_movies_db',
  password: '123456',
  port: 5432,
});

module.exports = pool;