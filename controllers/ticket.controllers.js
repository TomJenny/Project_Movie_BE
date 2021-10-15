const { Ticket } = require("../models");

const getTicketList = () => {
  return Ticket.findAll();
};

const getTicketByTicketCode = (ticketCode, createTicketTrans) => {
  let options = {
    where: {
      ticketCode,
    },
  };
  if (createTicketTrans) {
    options = { ...options, transaction: createTicketTrans };
  }
  return Ticket.findOne(options);
};

const createTicket = (ticket, createTicketTrans) => {
  return Ticket.create(ticket, { transaction: createTicketTrans });
};

module.exports = {
  getTicketList,
  getTicketByTicketCode,
  createTicket,
};
