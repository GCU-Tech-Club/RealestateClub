import { Router } from 'express';
import { firestore } from '../../../..';
import { User } from '../../../../types';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    
    try {
        const usersCollection = firestore.collection("Users");
        let query = usersCollection.orderBy("Name", "asc").limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery = usersCollection
            .orderBy("Name", "asc")
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = usersCollection.orderBy("Name", "asc").startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot = await query.get();
        const users = snapshot.docs.map((doc): User => {
          const data = doc.data();
          return {
            UID: data.UID,
            Name: data.Name,
            Bio: data.Bio,
            Major: data.Major,
          };
        });
        
        res.status(200).json({ page, pageSize, totalUsers: users.length, users: users })
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error instanceof Error ? error.message : error })
    }
});

export default router;