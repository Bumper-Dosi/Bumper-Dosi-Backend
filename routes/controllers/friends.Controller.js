const User = require("../../models/User");

exports.getFriendList = async (req, res, next) => {
  const uid = req.body.uid;

  try {
    const user = await User.findOne({ uid });
    const friendList = user.friends;

    if (friendList === null) return;

    if (friendList) {
      res.status = 200;
      res.json({ friendList });
    }
  } catch (error) {
    res.send({ message: "server error" });
    next(error);
  }
};
