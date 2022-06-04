const express = require("express");
const router = express.Router();
const friendsController = require("./controllers/friends.Controller");

router.get("/", friendsController.getFriendList);

module.exports = router;
