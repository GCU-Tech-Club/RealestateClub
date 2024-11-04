import { Router, Request, Response } from 'express';
import { admin, firestore } from '../../../..';

const router = Router();

router.get('/', (req, res) => {
  res.send("User has been fetched.")
})

export default router;