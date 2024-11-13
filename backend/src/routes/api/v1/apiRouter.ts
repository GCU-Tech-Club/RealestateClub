import { Router } from 'express';
import userRouter from './user/userRouter';
import authMiddleware from './middleware/authMiddleware';

const router = Router();

// User Routes with authentication middleware
router.use('/user', authMiddleware, userRouter);


export default router;