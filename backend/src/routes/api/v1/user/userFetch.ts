import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { User } from '../../../../types/userTypes';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    let uid: string;
    if (process.env.PRODUCTION_MODE === 'true') {
      uid = (req.body as DecodedIdToken).uid;
    } else {
      uid = req.body.uid;
    }

    if (!uid) {
      res.status(400).json({ message: 'UID is required'});
      return;
    }

    const userDoc = await firestore.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ message: 'User data not found' });
      return;
    }

    const userData = { ...userDoc.data() };

    const formattedUserData: User = {
      uid: userData.uid,
      name: userData.name,
      major: userData.major,
      bio: userData.bio
    };
    
    res.status(200).json({
      userData: formattedUserData
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error instanceof Error ? error.message : error })
  }
});

export default router;