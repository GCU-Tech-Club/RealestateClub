import { json, Router, Request, Response } from "express";
import { firestore } from "../../../..";
import { Event } from "../../../../types";

const router = Router();

router.delete(
  "/:id",
  async (req: Request<any, any, Event>, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      await firestore.collection("Events").doc(id).delete();

      res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({
        message: "Failed to delete event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

export default router;
