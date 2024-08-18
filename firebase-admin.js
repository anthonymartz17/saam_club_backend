var admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const credentials = require("./firebase-credentials.json");
admin.initializeApp({
	credential: admin.credential.cert(credentials),
});
module.exports = admin;
