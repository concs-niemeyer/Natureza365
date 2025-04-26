module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "locals",
      [
        {
          name: "Trilha da Lagoinha do Leste",
          address: "Lagoinha do Leste - Florianópolis",
          cep: "",
          numero:"",
          userId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
        {
          name: "Trilha Pedra do Teleǵrafo",
          address: "Pedra do Telégrafo - Rio de Janeiro",
          cep:"",
          numero:"",
          userId: "1",
          createdAt: "2024-05-13",
          updatedAt: "2024-05-13",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("locals", null, {}),
};