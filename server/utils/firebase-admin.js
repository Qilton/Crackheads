
import admin from "firebase-admin";
import serviceAccount from "./service-account.json"; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const messaging = admin.messaging();
