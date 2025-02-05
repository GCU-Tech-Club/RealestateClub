import express, { Request, Response } from 'express';
import routeHandler from './routes/routeHandler'; // import the routes variable
import admin from 'firebase-admin';
import cors from 'cors';

// var serviceAccount = require("../../firebase-sak.json");
require('dotenv').config()
const productionMode = process.env.PRODUCTION_MODE === 'true';

const app = express();
const port = 5001;

app.use(cors());

// Initialize Firebase Admin SDK
if (productionMode) {
  console.log(process.env.FIREBASE_SAK);
  const serviceAccount = JSON.parse(process.env.FIREBASE_SAK as string);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  console.log('Using Live Firebase Data!');
} else {
  admin.initializeApp();
  console.log("Using Firebase Emulator.");
}

const firestore = admin.firestore();
const auth = admin.auth();

// Set up Firebase Emulator
if (!productionMode) {
  
  let testDevelopment: boolean;
  if (process.env.DEPLOYMENT_ENV === 'test') {
    testDevelopment = true;
  } else {
    testDevelopment = false;
  }

  let ipAddress: string;
  try {
    ipAddress = testDevelopment ? '172.31.29.127': '127.0.0.1';
    console.log("Firebase Emulator has successfully connected to " + ipAddress);
  } catch (error) {
    throw new Error(`Failed to get IP address: ${error}`);
  }

  firestore.settings({
    host: `${ipAddress}:7001`,
    projectId: 'gcurealestate-ae639',
    ssl: false,
  })
  process.env.FIREBASE_AUTH_EMULATOR_HOST = `${ipAddress}:9099`;
  process.env.FIRESTORE_EMULATOR_HOST = `${ipAddress}:7001`;
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
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
});

app.use('/', routeHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { admin, firestore };
