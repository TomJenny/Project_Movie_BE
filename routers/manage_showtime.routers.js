const express = require("express");
const manageShowtimeRouters = express.Router();

const { RESPONSE_CODE } = require("../constants");

const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const showtimeCtr = require("../controllers/showtime.controllers");
const theaterCtr = require("../controllers/theater.controllers");
const movieCtr = require("../controllers/movie.controllers");
const BookSeatCtr = require("../controllers/bookseat.controllers");
const SeatCtr = require("../controllers/seat.controllers");
const CinemaMovieCtr = require("../controllers/cinemamovie.controllers");

const roleSchemas = require("../validations/role.validation");
const showtimeSchemas = require("../validations/showtime.validation");
const movieSchemas = require("../validations/movie.validation");
const moment = require("moment");
const { sequelize } = require("../models");

manageShowtimeRouters.get(
  "/",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const { showtimeCode } = req.query;
      const showtimeList = await showtimeCtr.getShowtimeListByShowtimeCode(
        showtimeCode
      );
      res.send(showtimeList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageShowtimeRouters.post(
  "/create",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(showtimeSchemas.showtimes, "body"),
  async (req, res) => {
    //create a transaction
    const createShowtime = await sequelize.transaction();

    try {
      const { startTime, theaterCode, movieCode, price } = req.body;

      // get movie id
      let movie = await movieCtr.getMovieByMovieCode(movieCode);

      if (!movie) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`movie does not exist`);
      }

      const startTimeFormat = moment
        .utc(startTime, "DD/MM/YYYY HH:mm:ss")
        .format("YYYY-MM-DD HH:mm:ss");

      // get theater id and cinema id and cineplex id
      let theater = await theaterCtr.getCinemaAndCineplexByTheaterCode(
        theaterCode
      );
      if (!theater) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`theater does not exist`);
      }

      const doesShowtimeExist = await showtimeCtr.getShowtimeByTimeAndMovie(
        movie.id,
        theater.id,
        startTimeFormat
      );

      if (doesShowtimeExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`showtime does exist`);
      }

      const showtime = {
        startTime: startTimeFormat,
        theaterId: theater.id,
        movieId: movie.id,
        cinemaId: theater["Cinema.id"],
        price,
      };

      const cinemaMovie = {
        movieId: movie.id,
        cinemaId: theater["Cinema.id"],
      };

      //create showtime
      const newShowtime = await showtimeCtr.createShowtime(
        showtime,
        createShowtime
      );

      //get showtime by showtimeCode
      const newShowtimeById = await showtimeCtr.getShowtimeByTimeAndMovie(
        newShowtime.dataValues.movieId,
        newShowtime.dataValues.theaterId,
        newShowtime.dataValues.startTime,
        createShowtime
      );

      //get seat by theater
      const seat = await SeatCtr.getSeatListByTheaterCode(theaterCode);

      // auto create seat for booking
      await BookSeatCtr.createBookSeatByShowtime(
        newShowtimeById,
        seat,
        createShowtime
      );

      // create item for table CinemaMovie
      await CinemaMovieCtr.createCinemaMovie(cinemaMovie, createShowtime);

      await createShowtime.commit();
      res.send("Showtime successfully added").status(200);
    } catch (error) {
      await createShowtime.rollback();
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageShowtimeRouters.get(
  "/getshowtimebycineplex",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const { cinplexCode, groupCode } = req.query;

      const showtimeList = await showtimeCtr.getShowtimeByCineplex(
        cinplexCode,
        groupCode
      );
      res.send(showtimeList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageShowtimeRouters.get(
  "/getshowtimebyFilm",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(movieSchemas.movieCode, "query"),
  async (req, res) => {
    try {
      const { movieCode } = req.query;
      //check movie exist
      let doesMovieExits = await movieCtr.getMovieByMovieCode(movieCode);

      if (!doesMovieExits) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`movie code does not exist`);
      }

      const showtimeList = await showtimeCtr.getShowtimeByFilm(
        movieCode,
        doesMovieExits.id
      );

      res.send(showtimeList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);
module.exports = {
  manageShowtimeRouters,
};
