const express = require("express");
const { userRouters } = require("./user.routers");
const { manageGroupRouters } = require("./manage_group.routers");
const { manageUserRouters } = require("./manage_user.routers");
const { manageCineplexRouters } = require("./manage_cineplex.routers");
const { manageCinemaRouters } = require("./manage_cinema.routers");
const { manageMovieRouters } = require("./manage_movie.routers");
const { manageShowtimeRouters } = require("./manage_showtime.routers");
const { bookTicketRouters } = require("./bookticket.routers");
const { managePaymentRouters } = require("./manage_payment.routers");
const { paypalRouters } = require("./paypal.routers");

const rootRouter = express.Router();

rootRouter.use("/paypal", paypalRouters);

rootRouter.use("/user", userRouters);
rootRouter.use("/bookticket", bookTicketRouters);

rootRouter.use("/manageuser", manageUserRouters);
rootRouter.use("/managegroup", manageGroupRouters);
rootRouter.use("/managecineplex", manageCineplexRouters);
rootRouter.use("/managecinema", manageCinemaRouters);
rootRouter.use("/managemovie", manageMovieRouters);
rootRouter.use("/manageshowtime", manageShowtimeRouters);
rootRouter.use("/managepayment", managePaymentRouters);

module.exports = {
  rootRouter,
};
