const express = require("express");
const router = express.Router();
const auth = require("./middlewares/auth");
const signupController = require("./controllers/signup.controller");

router.post("/", auth, signupController.createUser);

module.exports = router;
