import { Router } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;

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
        const events = snapshot.docs.map(doc => {
          const data = doc.data() as Event;
          return {
            UID: data.UID,
            Name: data.Event_Name,
            Location: data.Location,
            Time: data.Date,
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