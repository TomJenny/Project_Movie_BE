"use strict";
const { Cinema } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cinemaBHD = await Cinema.findOne({
      where: {
        cinemaCode: "bhd-star-cineplex-3-2",
      },
    });
    const cinemaCGV = await Cinema.findOne({
      where: {
        cinemaCode: "cgv-aeon-binh-tan",
      },
    });

    await queryInterface.bulkInsert("Theaters", [
      {
        theaterName: "theater 1",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 2",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 3",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 4",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 5",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 6",
        cinemaId: cinemaBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 7",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 8",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 9",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 10",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 11",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theaterName: "theater 12",
        cinemaId: cinemaCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Theaters", null, {});
  },
};
