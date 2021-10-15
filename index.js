const express = require("express");
const { rootRouter } = require("./routers/root.routers");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { swaggerRouters } = require("./routers/swagger.routers");
require("dotenv").config();

const app = express();

//parse
app.use(express.json());

//Enable CORS
app.use(cors());

//secure
app.use(helmet());

const PORT = process.env.DB_PORT || 9696;

// use route, map route
app.use("/api", rootRouter);
app.use("/swagger", swaggerRouters);

// declare path of folder image
const pathPublicDirectory = path.join(__dirname, "./public");

app.use("/public", express.static(pathPublicDirectory));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
