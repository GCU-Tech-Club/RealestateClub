import { Router } from 'express';
import getAllUsers from './getAllUsers';

const router = Router();

router.use('/', getAllUsers);


export default router;