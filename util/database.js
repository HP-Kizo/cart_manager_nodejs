const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '966123269yh', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
