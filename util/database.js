const Sequelize = require("sequelize");

const sequelize = new Sequelize("blogs", "root", "mysql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
