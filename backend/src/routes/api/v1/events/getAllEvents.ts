import { Router } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 5;

    try {
        const eventsCollection = firestore.collection("Events");
        let query = eventsCollection.orderBy("Date", "asc").limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery = eventsCollection
            .orderBy("Date", "asc")
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = eventsCollection.orderBy("Date", "asc").startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot = await query.get();
        const events = snapshot.docs.map((doc): Event => {
          const data = doc.data();
          return {
            UID: data.UID,
            EventName: data.EventName,
            Location: data.Location,
            Date: data.Date,
            Description: data.Description,
            Registered: data.Registered,
            Attended: data.Attended,
          };
        });
        
        res.status(200).json({ page, pageSize, totalEvents: events.length, events: events })
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error instanceof Error ? error.message : error })
    }
});

export default router;