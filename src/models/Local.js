const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const User = require("./User");

const Local = connection.define("locals", {
  name: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  cep: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  userId: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  lat: {
    type: DataTypes.STRING,
  },
  lon: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

User.hasMany(Local, {
  foreignKey: 'userId', 
});

Local.belongsTo(User, {
  foreignKey: 'userId', 
});

module.exports = Local;
