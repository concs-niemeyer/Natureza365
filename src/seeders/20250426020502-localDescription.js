module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("descriptions", [
      {
        id: "1",
        userId: "1",
        localId: "1",
        dataVisita: "2024-02-10",
        descFauna: "Avistados golfinhos e tartarugas.",
        descFlora: "Vegetação nativa preservada.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        userId: "2",
        localId: "2",
        dataVisita: "2024-03-15",
        descFauna: "Diversidade de aves urbanas.",
        descFlora: "Área verde ampla e bem cuidada.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        userId: "3",
        localId: "3",
        dataVisita: "2024-04-05",
        descFauna: "Tatus, veados e diversas aves.",
        descFlora: "Vegetação típica do cerrado.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("descriptions", null, {}),
};
