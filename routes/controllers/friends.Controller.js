const {
  REGISTERED_USER,
  ADD_MYSELF,
  UNVALID_USER,
  DELETED_USER,
} = require("../../constants");
const { BadRequest, ServerError } = require("../../error/customError");
const User = require("../../models/User");

exports.getFriendList = async (req, res, next) => {
  const uid = req.userData.uid;

  try {
    const user = await User.findOne({ uid });
    const friendList = user.friends;
    const friends = await User.find({
      uid: { $in: friendList },
    });

    return res.status(200).json({ friends });
  } catch (error) {
    return next(new ServerError());
  }
};

exports.addFriend = async (req, res, next) => {
  const myUid = req.userData.uid;

  try {
    const friend = await User.findOne({ name: req.body.friendName });
    const user = await User.findOne({ uid: myUid });

    if (user.name === friend.name) return next(new BadRequest(ADD_MYSELF));

    const friendList = user.friends;

    if (friendList.includes(friend.uid)) {
      return next(new BadRequest(REGISTERED_USER));
    }

    friendList.push(friend.uid);

    await User.findOneAndUpdate(
      { uid: myUid },
      { $set: { friends: friendList } }
    );

    const friends = await User.find({
      uid: { $in: friendList },
    });

    return res.status(201).json({ friends, message: "등록 완료됐습니다." });
  } catch (error) {
    return next(new BadRequest(UNVALID_USER, error.stack));
  }
};

exports.deleteFriend = async (req, res, next) => {
  const myUid = req.userData.uid;
  const friendUid = req.body.uid;

  try {
    const user = await User.findOne({ uid: myUid });
    const friendList = user.friends;

    if (!friendList.includes(friendUid)) {
      return next(new BadRequest(DELETED_USER));
    }

    const filteredFriendList = friendList.filter((uid) => uid !== friendUid);

    await User.findOneAndUpdate(
      { uid: myUid },
      { $set: { friends: filteredFriendList } }
    );

    const friends = await User.find({
      uid: { $in: filteredFriendList },
    });

    return res.status(200).json({ friends, message: "삭제완료" });
  } catch (error) {
    return next(new ServerError());
  }
};
