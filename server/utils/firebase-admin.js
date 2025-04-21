
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json"); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin initialized successfully.",admin);
}

module.exports = admin;

