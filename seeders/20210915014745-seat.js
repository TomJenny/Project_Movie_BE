"use strict";
const { Theater, TypeSeat } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const typeSeatVip = await TypeSeat.findOne({
      where: {
        typeseatCode: "vip",
      },
    });
    const typeSeatRegular = await TypeSeat.findOne({
      where: {
        typeseatCode: "regular",
      },
    });
    const theaterCodeBHD = await Theater.findOne({
      where: {
        theaterCode: 1,
      },
    });
    const theaterCodeCGV = await Theater.findOne({
      where: {
        theaterCode: 8,
      },
    });

    await queryInterface.bulkInsert("Seats", [
      {
        seatName: "seat 1",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 2",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 3",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 4",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 5",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 6",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 7",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 8",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 9",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 10",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 11",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 12",
        theaterId: theaterCodeBHD.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 1",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 2",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 3",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 4",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 5",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 6",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatVip.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 7",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 8",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 9",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 10",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 11",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatName: "seat 12",
        theaterId: theaterCodeCGV.id,
        typeseatId: typeSeatRegular.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Seats", null, {});
  },
};
