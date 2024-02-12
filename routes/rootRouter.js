const express = require("express");
const sequelizeInstance = require("./../db");

const rootRouter = express.Router();

rootRouter.use("/auth", require("./authRoute"));
rootRouter.use("/project", require("./projectRoute"));
rootRouter.route("/syncDb").get(async (req, res, next) => {
  try {
    const dbSync = await sequelizeInstance.sync();
    res.json({
      message: "db synced",
    });
  } catch (err) {
    const error = new Error(errorMsg);
    err.status = "fail";
    err.statusCode = 500;
    next(error);
  }
});

module.exports = rootRouter;
