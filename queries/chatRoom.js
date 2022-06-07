const ChatRooms = require("../models/Chat");

exports.findOrCreateChatRoom = async ({ user, friend }) => {
  const codedId = [user, friend].sort().join("");
  let myChatRoom;

  try {
    myChatRoom = await ChatRooms.findById(codedId);
  } catch (error) {
    myChatRoom = await ChatRooms.create({ id: codedId, users: [user, friend] });
  }

  return myChatRoom;
};
