import { Router } from 'express';
import { Event } from '../../../../types';
const router = Router();
import { firestore } from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
let db =  new firestore.Firestore();

router.delete('/events/:eventId/registered/', async (req, res) => {
    const { eventId } = req.params;
    let token = req.body as DecodedIdToken;
    let uid = token.uid;
    try {
        //
        const eventRef = db.collection('events').doc(eventId);

        //get event document
        const eventDoc = await eventRef.get();

        if(!eventDoc.exists) {
            res.status(404).send('Event not found');
        }

        const eventData = eventDoc.data() as Event;

        if(!eventData || !eventData.Registered || !Array.isArray(eventData.Registered)){
            res.status(400).send('No registered collection found in event')
        }

        //check if userId exists in the registered collection
        const updatedRegistered = eventData.Registered.filter((Registered: string) => Registered !== uid);

        if(updatedRegistered.length === eventData.Registered.length){
            res.status(404).send('User not found in participants')
        }

        //update registered array
        await eventRef.update({
            registered: updatedRegistered,
        });

        res.status(200).send('User removed from registered');

    }   catch (error) {
        res.status(500).send('Server error');
    }
});

export default router;
