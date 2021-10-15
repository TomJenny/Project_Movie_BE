"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      Movie.hasMany(models.Showtime, {
        foreignKey: "movieId",
      });

      Movie.belongsToMany(models.Cinema, {
        through: models.CinemaMovie,
        foreignKey: "movieId",
        otherKey: "cinemaId",
        as: "cinemas",
      });

      Movie.addScope("queryMovie", {
        attributes: {
          include: [[sequelize.col("Group.groupCode"), "groupCode"]],
          exclude: ["groupId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: models.Group,
            attributes: [],
          },
        ],
        raw: true,
      });
      Movie.addScope("queryShowtime", {
        attributes: {
          include: ["movieCode", "movieName", "imageUrl"],
          exclude: [
            "id",
            "trailer",
            "description",
            "openingDay",
            "rate",
            "groupCode",
            "createdAt",
            "updatedAt",
            "movieAlias",
          ],
        },
      });
    }
  }
  Movie.init(
    {
      movieCode: DataTypes.INTEGER,
      movieName: DataTypes.STRING,
      movieAlias: DataTypes.STRING,
      trailer: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      openingDay: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      groupId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
