"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Showtime.hasMany(models.BookSeat, {
        foreignKey: "showtimeId",
      });
      Showtime.hasMany(models.Ticket, {
        foreignKey: "showtimeId",
      });

      this.belongsTo(models.Theater, {
        foreignKey: "theaterId",
      });
      this.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
      });
      this.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });

      Showtime.addScope("getShowtimeByCinema", {
        attributes: {
          include: [
            "showtimeCode",
            "Showtime.Theater.theaterName",
            "startTime",
            "price",
          ],
          exclude: ["id", "movieCode", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: models.Theater,
          },
        ],
        raw: true,
      });
    }
  }
  Showtime.init(
    {
      showtimeCode: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      theaterId: DataTypes.UUID,
      movieId: DataTypes.UUID,
      cinemaId: DataTypes.UUID,
      price: DataTypes.DOUBLE,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },

      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};
