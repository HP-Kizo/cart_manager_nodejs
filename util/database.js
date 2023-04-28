const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "96623269yh", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
