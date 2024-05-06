'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: ['Feminino', 'Masculino', 'Outros']
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_nascimento:{
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('usuarios');
  }
};
