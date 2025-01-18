const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Blog = sequelize.define("all_blogs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,  
    allowNull: false,  
  },
});

module.exports = Blog;
