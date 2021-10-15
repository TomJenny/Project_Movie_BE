const express = require("express");

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const roleSchemas = require("../validations/role.validation");
const manageCinemaRouters = express.Router();
const cinemaCtr = require("../controllers/cinema.controllers");
const cineplexCtr = require("../controllers/cineplex.controllers");
const cineplexSchemas = require("../validations/cineplex.validation");

manageCinemaRouters.get(
  "/",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(cineplexSchemas.cinema, "query"),
  async (req, res) => {
    try {
      const { cineplexCode } = req.query;

      const cineplex = await cineplexCtr.getCineplexByCineplexCode(
        cineplexCode
      );

      if (!cineplex) {
        res.status(RESPONSE_CODE.BAD_REQUEST).send("cineplex does not exist");
      }

      cinemaList = await cinemaCtr.getCinemaList(cineplex.id);
      if (!cinemaList) {
        res.status(RESPONSE_CODE.BAD_REQUEST).send("cinema is comming soon");
      }
      res.send(cinemaList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  manageCinemaRouters,
};
