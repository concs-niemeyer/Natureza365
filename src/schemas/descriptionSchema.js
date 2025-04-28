const yup = require("yup");

const descriptionSchema = yup.object().shape({
  userId: yup.number().integer(),
  localId: yup.number().integer(),
  dataVisita: yup.date().default(() => new Date()),
  descFauna: yup.string().nullable(),
  descFlora: yup.string().nullable(),
});

module.exports = descriptionSchema;