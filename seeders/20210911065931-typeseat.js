"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("TypeSeats", [
      {
        typeseatCode: "vip",
        typeseatName: "vip seat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeseatCode: "regular",
        typeseatName: "regular seat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TypeSeats", null, {});
  },
};
