const yup = require("yup");

// Atributos necessários da tabela LOCAIS DE PERSERVAÇÃO
const localSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),	//CEP, complemento... não sei se é a melhor forma.
  cep: yup.string().nullable(),
  userId: yup.number().integer(),
  lat: yup.string(),		
  lon: yup.string()
});

/*
 address: yup.object().shape({
	CEP: yup.string(),
	complemento: yup.string()
 })
 */

module.exports = localSchema;
