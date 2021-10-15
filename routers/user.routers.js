const express = require("express");

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");

const userSchemas = require("../validations/user.validations");
const userCtr = require("../controllers/user.controllers");
const roleCtr = require("../controllers/role.controllers");
const groupCtr = require("../controllers/group.controllers");

const { genBcrypt } = require("../helpers/bcrypt.helpers");
const { generateToken } = require("../helpers/jwt.helpers");
const bcryptjs = require("bcryptjs");
const { authenticateToken } = require("../middlewares/verify-token.middleware");

const userRouters = express.Router();

userRouters.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    //check username exist
    const user = await userCtr.getUserByUserName(userName);

    if (!user) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`user ${userName} is not exist`);
    }

    const isAuth = bcryptjs.compareSync(password, user.password);

    if (!isAuth) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("password is not match");
    }

    const token = generateToken(user);

    res.status(200).send({ ...user, token: token });
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

userRouters.post("/infoUser", authenticateToken, async (req, res) => {
  try {
    const { userName } = req.query;

    const { userName: userNameToken } = req.user;

    if (!(userName === userNameToken)) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`user ${userName} does not match`);
    }

    //check username exist
    const user = await userCtr.getUserByUserName(userName);

    if (!user) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`user ${userName} is not exist`);
    }

    const userInfo = await userCtr.getUserInfoByUserName(userName);
    res.status(200).send(userInfo);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

userRouters.post(
  "/register",
  validationMiddleware(userSchemas.user, "body"),
  async (req, res) => {
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
      const roleId = await roleCtr.getRoleByRoleCode("user");
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

userRouters.put(
  "/update",
  authenticateToken,
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
      const { userName: userNameToken } = req.user;

      if (!(userName === userNameToken)) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`you don't have right to edit user`);
      }

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
      const roleId = await roleCtr.getRoleByRoleCode("user");
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

module.exports = {
  userRouters,
};
