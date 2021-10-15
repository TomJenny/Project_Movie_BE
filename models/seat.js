"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Theater, {
        foreignKey: "theaterId",
      });
      this.belongsTo(models.TypeSeat, {
        foreignKey: "typeseatId",
      });
      Seat.hasMany(models.BookSeat, {
        foreignKey: "seatId",
      });
    }
  }
  Seat.init(
    {
      seatName: DataTypes.STRING,
      theaterId: DataTypes.UUID,
      typeseatId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
