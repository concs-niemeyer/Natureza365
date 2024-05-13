const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const { hash } = require("bcryptjs");

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.ENUM,
        values: ['feminino', 'masculino', 'outros']
    },
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            len: [11]
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    }
})
// hooks 
Usuario.beforeSave(async (usuario) => {
    usuario.senha = await hash(usuario.senha, 8)
    return usuario
})

module.exports = Usuario