"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      ticketCode: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Payments",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
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
    await queryInterface.dropTable("Tickets");
  },
};
