const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  uid: { type: String },
  friends: [String],
  chatLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoomSchema",
    },
  ],
});

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);
