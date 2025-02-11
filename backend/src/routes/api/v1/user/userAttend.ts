import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { FieldValue } from 'firebase-admin/firestore';

const router = Router();

router.post('/:eventId', async (req: Request, res: Response): Promise<void> => {
  const eventId: string = req.params.eventId;
  const secret = req.query.secret as string; // Get secret from query params
  const UserUID = req.body.uid; // Get user UID from request body

  if (!UserUID || !secret) {
    res.status(400).json({ message: 'Missing required fields: uid or secret' });
    return;
  }

  try {
    const eventDoc = await firestore.collection('Events').doc(eventId).get();

    if (!eventDoc.exists) {
      res.status(404).json({ message: 'Invalid secret code' });
      return;
    }

    await firestore
      .collection('Events')
      .doc(eventId)
      .update({ attendees: FieldValue.arrayUnion(UserUID) });

    res.status(201).json({
      message: 'User successfully marked as attending the event',
      eventId,
      UserUID,
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
