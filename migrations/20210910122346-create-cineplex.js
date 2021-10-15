"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cineplexes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      cineplexCode: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      cineplexName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cineplexAlias: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cineplexLogo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Groups",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cineplexes");
  },
};
