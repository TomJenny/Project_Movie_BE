"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      this.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      User.hasMany(models.Ticket, {
        foreignKey: "userId",
      });
      User.addScope("queryUser", {
        attributes: {
          include: [
            [sequelize.col("Role.roleCode"), "roleCode"],
            [sequelize.col("Group.groupCode"), "groupCode"],
          ],
          exclude: ["roleId", "groupId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: models.Role,
            attributes: [],
          },
          {
            model: models.Group,
            attributes: [],
          },
        ],
        raw: true,
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      roleId: DataTypes.UUID,
      groupId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
