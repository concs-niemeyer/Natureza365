'use strict';

const bcrypt = require('bcrypt'); // Importando a biblioteca bcrypt

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Maria Santa',
                sexo: 'feminino',
                cpf: '22222222222',
                email: 'santa@gmail.com',
                password: await bcrypt.hash('123', 10), 
                dataNascimento: new Date('1990-12-25'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'João Silva',
                sexo: 'masculino',
                cpf: '33333333333',
                email: 'joao@gmail.com',
                password: await bcrypt.hash('123', 10),
                dataNascimento: new Date('1985-06-15'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Ana Oliveira',
                sexo: 'feminino',
                cpf: '44444444444',
                email: 'ana@gmail.com',
                password: await bcrypt.hash('123', 10),
                dataNascimento: new Date('1992-03-10'),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
