const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri:process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_CERT_PROVIDER,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
  }),
});

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const userData = await admin.auth().verifyIdToken(token);

    req.userData = userData;

    next();
  } catch (error) {
    return res.status(401).json({ message: "유저확인 불가" });
  }
};

module.exports = verifyToken;
