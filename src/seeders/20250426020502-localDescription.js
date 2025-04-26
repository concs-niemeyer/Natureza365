module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
     "descriptions", [
    {
      "id": "1",
      "userId": "1",
      "local_id": "l",
      "data_visita": "2024-02-10",
      "desc_fauna": "Avistados golfinhos e tartarugas.",
      "desc_flora": "Vegetação nativa preservada."
    },
    {
      "id": "2",
      "userId": "2",
      "local_id": "2",
      "data_visita": "2024-03-15",
      "desc_fauna": "Diversidade de aves urbanas.",
      "desc_flora": "Área verde ampla e bem cuidada."
    },
    {
      "id": "3",
      "userId": "3",
      "local_id": "3",
      "data_visita": "2024-04-05",
      "desc_fauna": "Tatus, veados e diversas aves.",
      "desc_flora": "Vegetação típica do cerrado."
    },
    {
      "id": "4",
      "userId": "1",
      "local_id": "4",
      "data_visita": "2024-05-01",
      "desc_fauna": "Macacos e quatis visíveis.",
      "desc_flora": "Floresta densa e úmida."
    },
    {
      "id": "5",
      "userId": "2",
      "local_id": "5",
      "data_visita": "2024-06-10",
      "desc_fauna": "Animais típicos do cerrado observados.",
      "desc_flora": "Cerrado preservado e trilhas naturais."
    },
    {
      "id": "6",
      "userId": "1",
      "local_id": "2",
      "data_visita": "2024-07-20",
      "desc_fauna": "Sabiás e maritacas no final da tarde.",
      "desc_flora": "Árvores frutíferas e vegetação diversificada."
    },
    {
      "id": "7",
      "userId": "3",
      "local_id": "1",
      "data_visita": "2024-08-18",
      "desc_fauna": "Golfinhos avistados na enseada.",
      "desc_flora": "Muitas bromélias e orquídeas nativas."
    }]
    ),

  down: (queryInterface) => queryInterface.bulkDelete("descriptions", null, {}),
};