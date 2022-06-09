const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: String,
    timestamps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatRoomSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true,
  },
  contents: [MessageSchema],
});

module.exports = mongoose.model("Chat", ChatRoomSchema);
