const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String },
  friends: [String],
  chatLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoomSchema",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
