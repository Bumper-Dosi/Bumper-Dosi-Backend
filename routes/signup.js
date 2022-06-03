const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const signupController = require("./controllers/signup.Controller");

router.post("/", signupController.saveUser);

module.exports = router;
