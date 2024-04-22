const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "gustaf",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "final-be",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};