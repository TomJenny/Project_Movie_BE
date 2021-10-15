const Joi = require("joi").extend(require("@joi/date"));

const date = Joi.date().format("DD/MM/YYYY");

const dateSchemas = {
  dateMovie: Joi.object()
    .keys({
      fromDate: date,
      toDate: date.greater(Joi.ref("fromDate")),
    })
    .options({ stripUnknown: true }),
};

module.exports = dateSchemas;
