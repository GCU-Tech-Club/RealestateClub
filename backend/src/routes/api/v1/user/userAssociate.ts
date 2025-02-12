import { Router } from 'express';
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore } from '../../../..';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// import User from '../models/User';
const router = Router();

router.post('/:eventId', async (req, res) => {
  try {
    // const userId = req.headers.authorization as string;
    let userId: string;
    if (process.env.PRODUCTION_MODE === 'true') {
      userId = (req.body as DecodedIdToken).uid;
    } else {
      userId = req.body.uid;
    }
    const eventId = req.params.eventId;

    // first check if user exists
    // second check that event exists
    // third check that user isn't registered for event
    // if the above are all satisfied we can return 200

    const firestore = admin.firestore();

    const userDoc: FirebaseFirestore.DocumentSnapshot = await firestore
      .collection('users')
      .doc(userId)
      .get();
    const eventDoc: FirebaseFirestore.DocumentSnapshot = await firestore
      .collection('events')
      .doc(eventId)
      .get();
    let eventData = eventDoc.data();
    let validRequest = true;
    if (
      userDoc &&
      eventDoc &&
      eventData &&
      eventData.Registered &&
      userDoc.data()
    ) {
      // console.log("in first if statement")
      let registeredArray = eventData.Registered;
      for (let i = 0; i < registeredArray.length; i++) {
        if (userId === registeredArray[i]) {
          // console.log("here")
          validRequest = false;
        }
      }
    }
    if (validRequest) {
      const document = firestore.doc(`events/${eventId}`);
      await document.update({
        Registered: FieldValue.arrayUnion(userId),
      });
      res.send(200);
    } else {
      res.status(404).json({
        message:
          "The user doesn't exist, the event doesn't exist, and/or the user is already registered for the event.",
      });
    }
  } catch (error) {
    res.send(500).json({
      message: 'Error registering user for event.',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
