"use strict";
const { Group } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const group = await Group.findOne({
      where: {
        groupCode: "gp01",
      },
    });
    await queryInterface.bulkInsert("Cineplexes", [
      {
        cineplexCode: "BHDStar",
        cineplexName: "BHD Star Cineplex",
        cineplexAlias: "bhd-star-cineplex",
        cineplexLogo:
          "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cineplexCode: "CGV",
        cineplexName: "cgv",
        cineplexAlias: "cgv",
        cineplexLogo: "http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cineplexCode: "CineStar",
        cineplexName: "CineStar",
        cineplexAlias: "cinestar",
        cineplexLogo: "http://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cineplexCode: "Galaxy",
        cineplexName: "Galaxy Cinema",
        cineplexAlias: "galaxy-cinema",
        cineplexLogo:
          "http://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cineplexCode: "LotteCinima",
        cineplexName: "Lotte Cinema",
        cineplexAlias: "lotte-cinema",
        cineplexLogo:
          "http://movie0706.cybersoft.edu.vn/hinhanh/lotte-cinema.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cineplexCode: "MegaGS",
        cineplexName: "MegaGS",
        cineplexAlias: "megags",
        cineplexLogo: "http://movie0706.cybersoft.edu.vn/hinhanh/megags.png",
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cineplexes", null, {});
  },
};
