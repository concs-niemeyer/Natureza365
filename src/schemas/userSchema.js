const yup = require("yup");

//Atributos necessários na tabela de USUÁRIOS
const userSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string().length(11).required(),
  email: yup.string().email().required(),
  sexo: yup.string().nullable(),
  password: yup.string().required(),
  dataNascimento: yup.date().required(),
});

module.exports = userSchema;
