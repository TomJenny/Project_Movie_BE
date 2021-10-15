const express = require("express");

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const bookTicketSchemas = require("../validations/bookticket.validations");
const showtimeCtr = require("../controllers/showtime.controllers");
const paymentCtr = require("../controllers/payment.controllers");
const userCtr = require("../controllers/user.controllers");
const ticketCtr = require("../controllers/ticket.controllers");
const bookSeatCtr = require("../controllers/bookseat.controllers");
const { sequelize } = require("../models");

const bookTicketRouters = express.Router();

bookTicketRouters.post(
  "/create",
  authenticateToken,
  validationMiddleware(bookTicketSchemas.bookTicket, "body"),
  async (req, res) => {
    //create a transaction
    const createTicketTrans = await sequelize.transaction();
    try {
      const { showtimeCode, seatList, paymentMethod, totalPrice } = req.body;
      const { userName } = req.user;

      //check showtime does exits
      const doesShowtimeExist = await showtimeCtr.getShowtimeByShowtimeCode(
        showtimeCode
      );
      if (!doesShowtimeExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("showtime does not exist");
      }

      //check seat is exist
      const doesSeatExist = await bookSeatCtr.getSeatBookIsExistOrBooked(
        doesShowtimeExist.id,
        seatList
      );
      if (doesSeatExist.length < seatList.length) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("seats in seat list don't exist");
      }

      // check seat is booked
      const doesSeatBooked = await bookSeatCtr.getSeatBookIsExistOrBooked(
        doesShowtimeExist.id,
        seatList,
        true
      );

      if (doesSeatBooked.length > 0) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("seats in seat list are booked");
      }

      //check payment method
      const doesPaymentExist = await paymentCtr.getPaymentByPaymentCode(
        paymentMethod
      );

      if (!doesPaymentExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("showtime does not exist");
      }

      //get user id
      const user = await userCtr.getUserByUserName(userName);

      const ticket = {
        showtimeId: doesShowtimeExist.id,
        paymentId: doesPaymentExist.id,
        totalPrice,
        userId: user.id,
      };

      const newTicket = await ticketCtr.createTicket(ticket, createTicketTrans);

      const newTicketWithId = await ticketCtr.getTicketByTicketCode(
        newTicket.id,
        createTicketTrans
      );

      const arrSeat = {
        status: true,
        ticketId: newTicketWithId.id,
      };

      await bookSeatCtr.updateBookSeatByTicket(
        arrSeat,
        doesShowtimeExist.id,
        seatList,
        createTicketTrans
      );

      await createTicketTrans.commit();

      res.send("book Ticket successFully").status(200);
    } catch (error) {
      await createTicketTrans.rollback();

      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = { bookTicketRouters };
