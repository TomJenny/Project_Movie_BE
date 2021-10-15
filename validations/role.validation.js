const Joi = require("joi");

const string = Joi.string();

const roleSchemas = {
  authorRoleAdmin: Joi.object()
    .keys({
      roleCode: string.required().valid("admin").messages({
        "any.only": "FORBIDDEN",
      }),
    })
    .options({ stripUnknown: true }),
};

module.exports = roleSchemas;
