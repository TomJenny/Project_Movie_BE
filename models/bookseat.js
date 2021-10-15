"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Showtime, {
        foreignKey: "showtimeId",
      });
      this.belongsTo(models.Ticket, {
        foreignKey: "ticketId",
      });
      this.belongsTo(models.Seat, {
        foreignKey: "seatId",
      });
    }
  }
  BookSeat.init(
    {
      price: DataTypes.FLOAT,
      status: DataTypes.BOOLEAN,
      seatId: DataTypes.UUID,
      showtimeId: DataTypes.UUID,
      ticketId: DataTypes.UUID,
    },

    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "BookSeat",
    }
  );
  return BookSeat;
};
