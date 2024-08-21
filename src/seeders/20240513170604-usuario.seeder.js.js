module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nome: "João Planta",
          sexo: "outros",
          cpf: "12345678901",
          email: "teste123@gmail.com",
          senha: "teste123",
          data_nascimento: "1985-04-20",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("usuarios", null, {}),
};
