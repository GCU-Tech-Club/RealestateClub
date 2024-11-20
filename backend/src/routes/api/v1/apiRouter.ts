import { Router } from 'express';
import userRouter from './user/userRouter';
import authMiddleware from './middleware/authMiddleware';
import eventRouter from './events/eventsRouter';

const router = Router();

// User Routes with authentication middleware
router.use('/user', authMiddleware, userRouter);

// Event Routes
router.use('/events', eventRouter)


export default router;