import { Router } from 'express';
import { firestore } from '../../../..';
import { EventData } from '../../../../types/eventTypes';

const router = Router();

router.get('/', async (req, res) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const pageSize: number = 10;

    try {
        const eventsCollection: FirebaseFirestore.CollectionReference = firestore.collection("Events");
        let query: FirebaseFirestore.Query = eventsCollection.orderBy("Time", "asc").limit(pageSize);
    
        if (page > 1) {
          const previousPageQuery: FirebaseFirestore.Query = eventsCollection
            .orderBy("Time", "asc")
            .limit((page - 1) * pageSize);
    
          const previousPageSnapshot: FirebaseFirestore.QuerySnapshot = await previousPageQuery.get();
    
          if (!previousPageSnapshot.empty) {
            const lastDoc: FirebaseFirestore.QueryDocumentSnapshot = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
            query = eventsCollection.orderBy("Time", "asc").startAfter(lastDoc).limit(pageSize);
          }
        }
    
        const snapshot: FirebaseFirestore.QuerySnapshot = await query.get();
        const events = snapshot.docs.map(doc => {
          const data = doc.data() as EventData;
          return {
            UID: data.UID,
            Name: data.Name,
            Location: data.Location,
            Time: data.Time.toDate(),
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