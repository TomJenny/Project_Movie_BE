const Joi = require("joi");

const number = Joi.number();

const pageSchemas = {
  paging: Joi.object()
    .keys({
      page: number,
      size: number,
    })
    .options({ stripUnknown: true }),
};

module.exports = pageSchemas;
