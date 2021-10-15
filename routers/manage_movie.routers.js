const express = require("express");
const manageMovieRouters = express.Router();

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const roleSchemas = require("../validations/role.validation");
const movieCtr = require("../controllers/movie.controllers");
const groupCtr = require("../controllers/group.controllers");
const pageSchemas = require("../validations/page.validation");
const { getPagination } = require("../helpers/paging.helpers");
const dateSchemas = require("../validations/date.validation");
const moment = require("moment");
const {
  upLoadAvatarMiddleware,
} = require("../middlewares/upload_image.middlewares");

const movieSchemas = require("../validations/movie.validation");
const { groupSchemas } = require("../validations/group.validation");
const fs = require("fs");

manageMovieRouters.get(
  ["/", "/date", "/paging"],
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  validationMiddleware(groupSchemas.authorGroup, "query"),
  validationMiddleware(pageSchemas.paging, "query"),
  validationMiddleware(dateSchemas.dateMovie, "query"),
  async (req, res) => {
    try {
      const { movieName, groupCode, page, size, fromDate, toDate } = req.query;
      //convert date to format iso
      fromDateIso = fromDate
        ? moment(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null;
      toDateIso = toDate
        ? moment(toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null;

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

      const movieList = await movieCtr.getMovieListPage(
        group,
        movieName,
        limit,
        offset,
        page,
        fromDateIso,
        toDateIso
      );

      res.send(movieList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageMovieRouters.post(
  ["/create", "/update"],
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  upLoadAvatarMiddleware,
  validationMiddleware(movieSchemas.movie, "body"),
  async (req, res) => {
    try {
      const isUpdate = req._parsedUrl.path.search("update") > 0;
      const {
        movieCode,
        movieName,
        movieAlias,
        trailer,
        description,
        groupCode,
        openingDay,
        duration,
        rate,
      } = req.body;

      const { file } = req;

      const imageUrl =
        `${req.protocol}://${req.get("host")}` + "\\" + file.path;

      // get group id
      let group = await groupCtr.getGroupByGroupCode(groupCode);

      if (!group) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`group does not exist`);
      }

      //check movie exist
      let doesMovieExits = await movieCtr.getMovieByMovieCode(+movieCode);

      if (doesMovieExits && !isUpdate) {
        // when movie does exist, delete File upload
        fs.unlinkSync(file.path);

        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`movie code does exist`);
      }
      if (!doesMovieExits && isUpdate) {
        // when update movie does not exist, delete File upload
        fs.unlinkSync(file.path);

        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`movie code does not exist`);
      }

      const movie = {
        movieCode: +movieCode,
        movieName,
        movieAlias,
        trailer,
        imageUrl,
        description,
        groupId: group.id,
        openingDay,
        duration: +duration,
        rate: +rate,
      };

      if (isUpdate) {
        const updateMovie = await movieCtr.updateMovieByMovieCode(
          doesMovieExits.id,
          movie
        );
        res.send(updateMovie).status(200);
      } else {
        const newMovie = await movieCtr.createMovie(movie);
        res.send(newMovie).status(200);
      }
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

manageMovieRouters.delete(
  "/delete",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    const movieCode = req.query.movieCode;

    try {
      //check user exist
      const doesMovieExist = await movieCtr.getMovieByMovieCode(movieCode);
      if (!doesMovieExist) {
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`movie code ${movieCode} does not exist`);
      }

      // remember check movie have ticket
      await movieCtr.deleteMovieByMovieCode(movieCode);

      res.send(`movie code ${movieCode} have been deleted`).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  manageMovieRouters,
};
