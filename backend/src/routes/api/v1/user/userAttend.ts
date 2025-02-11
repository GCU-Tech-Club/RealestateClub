import { Router } from 'express';
const router = Router();

router.post('/:eventId', async (req, res) => {
  const eventId: string = req.params.eventId;
  const secret = req.query.secret;
  const UserUID = req.body.uid;
});

export default router;
