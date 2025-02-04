import { Router } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 5;

    try {
        const eventsCollection = firestore.collection('events');
        let query = eventsCollection.orderBy('date', 'asc').limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery = eventsCollection
            .orderBy('date', 'asc')
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = eventsCollection.orderBy('date', 'asc').startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot = await query.get();
        const events = snapshot.docs.map((doc): Event => {
          const data = doc.data();
          return {
            uid: data.uid,
            eventName: data.eventName,
            location: data.location,
            date: data.date,
            description: data.description,
            registered: data.registered,
            attended: data.attended,
            createdBy: data.createdBy
          };
        });
        
        if (events.length === 0) {
          res.status(404).json({ message: 'No events found for this page query' });
        } else {
          res.status(200).json({ page, pageSize, totalEvents: events.length, events: events })
        }
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error instanceof Error ? error.message : error })
    }
});

export default router;