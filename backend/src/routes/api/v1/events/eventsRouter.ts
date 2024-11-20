import { Router } from 'express';
import getAllEvents from './getAllEvents';
import getEvent from './getEvent';

const router = Router();

router.use('/', getAllEvents)
router.use('/test', getEvent)

export default router