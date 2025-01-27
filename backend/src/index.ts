import express, { Request, Response } from 'express';
import routeHandler from './routes/routeHandler'; // import the routes variable
import admin from 'firebase-admin';
import cors from 'cors';

// var serviceAccount = require("../../firebase-sak.json");
require('dotenv').config()
const productionMode = process.env.PRODUCTION_MODE === 'true';

console.log('Server is running in ' + (productionMode ? 'production' : 'development') + ' mode');

var os = require('os');
function getIpAddress(internal: boolean = false): string | null {
  console.log(`Getting ${internal ? 'internal' : 'external'} IP address...`);
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const info of networkInterfaces[interfaceName]) {
      if (info.internal === internal && info.family === 'IPv4') {
        return info.address;
      }
    }
  }
  throw new Error(`No ${internal ? 'internal' : 'external'} IP address found`);
}

let testServerIP: string | null;
let localServerIP: string | null;
let ipAddress: string | null;

try {
  testServerIP = getIpAddress(false);
  localServerIP = getIpAddress(true);
  console.log(`Local IP: ${localServerIP}`);
  console.log(`Test Server IP: ${testServerIP}`);
  ipAddress = productionMode ? testServerIP : localServerIP;
  console.log(`Server IP: ${ipAddress}`);
} catch (error) {
  throw new Error(`Failed to get IP address: ${error}`);
}

console.log('Past IP address');

const app = express();
const port = 5001;

app.use(cors());

console.log('Past cors middleware');

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

console.log('Past Firebase Admin');

const firestore = admin.firestore();
const auth = admin.auth();

if (!productionMode) {
  firestore.settings({
    host: `${ipAddress}:7001`,
    projectId: 'gcurealestate-ae639',
    ssl: false,
  })
  process.env.FIREBASE_AUTH_EMULATOR_HOST = `${ipAddress}:9099`;
  process.env.FIRESTORE_EMULATOR_HOST = `${ipAddress}:7001`;
  console.log("Connected to Firestore and Auth emulators.");
}

console.log('Past Firestore settings');

// Test route to check Firebase connection
// TODO Get rid of this once we actually have some firebase functionality working
// for right now this is just an endpoint you can hit to make sure the db is working properly
app.get('/firebase-test', async (req: Request, res: Response) => {
  console.log('Testing Firebase connection...');
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
