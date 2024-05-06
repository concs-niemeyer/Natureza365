const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Usuario = require("./Usuario");
//const { hash } = require("bcryptjs");

const Local = connection.define('locais', {
    nome: {
        type: DataTypes.STRING
    },
    local_endereco: {
        type: DataTypes.STRING,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Usuario,
            // This is the column name of the referenced model
            key: 'id'
        }}
})
Usuario.hasMany(Local, {
    foreignKey: 'usuarioId'
})
Local.belongsTo(Usuario)

module.exports = Local