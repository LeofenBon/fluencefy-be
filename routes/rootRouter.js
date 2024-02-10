const express = require("express");

const rootRouter = express.Router();

rootRouter.use("/auth", require("./authRoute"));

module.exports = rootRouter;
