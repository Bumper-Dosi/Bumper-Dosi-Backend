const User = require("../../models/User");

async function findOrCreateUser(uid) {
  if (uid === null) return;

  return await User.findOrCreate({ uid });
}

exports.createUser = async (req, res, next) => {
  try {
    const uid = req.body.uid;
    const user = await findOrCreateUser(uid);

    if (user) {
      res.status = 200;
      res.json({ message: "success" });
    }
  } catch (error) {
    res.send({ message: "server error" });
    next(error);
  }
}
