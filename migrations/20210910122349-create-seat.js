"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(`(UUID())`),
      },
      seatCode: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      seatName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      theaterId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Theaters",
          key: "id",
        },
      },
      typeseatId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "TypeSeats",
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
    await queryInterface.dropTable("Seats");
  },
};
