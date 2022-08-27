const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

module.exports = client;