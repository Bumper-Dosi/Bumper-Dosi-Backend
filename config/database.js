const mongoose = require("mongoose");
const { ServerError } = require("../error/customError");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Failed to conect to MOngoDB");
    return next(new ServerError());
  }
};

module.exports = connectDB;
