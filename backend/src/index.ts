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
function getIpAddress(internal: boolean = false): string | null {
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



import https from 'https';
import { get } from 'http';

function getPublicIP(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '169.254.169.254', // EC2 metadata service IP
      path: '/latest/meta-data/public-ipv4',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data); // public IP
        } else {
          reject(new Error('Unable to fetch public IP'));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request failed: ${e.message}`));
    });

    req.end();
  });
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
let ipAddress: string | null | undefined;

async function getIpAddress2() {
  try {
    const testServerIP = await Promise.race([
      getPublicIP(),
      new Promise((resolve) => setTimeout(() => resolve('default-ip-address'), 5000)),
    ]);
    localServerIP = getIpAddress(true);
    const ipAddress2 = testDevelopment ? testServerIP : localServerIP;
    console.log(`Server IP: ${ipAddress2}`);
    return ipAddress2;
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  const ipAddress = await getIpAddress2();

  // Initialize Firebase Admin SDK
  if (productionMode) {
    console.log(process.env.FIREBASE_SAK);
    const serviceAccount = JSON.parse(process.env.FIREBASE_SAK as string);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

init();



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
