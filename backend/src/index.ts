import express, { Request, Response } from 'express';
import routeHandler from './routes/routeHandler'; // import the routes variable
import admin from 'firebase-admin';
var serviceAccount = require("../../firebase-sak.json");
require('dotenv').config()
const productionMode = process.env.PRODUCTION_MODE === 'true';

const app = express();
const port = 5001;

// Initialize Firebase Admin SDK
if (productionMode) {
  console.log(process.env.FIREBASE_SAK);
  const serviceAccount = JSON.parse(process.env.FIREBASE_SAK as string);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  console.log('Using Live Firebase Data!');
} else {
  admin.initializeApp(
    {credential: admin.credential.cert(serviceAccount),} // Commented for testing purposes while auth isn't tested
  );
  console.log("Using Firebase Emulator.");
}

const firestore = admin.firestore();
const auth = admin.auth();

//------------------------------------------------------------ 
/**
 * Generate JWT for testing purposes from a Firebase UID
 * @param {string} uid - Firestore user ID (UID)
 * @returns {Promise<string>} - A JWT token for the given UID
 */

/*
async function generateTestJWT(uid: string): Promise<string> {
  try {
    const token = await admin.auth().createCustomToken(uid);
    return token;
  } catch (error) {
    console.error("Error creating custom token:", error);
    throw new Error("Token creation failed");
  }
}

// Sample usage to generate a test token for a specific UID
(async () => {
  try {
    const uid = "2x4U5m7ARZlxAGkINnw7BotcX18d"; // Replace with an actual Firestore UID
    const jwt = await generateTestJWT(uid);
    console.log("Generated JWT:", jwt);
  } catch (error) {
    console.error("Error generating test JWT:", error);
  }
})();

*/
//------------------------------------------------------------------------------

if (!productionMode) {
  firestore.settings({
    //host: '172.31.29.127:7001',
    host: 'localhost:7001',
    projectId: 'gcurealestate-ae639',
    ssl: false,
  })
  //process.env.FIREBASE_AUTH_EMULATOR_HOST = '172.31.29.127:9099';
  //process.env.FIRESTORE_EMULATOR_HOST = '172.31.29.127:7001';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:7001';
  console.log("Connected to Firestore and Auth emulators.");
}

// Test route to check Firebase connection
// TODO Get rid of this once we actually have some firebase functionality working
// for right now this is just an endpoint you can hit to make sure the db is working properly
app.get('/firebase-test', async (req: Request, res: Response) => {
    try {
      // Check Firebase Admin connection by listing Firestore collections
      const collections = await firestore.listCollections();
      
      const collectionNames = collections.map(col => col.id);
      res.status(200).json({
        message: 'Firebase connected successfully!',
        collections: collectionNames,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to connect to Firebase',
        error: error,
      });
    }
});

app.use('/', routeHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { admin, firestore };