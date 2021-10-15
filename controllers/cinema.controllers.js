const { Cinema, Theater } = require("../models");

const getCinemaList = (cineplexId) => {
  return Cinema.findAll({
    where: { cineplexId },
    attributes: {
      exclude: ["id", "cineplexId"],
    },
    include: {
      model: Theater,
      attributes: {
        include: ["theaterCode"],
        exclude: ["id", "cinemaId", "createdAt", "updatedAt"],
      },
      as: "theaters",
      right: true,
    },
  });
};
module.exports = {
  getCinemaList,
};
