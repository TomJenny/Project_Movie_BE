"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Theaters", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      theaterCode: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      theaterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cinemaId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Cinemas",
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
    await queryInterface.dropTable("Theaters");
  },
};
