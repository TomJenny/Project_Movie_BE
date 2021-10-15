const bcryptjs = require("bcryptjs");

const genBcrypt = (password) => {
  const salt = bcryptjs.genSaltSync(); //default is 10

  const hasPass = bcryptjs.hashSync(password, salt);

  return hasPass;
};

module.exports = {
  genBcrypt,
};
