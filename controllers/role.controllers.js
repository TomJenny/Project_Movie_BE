const { Role } = require("../models");

const getListRole = () => {
  return Role.findAll({
    attributes: { exclude: ["id"] },
  });
};

const getRoleByRoleCode = (roleCode) => {
  return Role.findOne({
    attributes: { include: ["id"] },
    where: { roleCode },
  });
};

module.exports = {
  getRoleByRoleCode,
  getListRole,
};
