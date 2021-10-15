const {
  Showtime,
  Cineplex,
  Theater,
  Cinema,
  sequelize,
  Movie,
  Sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const getShowtimeListByShowtimeCode = (showtimeCode) => {
  return sequelize
    .query(
      `SELECT 
  showtimeCode,
  startTime,
   Movie.movieName AS movieName,
   Movie.imageUrl AS imageUrl,
   Theater.theaterName AS theaterName,
   TheaterCinemas.cinemaCode AS cinemaCode,
   TheaterCinemas.cinemaName AS cinemaName,
   TheaterCinemas.address AS address
from showtimes
       RIGHT OUTER JOIN
   Movies AS Movie ON showtimes.movieId = Movie.id
       LEFT OUTER JOIN
   Theaters AS Theater ON showtimes.theaterId = Theater.id
       LEFT OUTER JOIN
   Cinemas AS TheaterCinemas ON Theater.cinemaId = TheaterCinemas.id
   WHERE showtimes.showtimeCode = $STCode`,

      {
        bind: { STCode: showtimeCode },
        type: QueryTypes.SELECT,
        plain: true,
      }
    )
    .then(async (MovieInfo) => {
      const result = { MovieInfo: { ...MovieInfo } };

      const seatList = await sequelize.query(
        `
       SELECT
    seat.seatCode AS stt,
    bookseatCode AS seatCode,
    seat.seatName AS seatName,
    bookseats.price,
    typeseat.typeseatCode AS typeseat,
    status,
    user.userName as userName
FROM
    bookseats
        LEFT OUTER JOIN
    showtimes AS showtime ON bookseats.showtimeId = showtime.id
        LEFT OUTER JOIN
    seats AS seat ON bookseats.seatId = seat.id
        LEFT OUTER JOIN
    typeseats AS typeseat ON seat.typeseatId = typeseat.id
        LEFT OUTER JOIN
    tickets AS ticket ON bookseats.ticketId = ticket.id
        LEFT OUTER JOIN
    users AS user ON ticket.userId = user.id
WHERE showtime.showtimeCode = $STCode
       `,
        {
          bind: { STCode: showtimeCode },
          type: QueryTypes.SELECT,
        }
      );

      result.seatList = seatList;
      return result;
    });
};

const getShowtimeByTimeAndMovie = (
  movieId,
  theaterId,
  startTime,
  createShowtime
) => {
  let options = {};
  options = {
    ...options,
    attributes: {
      include: ["id"],
    },
    where: { movieId, theaterId, startTime },
  };
  if (createShowtime) {
    options = { ...options, transaction: createShowtime };
  }

  return Showtime.findOne(options);
};

const getShowtimeByShowtimeId = (showtimeId) => {
  return Showtime.findOne({
    where: { id: showtimeId },
    attributes: {
      exclude: ["movieId", "createdAt", "updatedAt"],
    },
  });
};

const getShowtimeByShowtimeCode = (showtimeCode) => {
  return Showtime.findOne({
    where: { showtimeCode },
    attributes: {
      exclude: ["movieId", "createdAt", "updatedAt"],
    },
  });
};

const createShowtime = (newShowtime, createShowtime) => {
  return Showtime.create(newShowtime, { transaction: createShowtime });
};

const getShowtimeByCineplex = (cineplexCode) => {
  let options = {};
  if (cineplexCode) {
    options = {
      ...options,
      where: {
        cineplexCode,
      },
    };
  }
  options = {
    ...options,
    attributes: {
      exclude: ["id"],
    },
    include: [
      {
        model: Cinema,
        attributes: {
          exclude: ["id", "cineplexId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Movie,
            as: "movies",
            through: { attributes: [] },
            right: true,
            attributes: {
              include: ["movieCode", "movieName", "imageUrl"],
              exclude: [
                "id",
                "trailer",
                "description",
                "openingDay",
                "rate",
                "groupId",
                "createdAt",
                "updatedAt",
                "movieAlias",
              ],
            },
            include: [
              {
                model: Showtime,
                on: {
                  movieId: sequelize.where(
                    sequelize.col("`Cinemas->movies`.`id`"),
                    "=",
                    sequelize.col("`Cinemas->movies->Showtimes`.`movieId`")
                  ),
                  cinemaId: sequelize.where(
                    sequelize.col("`Cinemas->movies->CinemaMovie`.`cinemaId`"),
                    "=",
                    sequelize.col("`Cinemas->movies->Showtimes`.`cinemaId`")
                  ),
                },
                attributes: {
                  include: [
                    "showtimeCode",
                    "startTime",
                    "price",
                    [
                      sequelize.literal(
                        "`Cinemas->movies->Showtimes->Theater`.`theaterName`"
                      ),
                      "theaterName",
                    ],
                    [
                      sequelize.literal(
                        "`Cinemas->movies->Showtimes->Theater`.`theaterCode`"
                      ),
                      "theaterCode",
                    ],
                  ],
                  exclude: [
                    "id",
                    "movieId",
                    "theaterId",
                    "cinemaId",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                include: [
                  {
                    model: Theater,
                    attributes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return Cineplex.findAll(options);
};

const getShowtimeByFilm = (movieCode, id) => {
  return Movie.scope("queryMovie")
    .findOne({
      where: {
        movieCode,
      },
    })
    .then(async (movie) => {
      const result = { ...movie };
      const options = {
        attributes: {
          exclude: ["id"],
        },
        include: [
          {
            model: Cinema,
            right: true,
            attributes: {
              exclude: ["id", "cineplexId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: Showtime,
                right: true,
                attributes: {
                  include: [
                    [
                      sequelize.literal(
                        "`Cinemas->Showtimes->Theater`.`theaterCode`"
                      ),
                      "theaterCode",
                    ],
                    [
                      sequelize.literal(
                        "`Cinemas->Showtimes->Theater`.`theaterName`"
                      ),
                      "theaterName",
                    ],
                  ],
                  exclude: [
                    "id",
                    "theaterId",
                    "movieId",
                    "cinemaId",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                include: [
                  {
                    model: Theater,
                    attributes: [],
                  },
                ],
              },
            ],
          },
        ],
      };

      const showtime = await Cineplex.findAll(options);

      result.Cineplex = showtime;
      return result;
    });
};

module.exports = {
  getShowtimeListByShowtimeCode,
  getShowtimeByShowtimeId,
  getShowtimeByShowtimeCode,
  createShowtime,
  getShowtimeByTimeAndMovie,
  getShowtimeByCineplex,
  getShowtimeByFilm,
};
