const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Local = require("./Local");

const Description = connection.define("descriptions", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },

  localId: {
    type: DataTypes.INTEGER,
    references: {
      model: Local,
      key: "id",
    },
  },

  dataVisita: {
    type: DataTypes.DATE,
  },

  descFauna: {
    type: DataTypes.STRING,
  },

  descFlora: {
    type: DataTypes.STRING,
  },

  createdAt: {
    type: DataTypes.DATE,
  },

  updatedAt: {
    type: DataTypes.DATE,
  },
});

// Relacionamento entre User e Description
User.hasMany(Description, {
  foreignKey: "userId",
});
Description.belongsTo(User, {
  foreignKey: "userId",
});

// Relacionamento entre Local e Description
Local.hasMany(Description, {
  foreignKey: "localId",
});
Description.belongsTo(Local, {
  foreignKey: "localId",
});

module.exports = Description;
