"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cineplex, {
        foreignKey: "cineplexId",
      });
      Cinema.hasMany(models.Theater, {
        foreignKey: "cinemaId",
        as: "theaters",
      });
      Cinema.hasMany(models.Showtime, {
        foreignKey: "cinemaId",
      });
      Cinema.belongsToMany(models.Movie, {
        through: models.CinemaMovie,
        foreignKey: "cinemaId",
        otherKey: "movieId",
        as: "movies",
      });

      Cinema.addScope("getMovie", {
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });
    }
  }

  Cinema.init(
    {
      cinemaCode: DataTypes.STRING,
      cinemaName: DataTypes.STRING,
      address: DataTypes.STRING,
      cineplexId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
