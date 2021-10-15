const Joi = require("joi");

const string = Joi.string();

const cineplexSchemas = {
  cinplexCode: Joi.object().keys({
    userName: string.trim(),
  }),
  cinema: Joi.object().keys({
    cineplexCode: string.trim().required(),
  }),
};

module.exports = cineplexSchemas;
