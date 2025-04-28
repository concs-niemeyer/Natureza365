module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("locals", [
      {
        id: "1",
        name: "Praia do Rosa",
        address: "Imbituba, SC",
        cep: "88780-000",
        numero: "00",
        userId: "1",
        lat: "-28.12345",
        lon: "-48.65432",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Parque Ibirapuera",
        address: "São Paulo, SP",
        cep: "04094-050",
        numero: "9999",
        userId: "2",
        lat: "-23.58741",
        lon: "-46.65763",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Chapada Diamantina",
        address: "Bahia, BA",
        cep: "46740-000",
        numero: "42",
        userId: "3",
        lat: "-12.46916",
        lon: "-41.41977",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete("locals", null, {}),
};
