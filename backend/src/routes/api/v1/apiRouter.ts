import { Router } from 'express';
import userRouter from './user/userRouter';

const router = Router();

// User Routes
router.use('/user', userRouter);


export default router;