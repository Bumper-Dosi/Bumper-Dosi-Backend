const User = require("../../models/User");
const admin = require("firebase-admin");

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

exports.addFriend = async (req, res, next) => {
  const myUid = req.userData.uid;
  const friendUid = req.body.uid;

  try {
    const friend = await User.findOne({ uid: friendUid });
    const user = await User.findOne({ uid: myUid });
    const friendList = user.friends;

    if (friendList.includes(friendUid)) {
      return res.status(201).json({ message: "Already Added" });
    }

    friendList.push(friend.uid);
    await User.findOneAndUpdate(
      { uid: myUid },
      { $set: { friends: friendList } }
    );

    res.status(201).json({ message: "Add complete" });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};
