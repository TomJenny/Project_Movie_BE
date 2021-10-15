"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.hasMany(models.BookSeat, {
        foreignKey: "ticketId",
      });
      this.belongsTo(models.Payment, {
        foreignKey: "paymentId",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Showtime, {
        foreignKey: "showtimeId",
      });
    }
  }
  Ticket.init(
    {
      totalPrice: DataTypes.DOUBLE,
      paymentId: DataTypes.UUID,
      userId: DataTypes.UUID,
      showtimeId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
