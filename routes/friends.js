const express = require("express");
const router = express.Router();
const auth = require("./middlewares/auth");
const friendsController = require("./controllers/friends.Controller");

router.get("/", auth, friendsController.getFriendList);
router.post("/", auth, friendsController.addFriend);
router.delete("/", auth, friendsController.deleteFriend);

module.exports = router;
