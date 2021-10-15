const { CinemaMovie } = require("../models");

const createCinemaMovie = (cinemaMovie, createShowtime) => {
  return CinemaMovie.create(cinemaMovie, { transaction: createShowtime });
};
module.exports = {
  createCinemaMovie,
};
