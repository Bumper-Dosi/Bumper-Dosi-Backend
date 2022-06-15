const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const initialLoader = require("./loader");
const errorHandler = require("./error");
const connectServer = require("./server");
const signup = require("./routes/signup");
const friends = require("./routes/friends");

const startApp = async(app) => {
  await initialLoader(app);
  connectServer(app);

  app.use("/signup", signup);
  app.use("/friends", friends);

  errorHandler(app);
}

startApp(app);


// connectServer(app);
// initialLoader(app);

// app.use("/signup", signup);
// app.use("/friends", friends);

//errorHandler(app);

module.exports = app;
