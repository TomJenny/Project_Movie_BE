const jwt = require("jsonwebtoken");
const { RESPONSE_CODE } = require("../constants");
const { getTimeStampSecond } = require("../utils/date");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const bearerHeader = req.header("Authorization");

    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1].trim();

    const decode = jwt.verify(bearerToken, process.env.JWT_SECRET);

    if (decode.exp < getTimeStampSecond()) {
      return res.status(RESPONSE_CODE.FORBIDDEN).send("token is expired");
    }

    const { userName, email, roleCode } = decode;

    req.user = { email, userName, roleCode };

    next();
  } catch (error) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid token");
  }
};

module.exports = {
  authenticateToken,
};
