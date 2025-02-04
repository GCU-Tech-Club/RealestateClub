import { Router, Request, Response } from 'express';
import { firestore } from '../../../..';
import { Event } from '../../../../types/eventTypes';

const { Timestamp } = require('firebase-admin').firestore;

const router = Router();
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, eventName, description, date } = req.body;
    const createdBy = req.body.uid;

    if (!createdBy || !location || !eventName || !description || !date) {
      res.status(400).json({
        message:
          'Missing required fields: UID, Date, Location, EventName, Description',
      });
      return;
    }

    // Generate a new document reference
    const eventDocRef = firestore.collection('events').doc();

    const formattedEventData: Event = {
      uid: eventDocRef.id,
      eventName: eventName,
      location: location,
      date: Timestamp.fromDate(new Date(date)),
      description: description,
      registered: [],
      attended: [],
      createdBy: createdBy
    };

    // Set event data to the new document
    await eventDocRef.set(formattedEventData);

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
