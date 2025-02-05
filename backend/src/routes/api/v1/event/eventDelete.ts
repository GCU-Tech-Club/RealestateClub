import { json, Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';
import { messaging } from 'firebase-admin';

const router = Router();

router.delete('/:id', async (req: Request<any, any, Event>, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;
      const docRef = await firestore.collection('events').doc(id).get();

      if (!docRef.exists) {
        res.status(404).json({
          message: `Event ID '${docRef.id}' not found`,
        });
        return;
      }

      await firestore.collection('events').doc(id).delete();

      res.status(200).json({
        message: 'Event deleted successfully',
      });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({
        message: 'Failed to delete event',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export default router;
