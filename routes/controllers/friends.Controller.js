const User = require("../../models/User");

exports.getFriendList = async (req, res, next) => {
  const uid = req.userData.uid;

  try {
    const user = await User.findOne({ uid });
    const friendList = user.friends;
    const friends = await User.find({
      uid: { $in: friendList },
    });

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.addFriend = async (req, res, next) => {
  const myUid = req.userData.uid;

  try {
    const friend = await User.findOne({ name: req.body.friendName });
    const user = await User.findOne({ uid: myUid });

    if (user.name === friend.name)
      return res.status(400).json({ message: "자신을 추가할 수 없습니다!" });

    const friendList = user.friends;

    if (friendList.includes(friend.uid)) {
      return res.status(201).json({ message: "Already Added" });
    }

    friendList.push(friend.uid);

    await User.findOneAndUpdate(
      { uid: myUid },
      { $set: { friends: friendList } }
    );

    const friends = await User.find({
      uid: { $in: friendList },
    });

    res.status(201).json({ friends });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

exports.deleteFriend = async (req, res, next) => {
  const myUid = req.userData.uid;
  const friendUid = req.body.uid;

  try {
    const user = await User.findOne({ uid: myUid });
    const friendList = user.friends;

    if (!friendList.includes(friendUid)) {
      return res.status(200).json({ message: "Already Deleted" });
    }

    const filteredFriendList = friendList.filter((uid) => uid !== friendUid);

    await User.findOneAndUpdate(
      { uid: myUid },
      { $set: { friends: filteredFriendList } }
    );

    const friends = await User.find({
      uid: { $in: filteredFriendList },
    });

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
