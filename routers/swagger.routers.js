const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerRouters = express.Router();

const swaggerDocument = require("../doc/swagger.json");

swaggerRouters.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {
  swaggerRouters,
};
