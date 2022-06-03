const User = require("../../models/User");

async function findOrSaveUser(userEmail) {
  if (userEmail === null) return;

  const userData = await User.findOne({ email: userEmail });

  if (userData) return userData;

  return await User.create({ email: userEmail });
}

exports.saveUser = async (req, res, next) => {
  try {
    const userEmail = req.body.email;

    const user = await findOrSaveUser(userEmail);

    if (user) {
      res.status = 200;
      res.json({ message: "success" });
    }
  } catch (error) {
    res.send({ message: "server error" });
    next(error);
  }
}
