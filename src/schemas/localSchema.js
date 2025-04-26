const yup = require("yup");

// Atributos necessários da tabela LOCAIS DE PERSERVAÇÃO
const localSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),	//CEP, complemento... não sei se é a melhor forma.
  userId: yup.number().integer(),
  cep: yup.string(),
  numero: yup.string(),
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
