import { json, Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types';

const router = Router();

router.put(
  '/:id',
  async (req: Request<any, any, Event>, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const { UID, Location, EventName, Description } = req.body;

      if (!UID || !Location || !EventName || !Description) {
        res.status(400).json({
          message:
            'Missing required fields: UID, Date, Location, EventName, Description',
        });
        return;
      }

      await firestore.collection('Events').doc(id).set(req.body);

      res.status(200).json({
        message: 'Event updated successfully',
      });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({
        message: 'Failed to create event',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export default router;
