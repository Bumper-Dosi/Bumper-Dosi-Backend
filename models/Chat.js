const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true,
  },
  contents: [MessageSchema],
});

const MessageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatRoomSchema);
