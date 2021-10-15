const express = require("express");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const groupCtr = require("../controllers/group.controllers");
const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const roleSchemas = require("../validations/role.validation");
const { groupSchemas } = require("../validations/group.validation");
const manageGroupRouters = express.Router();

manageGroupRouters.get(
  "/",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const groupCode = req.query.groupCode;
      let groupList = [];

      if (!groupCode) {
        groupList = await groupCtr.getGroupList();
      } else {
        groupList = await groupCtr.getListGroupByKeyword(groupCode);
      }

      if (!groupCode && groupList.length === 0) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("table group is empty");
      }

      if (groupCode && groupList.length === 0) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send("group code is not match");
      }

      res.send(groupList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageGroupRouters.post(
  "/create",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(groupSchemas.group, "body"),
  async (req, res) => {
    try {
      const { groupCode, groupName } = req.body;

      const doesExist = await groupCtr.getGroupByGroupCode(groupCode);

      if (doesExist) {
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("group does exist");
      }

      const group = { groupCode, groupName };

      const newGroup = await groupCtr.createGroup(group);

      res.send(newGroup).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  manageGroupRouters,
};
