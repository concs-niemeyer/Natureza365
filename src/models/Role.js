const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Role = connection.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Garante que a data de criação seja gerada corretamente
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Role;
