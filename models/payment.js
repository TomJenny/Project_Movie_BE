"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.hasMany(models.Ticket, {
        foreignKey: "paymentId",
      });
    }
  }
  Payment.init(
    {
      paymentCode: DataTypes.STRING,
      paymentName: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
