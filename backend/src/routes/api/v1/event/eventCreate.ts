import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types/eventTypes';

const { Timestamp } = require('firebase-admin').firestore;

const router = Router();
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const { Location, EventName, Description } = req.body;
    const createdBy = req.body.uid;
    const eventDate = req.body.Date;

    console.log(createdBy, Location, EventName, Description);
    if (!createdBy || !Location || !EventName || !Description || !eventDate) {
      res.status(400).json({
        message:
          'Missing required fields: UID, Date, Location, EventName, Description',
      });
      return;
    }

    // Generate a new document reference
    const eventDocRef = firestore.collection('Events').doc();

    const formattedEventData: Event = {
      UID: eventDocRef.id,
      EventName: EventName,
      Location: Location,
      Date: Timestamp.fromDate(new Date(eventDate)),
      Description: Description,
      Registered: [],
      Attended: [],
    };

    // Set initial event data w/o UID
    await eventDocRef.set(formattedEventData);
    // Update the document w/ UID
    // await eventDocRef.update({
    //   UID: eventDocRef.id,
    // });

    res.status(201).json({
      message: 'Event created successfully',
      eventId: eventDocRef.id,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      message: 'Failed to create event',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
