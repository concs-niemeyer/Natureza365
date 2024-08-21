const yup = require('yup')

const localSchema = yup.object().shape({
 	nome: yup.string().required(),
 	local_endereco: yup.string().required(),
 	usuarioId: yup.number().integer()
});

module.exports = localSchema