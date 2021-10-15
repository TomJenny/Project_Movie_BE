const { Theater, Seat, TypeSeat } = require("../models");

const getSeatListByTheaterCode = (theaterCode) => {
  return Theater.findAll({
    where: { theaterCode },
    include: {
      model: Seat,
      include: {
        model: TypeSeat,
      },
    },
    raw: true,
  });
};

module.exports = {
  getSeatListByTheaterCode,
};
