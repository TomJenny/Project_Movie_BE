const { Cineplex } = require("../models");
const { Op } = require("sequelize");

const getCineplexList = (cineplexCode, group) => {
  let whereObj = {};
  if (cineplexCode) {
    whereObj = {
      ...whereObj,
      cineplexCode: {
        [Op.substring]: cineplexCode,
      },
    };
  }
  if (group) {
    whereObj = { ...whereObj, groupId: group.id };
  }

  let options = {
    where: whereObj,
    attributes: {
      exclude: ["groupId", "id"],
    },
  };
  return Cineplex.findAll(options);
};

const getCineplexByCineplexCode = (cineplexCode) => {
  return Cineplex.findOne({
    where: { cineplexCode },
  });
};

module.exports = {
  getCineplexList,
  getCineplexByCineplexCode,
};
