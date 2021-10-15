const Joi = require("joi");

const string = Joi.string();
const patternGroup = string.pattern(/^gp(\d\d)$/).messages({
  "string.pattern.base": "Invalid Group Code",
});

const groupSchemas = {
  group: Joi.object().keys({
    groupCode: patternGroup.required(),
    groupName: string.required(),
  }),
  authorGroup: Joi.object()
    .keys({
      groupCode: patternGroup,
    })
    .options({ stripUnknown: true }),
};

module.exports = { groupSchemas, patternGroup };
