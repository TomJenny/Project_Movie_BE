const sequelize = require("sequelize");
const { Movie, Group } = require("../models");
const { Op } = require("sequelize");
const { getPagingData } = require("../helpers/paging.helpers");

const getMovieByMovieCode = (movieCode) => {
  return Movie.scope("queryMovie").findOne({
    attributes: {
      include: ["id"],
    },
    where: {
      movieCode,
    },
  });
};

const getMovieListPage = (
  group,
  keyword,
  limit,
  offset,
  page,
  fromDate,
  toDate
) => {
  let whereObj = {};
  let options = {};

  if (group) {
    whereObj = { ...whereObj, groupId: group.id };
  }

  if (keyword) {
    whereObj = {
      ...whereObj,
      movieName: {
        [Op.substring]: keyword,
      },
    };
  }
  if (fromDate && toDate) {
    whereObj = {
      ...whereObj,
      openingDay: {
        [Op.between]: [fromDate, toDate],
      },
    };
  }

  options = {
    where: whereObj,
    attributes: {
      include: [[sequelize.literal("Group.groupCode"), "groupCode"]],
      exclude: ["id", "groupId", "Group.groupCode"],
    },
    include: {
      model: Group,
      attributes: [],
    },
    raw: true,
  };
  if (page || offset) {
    options = { ...options, limit: limit, offset: offset };
    return Movie.findAndCountAll(options).then((data) => {
      return getPagingData(data, page, limit);
    });
  } else {
    return Movie.findAll(options);
  }
};

const createMovie = (newMovie) => {
  return Movie.create(newMovie).then((data) => {
    return getMovieByMovieCode(data.dataValues.movieCode);
  });
};

const updateMovieByMovieCode = (movieId, updateMovie) => {
  return Movie.update(updateMovie, {
    where: {
      id: movieId,
    },
  }).then(() => {
    return getMovieByMovieCode(updateMovie.movieCode);
  });
};

const deleteMovieByMovieCode = (movieCode) => {
  return Movie.destroy({
    where: {
      movieCode,
    },
  });
};

module.exports = {
  getMovieListPage,
  createMovie,
  getMovieByMovieCode,
  deleteMovieByMovieCode,
  updateMovieByMovieCode,
};
