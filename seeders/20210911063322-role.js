"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Roles", [
      {
        roleCode: "admin",
        roleName: "administrator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleCode: "user",
        roleName: "customers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
