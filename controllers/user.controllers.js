const {
  User,
  Ticket,
  Movie,
  Showtime,
  sequelize,
  Role,
  Group,
  Theater,
  Cineplex,
  Cinema,
  BookSeat,
  Seat,
} = require("../models");
const { Op } = require("sequelize");
const { getPagingData } = require("../helpers/paging.helpers");

const getListUserPage = (group, keyword, limit, offset, page, size) => {
  let whereObj = {};
  let options = {};

  if (group) {
    whereObj = { ...whereObj, groupId: group.id };
  }

  if (keyword) {
    whereObj = {
      ...whereObj,
      userName: {
        [Op.substring]: keyword,
      },
    };
  }

  options = {
    where: whereObj,
    attributes: { exclude: ["id"] },
  };

  if (page || size) {
    options = { ...options, limit: limit, offset: offset };
    return User.scope("queryUser")
      .findAndCountAll(options)
      .then((data) => {
        return getPagingData(data, page, limit);
      });
  } else {
    return User.scope("queryUser").findAll(options);
  }
};

const getUserByUserName = (userName) => {
  return User.scope("queryUser").findOne({
    where: {
      userName,
    },
  });
};

const getUserByEmail = (email) => {
  return User.findOne({
    where: {
      email,
    },
  });
};

const createUser = (newUser) => {
  return User.create(newUser).then((user) => {
    return getUserByUserName(user.dataValues.userName);
  });
};

const deleteUserByUserName = (userName) => {
  return User.destroy({
    where: {
      userName,
    },
  });
};

const updateUserByUserName = (userId, updateUser) => {
  return User.update(updateUser, {
    where: {
      id: userId,
    },
  }).then(() => {
    return getUserByUserName(updateUser.userName);
  });
};

const getUserInfoByUserName = (userName) => {
  return User.findAll({
    where: {
      userName,
    },
    attributes: {
      include: [
        [sequelize.literal("`Role`.`roleCode`"), "roleCode"],
        [sequelize.literal("`Group`.`groupCode`"), "groupCode"],
      ],
      exclude: ["id", "createdAt", "updatedAt", "groupId", "roleId"],
    },
    include: [
      {
        model: Role,
        attributes: [],
      },
      {
        model: Group,
        attributes: [],
      },
      {
        model: Ticket,
        attributes: {
          include: [
            "ticketCode",
            [sequelize.col("createdAt"), "timeBooked"],
            [
              sequelize.literal("`Tickets->Showtime->Movie`.`movieName`"),
              "movieName",
            ],
            [
              sequelize.literal("`Tickets->Showtime->Movie`.`duration`"),
              "duration",
            ],
          ],
          exclude: [
            "id",
            "paymentId",
            "userId",
            "showtimeId",
            "updatedAt",
            "createdAt",
          ],
        },
        include: [
          {
            model: Showtime,
            attributes: [],

            include: [
              {
                model: Movie,
                attributes: [],
              },
            ],
          },
          {
            model: BookSeat,
            // attributes: [],

            attributes: {
              include: [
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Cinema->Cineplex`.`cineplexCode`"
                  ),
                  "cineplexCode",
                ],
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Cinema->Cineplex`.`cineplexName`"
                  ),
                  "cineplexName",
                ],
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Cinema`.`cinemaCode`"
                  ),
                  "cinemaCode",
                ],
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Cinema`.`cinemaName`"
                  ),
                  "cinemaName",
                ],
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Theater`.`theaterCode`"
                  ),
                  "theaterCode",
                ],
                [
                  sequelize.literal(
                    "`Tickets->BookSeats->Showtime->Theater`.`theaterName`"
                  ),
                  "theaterName",
                ],
                [
                  sequelize.literal("`Tickets->BookSeats->Seat`.`seatCode`"),
                  "seatCode",
                ],
                [
                  sequelize.literal("`Tickets->BookSeats->Seat`.`seatName`"),
                  "seatName",
                ],
              ],
              exclude: [
                "createdAt",
                "updatedAt",
                "ticketId",
                "showtimeId",
                "id",
                "status",
                "price",
              ],
            },
            include: [
              {
                model: Showtime,
                attributes: [],
                include: [
                  {
                    model: Cinema,
                    attributes: [],
                    include: [
                      {
                        model: Cineplex,
                        attributes: [],
                      },
                    ],
                  },
                  {
                    model: Theater,
                    attributes: [],
                  },
                ],
              },
              {
                model: Seat,
                attributes: [],
              },
            ],
          },
        ],
      },
    ],
  }).then((user) => {
    return user[0];
  });
};

module.exports = {
  getListUserPage,
  getUserByUserName,
  getUserByEmail,
  deleteUserByUserName,
  createUser,
  updateUserByUserName,
  getUserInfoByUserName,
};
