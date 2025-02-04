import { Router } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const id: string = req.params.id;
    const eventDoc = await firestore.collection('Events').doc(id).get();

    if (!eventDoc.exists) {
      res.status(404).json({ message: 'Event data not found' });
      return;
    }

    const eventData = eventDoc.data() as Event;

    res.status(200).json({
      eventData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching event',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
