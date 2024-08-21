const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const Local = require("./Local");

const Descricao = connection.define("descricoes", {
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
  },

  local_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Local,
      key: "id",
    },
  },

  data_visita: {
    type: DataTypes.DATE,
  },

  desc_fauna: {
    type: DataTypes.STRING,
  },

  desc_flora: {
    type: DataTypes.STRING,
  },
});

Usuario.hasMany(Descricao, {
  foreignKey: "usuarioId",
});
Descricao.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Local.hasMany(Descricao, {
  foreignKey: "local_id",
});
Descricao.belongsTo(Local, {
  foreignKey: "local_id",
});

module.exports = Descricao;
