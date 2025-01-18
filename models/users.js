const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, 
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("viewer", "editor", "admin"), 
    allowNull: false,
  },
});

module.exports = User;
