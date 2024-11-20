import { Router } from 'express'
import { firestore } from '../../../..';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const id: string = req.params.id
        const eventDoc: FirebaseFirestore.DocumentSnapshot = await firestore.collection('Events').doc(id).get();

        if (!eventDoc.exists) {
            res.status(400).json({message: 'Event data not found'});
        };

        interface EventData {
            [key: string]: unknown;
        }

        const eventData: EventData = { ...eventDoc.data() };

        res.status(200).json({
            eventData: eventData
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

export default router;
