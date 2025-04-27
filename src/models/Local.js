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
      // This is a reference to another model
      model: User,
      // This is the column name of the referenced model
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
    defaultValue: Date.now(),
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});
User.hasMany(Local, {
  foreignKey: "userId",
});
Local.belongsTo(User);

module.exports = Local;
