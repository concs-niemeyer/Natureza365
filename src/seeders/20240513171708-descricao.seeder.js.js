
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('descricoes', 
	  [
		{
			usuarioId: "1",
      local_id:"1",
      data_visita:"2024-04-20",
      desc_fauna: 'não tem cachorro do mato',
			desc_flora: "tem flores silvestres",
			createdAt: '2024-05-13',
			updatedAt: '2024-05-13'
		},
    {
			usuarioId: "1",
      local_id:"2",
      data_visita:"2024-04-20",
      desc_fauna: 'não tem cachorro do mato',
			desc_flora: 'tem flores silvestres',
			createdAt: '2024-05-13',
			updatedAt: '2024-05-13'
		}
	], {}),

	down: (queryInterface) => queryInterface.bulkDelete('descricoes', null, {}),
}