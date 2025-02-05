import { json, Router } from 'express';
import eventCreate from './eventCreate';
import eventDelete from './eventDelete';
import eventUpdate from './eventUpdate';
import getEvent from './getEvent';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(json());

router.get('/', (req, res) => {
  res.status(200).json({
    message:
      'Event API - Use specific endpoints like /create, /delete, /fetch, /update',
  });
});

router.use('/', eventDelete);
router.use('/', eventUpdate);
router.use('/', getEvent);
router.use('/', authMiddleware, eventCreate); // Keep this at the end so that the middleware is only applied here

export default router;
