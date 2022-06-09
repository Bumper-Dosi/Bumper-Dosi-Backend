const ChatRooms = require("../models/Chat");

exports.findOrCreateChatRoom = async ({ user, friend }) => {
  const chatRoom = await ChatRooms.findOne({ users: { $all: [user, friend] } });

  if (chatRoom) return chatRoom;

  return ChatRooms.create({ users: [user, friend] });
};

exports.updateChatRoom = async ({ user, friend, message }) => {
  const chatRoom = await ChatRooms.findOneAndUpdate(
    { users: { $all: [user, friend] } },
    { $push: { contents: message } }
  );

  return chatRoom;
};

exports.saveChatRoom = async ({ user, friend, messages }) => {
  const chatRoom = await ChatRooms.findOneAndUpdate(
    { users: { $all: [user, friend] } },
    { $set: { contents: messages } }
  );

  return chatRoom;
};
