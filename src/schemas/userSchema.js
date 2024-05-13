const yup = require('yup')


const usuarioSchema = yup.object().shape({
 	nome: yup.string().required(),
 	cpf: yup.string().length(11).required(),
 	email: yup.string().email(),
 	sexo: yup.string().nullable(),
 	senha: yup.string().required(),
 	data_nascimento: yup.date().notRequired()
});



module.exports = usuarioSchema