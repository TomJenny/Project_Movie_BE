const express = require("express");
const paypal = require("paypal-rest-sdk");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const bookTicketSchemas = require("../validations/bookticket.validations");
const showtimeCtr = require("../controllers/showtime.controllers");
const paymentCtr = require("../controllers/payment.controllers");
const userCtr = require("../controllers/user.controllers");
const bookSeatCtr = require("../controllers/bookseat.controllers");
require("dotenv").config();

const paypalRouters = express.Router();

// paypal config
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

paypalRouters.post(
  "/",
  authenticateToken,
  validationMiddleware(bookTicketSchemas.bookTicket, "body"),
  async (req, res) => {
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

      //check seat does exist
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

      //payment
      var create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3000/paypal/success",
          cancel_url: "http://localhost:3000/paypal/cancel",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: seatList,
                  sku: seatList,
                  price: totalPrice,
                  currency: "VND",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "VND",
              total: totalPrice,
            },
            description: `${userName} pay for seat ${seatList}`,
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

paypalRouters.get("/success", async (req, res) => {
  const { payerID, paymentId } = req.query;
  try {
    var execute_payment_json = {
      payer_id: payerID,
      transactions: [
        {
          amount: {
            currency: "VND",
            total: totalPrice,
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
        }
      }
    );
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = {
  paypalRouters,
};
