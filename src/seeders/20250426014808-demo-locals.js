module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "locals",
      [
        {
          name: "Trilha da Lagoinha do Leste",
          localidade: "Lagoinha do Leste - Florianópolis",
          userId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
        {
          name: "Trilha Pedra do Teleǵrafo",
          localidade: "Pedra do Telégrafo - Rio de Janeiro",
          userId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("locals", null, {}),
};