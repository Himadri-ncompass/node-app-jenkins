//add env
const dotenv = require("dotenv").config();
//added mysql
const mysql = require("mysql2");
// create the connection to database
const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
});
const promisePool = pool.promise();

module.exports = { promisePool };
