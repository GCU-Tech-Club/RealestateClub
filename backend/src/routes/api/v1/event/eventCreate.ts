import { Router, Request, Response } from "express";
import { firestore } from "../../../..";
import { Event } from "../../../../types/eventTypes";

const router = Router();

router.post(
  "/",
  async (req: Request<any, any, Event>, res: Response): Promise<void> => {
    try {
      const { UID, Location, EventName, Description } = req.body;

      if (!UID || !Location || !EventName || !Description) {
        res.status(400).json({
          message:
            "Missing required fields: UID, Date, Location, EventName, Description",
        });
        return;
      }
      
      // Do we want to save all fields that are posted or just the ones defined in Event?
      const eventDocRef = await firestore.collection("Events").add(req.body);

      res.status(201).json({
        message: "Event created successfully",
        eventId: eventDocRef.id,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({
        message: "Failed to create event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

export default router;

