const express = require("express");
const cors = require("cors");
const connectDB = require("../config/database");
const corsOptions = {
  origin: "https://www.bumperdosi.com",
};

const initialLoader = async (app) => {
  await connectDB();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = initialLoader;
