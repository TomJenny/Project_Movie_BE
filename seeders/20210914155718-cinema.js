"use strict";

const { Cineplex } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cineplexBHD = await Cineplex.findOne({
      where: {
        cineplexCode: "BHDStar",
      },
    });
    const cineplexCGV = await Cineplex.findOne({
      where: {
        cineplexCode: "CGV",
      },
    });

    await queryInterface.bulkInsert("Cinemas", [
      {
        cinemaCode: "bhd-star-cineplex-3-2",
        cinemaName: "BHD Star Cineplex - 3/2",
        address: "L5-Vincom 3/2, 3C Đường 3/2, Q.10",
        cineplexId: cineplexBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cinemaCode: "bhd-star-cineplex-bitexco",
        cinemaName: "BHD Star Cineplex - Bitexco",
        address: "L3-Bitexco Icon 68, 2 Hải Triều, Q.1",
        cineplexId: cineplexBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cinemaCode: "bhd-star-cineplex-pham-hung",
        cinemaName: "BHD Star Cineplex - Phạm Hùng",
        address: "L4-Satra Phạm Hùng, C6/27 Phạm Hùng, Bình Chánh",
        cineplexId: cineplexBHD.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cinemaCode: "cgv-aeon-binh-tan",
        cinemaName: "CGV - Aeon Bình Tân",
        address:
          "Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân",
        cineplexId: cineplexCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cinemaCode: "cgv-aeon-tan-phu",
        cinemaName: "CGV - Aeon Tân Phú",
        address: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
        cineplexId: cineplexCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cinemaCode: "cgv-cgv-saigonres-nguyen-xi",
        cinemaName: "CGV - CGV Saigonres Nguyễn Xí",
        address:
          "Tầng 4-5, Saigonres Plaza, 79/81 Nguyễn Xí, P. 26, Bình Thạnh",
        cineplexId: cineplexCGV.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cinemas", null, {});
  },
};
