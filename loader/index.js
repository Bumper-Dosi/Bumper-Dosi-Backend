const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("../config/database");
const corsOptions = {
  origin: "http://localhost:3000",
};

const initialLoader = (app) => {
  connectDB();
  app.use(cors(corsOptions));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = initialLoader;
