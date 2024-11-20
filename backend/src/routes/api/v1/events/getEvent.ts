import { Router } from 'express'
import { firestore } from '../../../..';

const router = Router();

interface EventDocument {
    UID: string;
    Name: string;
    Location: string;
    Time: Date;
    Description: string;
    Registered: string[];
    Attended: string[];
}

router.get('/:id', async (req, res) => {
    try {
        const id: string = req.params.id
        const eventDoc: FirebaseFirestore.DocumentSnapshot = await firestore.collection('Events').doc(id).get();

        if (!eventDoc.exists) {
            res.status(404).json({message: 'Event data not found'});
            return;
        };

        const eventData = { ...eventDoc.data() };

        const formattedEventData: EventDocument = {
          UID: eventData.UID,
          Name: eventData.Name,
          Location: eventData.Location,
          Time: eventData.Time.toDate(),
          Description: eventData.Description,
          Registered: eventData.Registered,
          Attended: eventData.Attended,
        };

        res.status(200).json({
            eventData: formattedEventData
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

export default router;
