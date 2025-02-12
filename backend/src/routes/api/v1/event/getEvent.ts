import { Router } from 'express'
import { firestore } from '../../../..';
import { PublicEvent } from '../../../../types/eventTypes';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const id: string = req.params.id
        const eventDoc = await firestore.collection('events').doc(id).get();

        if (!eventDoc.exists) {
            res.status(404).json({message: 'Event data not found'});
            return;
        };

        const eventData = { ...eventDoc.data() };

        const formattedEventData: PublicEvent = {
          uid: eventData.uid,
          eventName: eventData.eventName,
          location: eventData.location,
          date: eventData.date,
          description: eventData.description,
          registered: eventData.registered,
          attended: eventData.attended,
          createdBy: eventData.createdBy,
        };

        res.status(200).json({
            eventData: formattedEventData
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error: error instanceof Error ? error.message : error })
    }
});

export default router;
