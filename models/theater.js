"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
      });
      Theater.hasMany(models.Seat, {
        foreignKey: "theaterId",
      });
      Theater.hasMany(models.Showtime, {
        foreignKey: "theaterId",
      });

      Theater.addScope("getShowtimeByCinema", {
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        raw: true,
      });
      Theater.addScope("getCinemaByTheater", {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: models.Cinema,
          },
        ],
        right: true,
        raw: true,
      });
      Theater.addScope("getSeatByTheater", {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: models.Seat,
          },
        ],
        raw: true,
      });
    }
  }
  Theater.init(
    {
      theaterName: DataTypes.STRING,
      cinemaId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Theater",
    }
  );
  return Theater;
};
