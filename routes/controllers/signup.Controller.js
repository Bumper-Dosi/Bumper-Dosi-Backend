const User = require("../../models/User");

async function findOrCreateUser(userEmail) {
  if (userEmail === null) return;

  return await User.findOrCreate({ email: userEmail });
}

exports.createUser = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const user = await findOrCreateUser(userEmail);

    if (user) {
      res.status = 200;
      res.json({ message: "success" });
    }
  } catch (error) {
    res.send({ message: "server error" });
    next(error);
  }
}
