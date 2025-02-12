import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { FieldValue } from 'firebase-admin/firestore';
import { messaging } from 'firebase-admin';

const router = Router();

router.post('/:eventId', async (req: Request, res: Response): Promise<void> => {
  const eventUID: string = req.params.eventId;
  const secret = req.query.secret as string; // Get secret from query params
  const userUID = req.body.uid; // Get user UID from request body

  if (!userUID || !secret) {
    res.status(400).json({ message: 'Missing required fields: uid or secret' });
    return;
  }

  try {
    const eventDoc = await firestore.collection('events').doc(eventUID).get();

    if (!eventDoc.exists) {
      res.status(401).json({ message: 'Event does not exist' });
      return;
    }

    const eventData = { ...eventDoc.data() };
    if (secret !== eventData.secret) {
      res.status(404).json({ message: 'Invalid secret' });
    }

    await firestore
      .collection('events')
      .doc(eventUID)
      .update({ attended: FieldValue.arrayUnion(userUID) });

    res.status(201).json({
      message: 'User successfully marked as attending the event',
      eventUID,
      userUID,
    });
  } catch (error) {
    console.error('Error processing attendance:', error);
    res.status(500).json({
      message: 'Failed to mark attendance',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;