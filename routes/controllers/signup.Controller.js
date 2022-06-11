const { ServerError } = require("../../error/customError");
const User = require("../../models/User");

async function findOrCreateUser(uid, name) {
  if (uid === null) return;

  return await User.findOrCreate({ uid }, { name });
}

exports.createUser = async (req, res, next) => {
  try {
    const { uid, name } = req.userData;
    const user = await findOrCreateUser(uid, name);

    if (user) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    return next(new ServerError());
  }
};
