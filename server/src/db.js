const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin1234',
  database: 'ecomerce'
});

module.exports = connection;
