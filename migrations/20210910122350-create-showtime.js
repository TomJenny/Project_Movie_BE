"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Showtimes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      showtimeCode: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      theaterId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Theaters",
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
      cinemaId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Cinemas",
          key: "id",
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("Showtimes");
  },
};
