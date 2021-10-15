const express = require("express");

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");

const userSchemas = require("../validations/user.validations");
const userCtr = require("../controllers/user.controllers");
const roleCtr = require("../controllers/role.controllers");
const groupCtr = require("../controllers/group.controllers");

const { genBcrypt } = require("../helpers/bcrypt.helpers");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const roleSchemas = require("../validations/role.validation");

const pageSchemas = require("../validations/page.validation");
const { getPagination } = require("../helpers/paging.helpers");
const { groupSchemas } = require("../validations/group.validation");
const manageUserRouters = express.Router();

manageUserRouters.get(
  ["/", "/paging", "/searchpaging", "/search"],
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(groupSchemas.authorGroup, "query"),
  validationMiddleware(pageSchemas.paging, "query"),
  async (req, res) => {
    try {
      const { userName, groupCode, page, size } = req.query;

      // get group id
      let group = !groupCode
        ? false
        : await groupCtr.getGroupByGroupCode(groupCode);

      if (!group && groupCode) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`group does not exist`);
      }

      // set default data for limit and offset
      const { limit, offset } = getPagination(page, size);

      const userList = await userCtr.getListUserPage(
        group,
        userName,
        limit,
        offset,
        page,
        size
      );

      res.send(userList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageUserRouters.get(
  "/role",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const roleList = await roleCtr.getListRole();
      res.send(roleList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageUserRouters.post(
  "/create",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(userSchemas.user, "body"),
  async (req, res, next) => {
    try {
      const {
        userName,
        email,
        phoneNumber,
        fullName,
        password,
        groupCode,
        roleCode,
      } = req.body;

      //check user exist
      const doesUserExist = await userCtr.getUserByUserName(userName);

      if (doesUserExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`user ${userName} does exist`);
      }

      //check email exist
      const doesEmailExist = await userCtr.getUserByEmail(email);
      if (doesEmailExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`email ${email} does exist`);
      }

      // get group id
      const groupId = await groupCtr.getGroupByGroupCode(groupCode);
      if (!groupId) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`group ${groupCode} does not exist`);
      }

      // get role id
      const roleId = await roleCtr.getRoleByRoleCode(roleCode);
      if (!roleId) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`role ${roleCode} does not exist`);
      }

      //convert password to hash
      const hashPassword = await genBcrypt(password);

      const user = {
        userName,
        password: hashPassword,
        fullName,
        phoneNumber,
        email,
        roleId: roleId.id, //user's register is alway customer
        groupId: groupId.id,
      };

      const newUser = await userCtr.createUser(user);
      res.send(newUser).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageUserRouters.put(
  "/update",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(userSchemas.user, "body"),
  async (req, res) => {
    try {
      const {
        userName,
        email,
        phoneNumber,
        fullName,
        password,
        roleCode,
        groupCode,
      } = req.body;

      //get User id
      const userId = await userCtr.getUserByUserName(userName);

      if (!userId) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`user ${userName} does not exist`);
      }

      // get group id
      const groupId = await groupCtr.getGroupByGroupCode(groupCode);
      if (!groupId) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`group ${groupCode} does not exist`);
      }

      // get role id
      const roleId = await roleCtr.getRoleByRoleCode(roleCode);
      if (!roleId) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`role ${roleCode} does not exist`);
      }

      //convert password to hash
      const hashPassword = await genBcrypt(password);

      const updateUser = {
        userName,
        email,
        phoneNumber,
        fullName,
        password: hashPassword,
        roleCode: roleId.id,
        groupCode: groupId.id,
      };

      const user = await userCtr.updateUserByUserName(userId.id, updateUser);

      res.send({ ...user }).status(200);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

manageUserRouters.delete(
  "/delete",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),

  async (req, res) => {
    let userName = req.query.userName;
    try {
      //check user exist
      const doesUserExist = await userCtr.getUserByUserName(userName);
      if (!doesUserExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`user ${userName} does not exist`);
      }

      // remember check user have ticket
      await userCtr.deleteUserByUserName(userName);

      res.send(`user ${userName} have been deleted`).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  manageUserRouters,
};
