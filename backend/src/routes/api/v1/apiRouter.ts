import { Router } from 'express';
import authMiddleware from './middleware/authMiddleware';
import userRouter from './user/userRouter';
import usersRouter from './users/usersRouter';
import eventRouter from './event/eventRouter';
import eventsRouter from './events/eventsRouter';


const router = Router();

// User Routes with authentication middleware
router.use('/user', authMiddleware, userRouter);

// Users Routes with authentication middleware
router.use('/users', authMiddleware, usersRouter);

// Event Routes
router.use('/event', eventRouter);

// Events Routes
router.use('/events', eventsRouter);

export default router;