const { Op } = require("sequelize");
const { BookSeat, Sequelize } = require("../models");

const getSeatBookIsExistOrBooked = (showtimeId, seatList, Booked) => {
  let where = {
    showtimeId,
    bookseatCode: {
      [Op.in]: seatList,
    },
  };

  if (Booked) {
    where = {
      ...where,
      status: true,
    };
  }

  return BookSeat.findAll({ where });
};

const createBookSeatByShowtime = (showtime, seat, createShowtime) => {
  const bookSeat = {
    id: Sequelize.literal(`(UUID())`),
    status: false,
    ticketCode: null,
  };

  const arrSeat = seat.map((item, index) => {
    // if seat is VIP increase price to 20%
    let price =
      item["Seats.TypeSeat.typeseatId"] === "regular"
        ? showtime.price
        : (showtime.price * 120) / 100;

    return {
      ...bookSeat,
      seatId: item["Seats.id"],
      showtimeId: showtime.id,
      price: price,
    };
  });

  return BookSeat.bulkCreate(arrSeat, { transaction: createShowtime });
};

const updateBookSeatByTicket = (
  arrSeat,
  showtimeId,
  seatList,
  createTicketTrans
) => {
  return BookSeat.update(arrSeat, {
    where: {
      showtimeId,
      bookseatCode: {
        [Op.in]: seatList,
      },
    },
    transaction: createTicketTrans,
  });
};
module.exports = {
  createBookSeatByShowtime,
  updateBookSeatByTicket,
  getSeatBookIsExistOrBooked,
};
