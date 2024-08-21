module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "locais",
      [
        {
          nome: "Trilha da Lagoinha do Leste",
          local_endereco: "Lagoinha do Leste - Florianópolis",
          usuarioId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
        {
          nome: "Trilha Pedra do Teleǵrafo",
          local_endereco: "Pedra do Telégrafo - Rio de Janeiro",
          usuarioId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("locais", null, {}),
};
