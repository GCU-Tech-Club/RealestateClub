import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';

const router = Router();


router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const uid: string = req.body.uid;
    const userDoc: FirebaseFirestore.DocumentSnapshot = await firestore.collection('Users').doc(uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ message: 'User data not found' });
      return;
    }

    interface UserData {
      [Key: string]: string;
    }
    const userData: UserData = { ...userDoc.data() };
    
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