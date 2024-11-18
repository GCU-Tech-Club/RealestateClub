import { Router } from 'express';
import getEvents from './getEvents';

const router = Router();

router.use('/', getEvents)

export default router