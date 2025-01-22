import { Router } from 'express';
import userRouter from './user/userRouter';
import authMiddleware from './middleware/authMiddleware';
import eventRouter from './events/eventsRouter';
import usersRouter from './users/usersRouter';

const router = Router();

// User Routes with authentication middleware
router.use('/user', authMiddleware, userRouter);

// Users Route with authentication middleware
router.use('/users', authMiddleware, usersRouter);

// Event Routes
router.use('/events', eventRouter)


export default router;