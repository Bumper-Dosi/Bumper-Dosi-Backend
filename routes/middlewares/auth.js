// const admin = require('firebase-admin');

// const serviceAccount = require('need SDK.json file');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split('Bearer ')[1];
//     const uid = await admin.auth().verifyIdToken(token);

//     req.userData = uid;
//     next();
//   } catch (error) {
//     res.status(401);
//     return res.send({ message: '유저확인 불가' });
//   }
// };

// module.exports = verifyToken;
