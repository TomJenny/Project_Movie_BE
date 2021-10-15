const { patternGroup } = require("./group.validation");

const Joi = require("joi").extend(require("@joi/date"));

const date = Joi.date();
const string = Joi.string().trim();
const number = Joi.number();
const patternHttp = string.pattern(new RegExp("^(http|https)://")).messages({
  "string.pattern.base": "Invalid trailer url",
});

const movieSchemas = {
  movie: Joi.object()
    .keys({
      movieCode: number.required(),
      movieName: string.required(),
      movieAlias: string.replace(" ", "-").required(),
      trailer: patternHttp.required(),
      description: string.required(),
      groupCode: patternGroup.required(),
      openingDay: date.required(),
      duration: number.required(),
      rate: number.min(1).max(10).required(),
    })
    .options({ stripUnknown: true }),
  movieCode: Joi.object({
    movieCode: string.required(),
  }),
};

module.exports = movieSchemas;
