import { Router } from 'express';
import userRouter from './user/userRouter';
import authMiddleware from './middleware/authMiddleware';
import eventsRouter from './events/eventsRouter';
import eventRouter from './event/eventRouter';

const router = Router();

// User Routes with authentication middleware
router.use('/user', authMiddleware, userRouter);

// Events Routes
router.use('/events', eventsRouter);

router.use('/event', eventRouter);

export default router;