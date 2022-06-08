const ChatRooms = require("../models/Chat");

exports.findOrCreateChatRoom = async ({ user, friend }) => {
  const chatRooms = await ChatRooms.find({});
  let myChatRoom = chatRooms.find((chatRoom) => {
    if (chatRoom.users.includes(user) && chatRoom.users.includes(friend))
      return chatRoom;
  });

  if (!myChatRoom) {
    myChatRoom = await ChatRooms.create({ users: [user, friend] });
  }

  return myChatRoom;
};
