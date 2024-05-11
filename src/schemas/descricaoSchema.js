const yup  = require('yup')

const descricaoSchema = yup.object().shape({
 	usuarioId: yup.number().integer().required(),
 	local_id: yup.number().integer().required(),
 	data_visita: yup.date().default(() => new Date()),
 	desc_fauna: yup.string().nullable(),
 	desc_flora: yup.string().nullable(),
});

module.exports = descricaoSchema