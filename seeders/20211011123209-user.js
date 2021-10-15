"use strict";
const { genBcrypt } = require("../helpers/bcrypt.helpers");
const { Group, Role } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const group = await Group.findOne({
      where: {
        groupCode: "gp01",
      },
    });

    const role = await Role.findOne({
      where: {
        roleCode: "admin",
      },
    });

    const hashPassword = genBcrypt("123@qweQ!");

    await queryInterface.bulkInsert("Users", [
      {
        userName: "admin",
        password: hashPassword,
        email: "admin@gmail.com",
        phoneNumber: "123324",
        fullName: "admin",
        roleId: role.id,
        groupId: group.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
