const express = require("express");

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const roleSchemas = require("../validations/role.validation");
const manageCineplexRouters = express.Router();
const cineplexCtr = require("../controllers/cineplex.controllers");
const groupCtr = require("../controllers/group.controllers");

manageCineplexRouters.get(
  "/",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const { cineplexCode, groupCode } = req.query;

      // get group id
      let group = !groupCode
        ? false
        : await groupCtr.getGroupByGroupCode(groupCode);

      if (!group && groupCode) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`group does not exist`);
      }

      cineplexList = await cineplexCtr.getCineplexList(cineplexCode, group);

      res.send(cineplexList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  manageCineplexRouters,
};
