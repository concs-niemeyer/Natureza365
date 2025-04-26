module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "locals", [
        {
          "id": "1",
          "name": "Praia do Rosa",
          "address": "Imbituba, SC",
          "cep": "88780-000",
          "userId": "u1",
          "lat": "-28.12345",
          "lon": "-48.65432"
        },
        {
          "id": "2",
          "name": "Parque Ibirapuera",
          "address": "São Paulo, SP",
          "cep": "04094-050",
          "userId": "u2",
          "lat": "-23.58741",
          "lon": "-46.65763"
        },
        {
          "id": "3",
          "name": "Chapada Diamantina",
          "address": "Bahia, BA",
          "cep": "46740-000",
          "userId": "3",
          "lat": "-12.46916",
          "lon": "-41.41977"
        },
        {
          "id": "4",
          "name": "Cataratas do Iguaçu",
          "address": "Foz do Iguaçu, PR",
          "cep": "85855-750",
          "userId": "1",
          "lat": "-25.69530",
          "lon": "-54.43667"
        },
        {
          "id": "5",
          "name": "Parque Nacional de Brasília",
          "address": "Brasília, DF",
          "cep": "70835-000",
          "userId": "2",
          "lat": "-15.72198",
          "lon": "-47.96535"
        }
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("locals", null, {}),
};