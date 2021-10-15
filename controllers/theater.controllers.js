const { Theater, Cinema, Cineplex } = require("../models");

const getListTheater = () => {
  return Theater.findAll();
};

const getTheaterByTheaterCode = (theaterCode) => {
  return Theater.findOne({
    where: { theaterCode },
  });
};
const getCinemaAndCineplexByTheaterCode = (theaterCode) => {
  return Theater.findOne({
    where: { theaterCode },
    include: [
      {
        model: Cinema,
        include: [{ model: Cineplex }],
      },
    ],
    raw: true,
  });
};
module.exports = {
  getTheaterByTheaterCode,
  getListTheater,
  getCinemaAndCineplexByTheaterCode,
};
