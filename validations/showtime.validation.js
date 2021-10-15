const Joi = require("joi").extend(require("@joi/date"));

const string = Joi.number();
const date = Joi.date().format("DD/MM/YYYY HH:mm");
const number = Joi.number();

const showtimeSchemas = {
  showtimes: Joi.object().keys({
    startTime: date.required(),
    theaterCode: number.required(),
    movieCode: string.required(),
    price: number.required(),
  }),
};

module.exports = showtimeSchemas;
