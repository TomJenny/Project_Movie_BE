"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeSeat.hasMany(models.Seat, {
        foreignKey: "typeseatId",
      });
    }
  }
  TypeSeat.init(
    {
      typeseatCode: DataTypes.STRING,
      typeseatName: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "TypeSeat",
    }
  );
  return TypeSeat;
};
