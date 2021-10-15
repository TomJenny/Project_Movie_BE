const { Group } = require("../models");
const { Op } = require("sequelize");

const getGroupList = () => {
  return Group.findAll({
    attributes: { exclude: ["id"] },
  });
};

const getListGroupByKeyword = (keyword) => {
  return Group.findAll({
    attributes: { exclude: ["id"] },
    where: {
      groupCode: {
        [Op.substring]: keyword,
      },
    },
    raw: true,
  });
};

const getGroupByGroupCode = (groupCode) => {
  return Group.findOne({
    attributes: { include: ["id"] },
    where: { groupCode },
  });
};

const createGroup = (newGroup) => {
  return Group.create(newGroup).then(() => {
    return getGroupByGroupCode(newGroup.groupCode);
  });
};

module.exports = {
  getGroupList,
  getGroupByGroupCode,
  getListGroupByKeyword,
  createGroup,
};
