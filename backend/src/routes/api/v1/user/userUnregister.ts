import { Router } from 'express';
import { Event } from '../../../../types';
const router = Router();
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { getFirestore } from 'firebase-admin/firestore';

router.delete('/:userId/register/:eventId', async (req, res) => {
    const { userId, eventId } = req.params;
    // let token = req.body as DecodedIdToken;
   // console.log(token);
    let uid = userId;
    let db = getFirestore();
    try {
        const colRefs = await db.listCollections();
        console.log(colRefs);
        const collectionRef = db.collection("Events").doc();
        console.log(collectionRef);
        const eventRef: FirebaseFirestore.DocumentReference = await db.collection('Events').doc(eventId);
        console.log(eventRef);
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
        const updatedRegistered = eventData.registered.filter((Registered: string) => Registered !== uid);

        if(updatedRegistered.length === eventData.registered.length){
            res.status(404).send('User not found in participants')
        }

        //update registered array
        await eventRef.update({
            Registered: updatedRegistered,
        });

        res.status(200).send('User removed from registered');

    }   catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

export default router;
