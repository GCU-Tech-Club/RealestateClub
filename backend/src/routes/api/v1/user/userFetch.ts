import { Router, Request, Response } from 'express';
import { admin, firestore } from '../../../..';

const router = Router();

/*
router.get('/', (req, res) => {
  res.status(200).json({
    message: "User has been fetched",
    header: req.headers.authorization,
  });
})
*/

router.get('/firebase', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized'});
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];

    //const decodedToken = await admin.auth().verifyIdToken(idToken);  // If passing a real auth token, this will work
    //const uid = decodedToken.uid;                                    // For testing purposes, only expecting uid
    const uid = idToken; // For testing only

    const userDoc = await firestore.collection('User').doc(uid).collection('UserData').doc(uid).get()

    if (!userDoc.exists) {
      res.status(404).json({ message: 'User data not found' });
      return;
    }

    const userData = { id: userDoc.id, ...userDoc.data() };
    
    res.status(200).json({
      userData: userData,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

export default router;