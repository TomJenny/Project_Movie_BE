const Joi = require("joi");
const { patternGroup } = require("./group.validation");

const string = Joi.string();
const number = Joi.number();
const userSchemas = {
  user: Joi.object().keys({
    userName: string.alphanum().required().trim(),
    password: string
      .required()
      .trim()
      .min(8)
      .pattern(
        new RegExp(
          /*
          one upper case English letter, 
          one lower case English letter, 
          one digit, 
          one special character, 
          Minimum eight in length
          */
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .messages({
        "string.pattern.base": "Invalid password",
      }),
    email: string.required().email(),
    phoneNumber: number.required().min(10),
    fullName: string.required(),
    roleCode: string.alphanum().required().trim(),
    groupCode: patternGroup.required(),
  }),
  userPaging: {
    page: number.required(),
    limit: number.required(),
  },
};

module.exports = userSchemas;
