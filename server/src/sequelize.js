const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecomerce', 'root', 'admin1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;