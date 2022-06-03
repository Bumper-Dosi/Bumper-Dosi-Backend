const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
require("./config/database");

const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
app.use(cors());

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
