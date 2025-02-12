import { Router } from 'express';
import { Event } from '../../../../types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { getFirestore } from 'firebase-admin/firestore';

const router = Router();

router.delete('/:eventId', async (req, res) => {
    const { eventId } = req.params;
   let userUID: string;
   if (process.env.PRODUCTION_MODE === 'true') {
    userUID = (req.body as DecodedIdToken).uid;
   } else {
    userUID = req.body.uid;
   }
    let db = getFirestore();
    try {
        const eventRef: FirebaseFirestore.DocumentReference = await db.collection('events').doc(eventId);
        //get event document
        const eventDoc = await eventRef.get();

        if(!eventDoc.exists) {
            res.status(404).send('Event not found');

        }

        const eventData = eventDoc.data() as Event;

        if(!eventData || !eventData.registered || !Array.isArray(eventData.registered)){
            res.status(400).send('No registered collection found in event')
        }

        //check if userId exists in the registered collection
        const updatedRegistered = eventData.registered.filter((registered: string) => registered !== userUID);

        if(updatedRegistered.length === eventData.registered.length){
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
