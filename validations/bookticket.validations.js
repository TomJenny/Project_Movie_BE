const Joi = require("joi");

const string = Joi.string();
const number = Joi.number();

const bookTicketSchemas = {
  bookTicket: Joi.object().keys({
    showtimeCode: number.required(),
    seatList: Joi.array().items(number.required()).required(),
    paymentMethod: string.required(),
    totalPrice: number.required(),
  }),
};

module.exports = bookTicketSchemas;
