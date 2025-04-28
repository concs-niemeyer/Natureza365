const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");

const User = connection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.ENUM,
        values: ['masculino', 'feminino', 'outros']
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    cpf: {
        type: DataTypes.STRING
    },
    dataNascimento: {
        type: DataTypes.DATE
    }
}, { 

    timestamps: true 
});

module.exports = User;
