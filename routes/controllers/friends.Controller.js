const User = require("../../models/User");

exports.getFriendList = async (req, res, next) => {
  const uid = req.body.uid;

  try {
    const user = await User.findOne({ uid });
    const friendList = user.friends;

    if (!friendList.length) {
      return res.status(204);
    }

    res.status = 200;
    res.json({ friendList });
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
};
