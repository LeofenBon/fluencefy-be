const express = require("express");

const rootRouter = require("./routes/rootRouter");

const server = express();

server.use(express.json());

server.use("/api", rootRouter);

server.all("*", (req, res, next) => {
  const errorMsg = "Cannot find " + req.originalUrl + " on the server";

  const err = new Error(errorMsg);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

server.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = server;
