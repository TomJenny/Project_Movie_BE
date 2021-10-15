"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BookSeats", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      bookSeatCode: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      seatId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Seats",
          key: "id",
        },
      },
      showtimeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Showtimes",
          key: "id",
        },
      },
      ticketId: {
        type: Sequelize.UUID,
        references: {
          model: "Tickets",
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
    await queryInterface.dropTable("BookSeats");
  },
};
