const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    userName: user.userName,
    email: user.email,
    roleCode: user.roleCode,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
module.exports = {
  generateToken,
};
