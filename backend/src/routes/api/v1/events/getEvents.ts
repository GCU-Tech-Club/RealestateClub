import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 2;

    try {
        const eventsCollection = firestore.collection("Events");
        let query = eventsCollection.orderBy("Time", "asc").limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery = eventsCollection
            .orderBy("Time", "asc")
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = eventsCollection.orderBy("Time", "asc").startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot = await query.get();
        const events = snapshot.docs.map(doc => ({
          ...doc.data(),
        }));
        
        res.status(200).json({ page, pageSize, totalEvents: events.length, data: events })
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error })
    }
});

export default router;