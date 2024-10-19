import express, { Request, Response } from 'express';
import admin from 'firebase-admin';
var serviceAccount = require("/app/firebase-sak.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Test route to check Firebase connection
app.get('/firebase-test', async (req: Request, res: Response) => {
    try {
      // Check Firebase Admin connection by listing Firestore collections
      const firestore = admin.firestore();
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
