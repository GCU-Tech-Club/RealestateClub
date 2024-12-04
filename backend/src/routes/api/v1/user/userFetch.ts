import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { UserData } from '../../../../types/userTypes';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const uid: string = req.body.uid;

    if (!uid) {
      res.status(400).json({ message: 'UID is required'});
      return;
    }

    const userDoc: FirebaseFirestore.DocumentSnapshot = await firestore.collection('Users').doc(uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ message: 'User data not found' });
      return;
    }

    const userData = userDoc.data() as UserData;
    
    res.status(200).json({
      userData: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error instanceof Error ? error.message : error })
  }
});

export default router;