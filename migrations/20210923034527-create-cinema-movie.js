"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CinemaMovies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      cinemaId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Cinemas",
          key: "id",
        },
      },
      movieId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Movies",
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
    await queryInterface.dropTable("CinemaMovies");
  },
};
