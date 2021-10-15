"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cineplex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cineplex.hasMany(models.Cinema, {
        foreignKey: "cineplexId",
      });
    }
  }
  Cineplex.init(
    {
      cineplexCode: DataTypes.STRING,
      cineplexName: DataTypes.STRING,
      cineplexAlias: DataTypes.STRING,
      cineplexLogo: DataTypes.STRING,
      groupId: DataTypes.UUID,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Cineplex",
    }
  );
  return Cineplex;
};
