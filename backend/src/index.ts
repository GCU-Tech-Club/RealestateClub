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

var os = require('os');
function getIpAddress(internal: boolean = false): string {
  const networkInterfaces = os.networkInterfaces();

  // const ipAddresses: string[] = [];

  // for (const interfaceName in networkInterfaces) {
  //   for (const info of networkInterfaces[interfaceName]) {
  //     if (info.internal === internal && info.family === 'IPv4') {
  //       //return info.address;
  //       ipAddresses.push(info.address);
  //     }
  //   }
  // }
  return networkInterfaces.lo0[0].address;
  //throw new Error(`No ${internal ? 'internal' : 'external'} IP address found`);
}

let testDevelopment: boolean;
if (process.env.DEPLOYMENT_ENV === 'test') {
   testDevelopment = true;
} else {
  testDevelopment = false;
}

console.log(`Deployment Environment: ${process.env.DEPLOYMENT_ENV}`);
console.log(`Test Development: ${testDevelopment}`);

let testServerIP: string | null;
let localServerIP: string | null;
let ipAddress: string | null;

try {
  //console.log(getIpAddress(true));
  //testServerIP = getIpAddress(true); // old = false     172.31.29.127 

  // localServerIP = os.networkInterfaces().lo0[0].address;
  // testServerIP = os.networkInterfaces().eth0[0].address;
  // ipAddress = testDevelopment ? testServerIP : localServerIP;
 
  ipAddress = testDevelopment ? os.networkInterfaces().eth0 : os.networkInterfaces().lo0[0].address;
  console.log(ipAddress);

} catch (error) {
  throw new Error(`Failed to get IP address: ${error}`);
}

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
