import { Router } from 'express';
import { firestore } from '../../../..';
import { User } from '../../../../types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    
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

        const usersCollection = firestore.collection('users');
        const userDoc = await usersCollection.doc(uid).get();

        // TODO: If being used for the admin panel, check if user is admin
        if (!userDoc.exists) {
          res.status(404).json({ message: 'User does not exist. Cannot view all users' });
          return;
        }

        let query = usersCollection.orderBy('name', 'asc').limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery = usersCollection
            .orderBy('name', 'asc')
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = usersCollection.orderBy('name', 'asc').startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot = await query.get();
        const users = snapshot.docs.map((doc): User => {
          const data = doc.data();
          return {
            uid: data.uid,
            name: data.name,
            major: data.major,
            bio: data.bio
          };
        });
        
        if (users.length === 0) {
          res.status(404).json({ message: 'No users found for this page query' });
        } else {
          res.status(200).json({ page, pageSize, totalUsers: users.length, users: users })
        }
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error instanceof Error ? error.message : error })
    }
});

export default router;