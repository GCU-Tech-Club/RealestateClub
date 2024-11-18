import { Router } from 'express';
import getAllEvents from './getAllEvents';

const router = Router();

router.use('/', getAllEvents)

export default router